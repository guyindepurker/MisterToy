const url = 'http://localhost:3000/toy';

import axios from 'axios';

export const toyService = {
  getById,
  remove,
  save,
  getEmptyToy,
  query,

};

function query(page=1,filterBy=null) {
  var searchTerm = ''
  if(filterBy){
    const inStock = filterBy['inStock'] ? `&inStock=${filterBy['inStock']}` : ''
    const sort = filterBy['sort'] ? `&_sort=${filterBy['name']}` : ''
    const type = filterBy['type'] ? `&type=${filterBy['type']}` : ''
    const q = filterBy['q'] ? `&q=${filterBy['q']}` : ''
    searchTerm = `${q}${sort}${inStock}${type}` 
  }
  return axios.get(`${url}?_page=${page}&_limit=8${searchTerm}`)
    .then(res=>res.data)
}

function getById(id) {
  return axios.get(`${url}/${id}`)
    .then(res=>res.data)
}
function remove(id) {
  return axios.delete(`${url}/${id}`)
    .then(res=>res.data)
}

function save(toy) {
  if(toy._id){
    toy.updateAt = Date.now()
    return axios.put(`${url}/${toy._id}` ,toy)
      .then(res=>res.data)
  }else {
    toy.cratedAt = Date.now()
    return axios.post(url,toy).then(res=>res.data)
  }
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: '',
    inStock: true,
    createdAt: '',
    type:''
  };
}
