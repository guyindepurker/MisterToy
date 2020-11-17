<template>
  <section v-if="toy" class="toy-details flex column justify-center align-center">
      <img  class="img-item" :src="'https://robohash.org/'+toy.name">
      <h2>Name:{{toy.name}}</h2>
      <h2>Type:{{toy.type}}</h2>
      <h2>Price:{{toy.price}}</h2>
      <h2>Created:{{date}}</h2>
      <h2>In Stock:{{stock}}</h2>
    <button @click="$router.go(-1)">Go Back</button>
  </section>
</template>

<script>
import {toyService} from '../services/toy.service.js'
export default {
  name:'toy-details',
data(){
    return {
        toy:null
    }
},
computed:{
  price(){
    return 'Price: ' + this.toy.price + ' $'
  },
    stock(){
        return (this.toy.inStock) ? 'Stock' : 'Out Of Stock'
    },
    date(){
        return this.toy.createdAt.substring(0,11)
    }
},
created() {
    const { toyId } = this.$route.params;
    if(!toyId) this.$router.go(-1);
     toyService.getById(toyId).then(res=>{
       return this.toy=res});
  },
}
</script>

<style>

</style>