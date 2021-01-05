import HttpService from './HttpService'

export const toyService = {
  getById,
  remove,
  save,
  getEmptyToy,
  query,

};

async function query(filterBy = null) {
  var searchTerm = ''
  if(filterBy){
    const inStock = (filterBy.inStock==='all') ? '' : `&inStock=${filterBy.inStock}` 
    const sort = (filterBy.sort==='all') ? '':`&sort=${filterBy.sort}` 
    const type = (filterBy.type ==='all') ? '' : `&type=${filterBy.type}`
    const q = filterBy.q ? `&q=${filterBy.q}` : ''
    searchTerm = `${q}${sort}${inStock}${type}`
  }

  return HttpService.get(`toy?${searchTerm}`)
}

function getById(id) {
  return HttpService.get(`toy/${id}`)
}
function remove(id) {
  return HttpService.delete(`toy/${id}`)
}

function save(toy) {
  if(toy._id){
    toy.updateAt = Date.now()
    return HttpService.put(`toy/${toy._id}` ,toy)
  }else {
    toy.createdAt = Date.now()
    return HttpService.post('toy',toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    inStock: true,
    type:''
  };
}
