
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const sort = _buildSort(filterBy)
    const collection = await dbService.getCollection('toy')
    try {
        const toys = await collection.find(criteria).sort(sort).toArray();
     
        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        console.log(`ERROR: while finding toy ${toyId}`)
        throw err;
    }
}


async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}

async function update(toy) {
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);
    toy.updatedAt = Date.now()
    try {
        await collection.replaceOne({ _id: toy._id }, { $set: toy })
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    
    const collection = await dbService.getCollection('toy')
    try {
        await collection.insertOne(toy);
        console.log('toy:', toy)
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.q) {
        const regex = new RegExp(`${filterBy.q}`)
        criteria.name = regex
    }
    if(filterBy.inStock){
        var boolean = (filterBy.inStock === 'true') 
        criteria.inStock = boolean
    }
    if(filterBy.type){
        criteria.type = filterBy.type 
    }
    return criteria;
}
function _buildSort(filterBy){
    const sort = {}
    if(filterBy.sort){
        if(filterBy.sort==='name'){
            sort.name = -1
        }else if(filterBy.sort==='low'){
            sort.price = 1
        }else if(filterBy.sort==='high'){
            sort.price = -1
        }
    }
    return sort 
}


