
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('criteria:', criteria)
    const collection = await dbService.getCollection('review')
    try {
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()

        reviews = reviews.map(review => {
            review.byUser = {  username: review.byUser.username }
            review.aboutToy = { toyName: review.aboutToy.name }
            return review;
        })

        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.toyId = ObjectId(review.toyId)
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if(filterBy.toyId){
        criteria.toyId=ObjectId(filterBy.toyId)
    }
    if(filterBy.userId){
        criteria.byUserId =  ObjectId(filterBy.userId)
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


