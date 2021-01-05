import HttpService from './HttpService'

export default {
    add,
    query,
    remove
}

function query(filterBy=null) {
    var query = ''
    if(filterBy){
        const user = filterBy.userId ? `?userId=${filterBy.userId}` : ''
        const toy = filterBy.toyId ? `?toyId=${filterBy.toyId}` : ''
        query = `${user}${toy}`
    }
    console.log('query:', query)
    return HttpService.get(`review${query}`)
}

function remove(reviewId) {
    console.log('reviewId:', reviewId)
    return HttpService.delete(`review/${reviewId}`)
}
function add(review) {
    return HttpService.post(`review`, review)
}



