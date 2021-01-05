<template>
  <section v-if="!isLoading && toy" class="toy-details flex column justify-center align-center">
      <div class="toy-details-container flex align-center space-between wrap">
        <div class="flex column align-center wrap">
      <h2><strong>Name:</strong>{{toy.name}}</h2>
      <h2><strong>Type:</strong>{{toy.type}}</h2>
      <h2><strong>Price:</strong>{{toy.price}}$</h2>
      <h2><strong>Date Add:</strong>{{year}}</h2>
      <h2><strong>In Stock:</strong> <span :class="stockColor">{{stock}}</span></h2>


      </div>
      <img  class="img-item" :src="toy.imgUrl||'https://robohash.org/'+toy.name">

      </div>
      <!-- chat -->
      
      <chat-room  />
      <!-- chat -->

      <section class="reviews">
      <add-review v-if="user" :user="user" :toy="toy"/>
    <review-list v-if="reviews" :user="user" :reviews="reviews"></review-list>
      </section>
       <el-button type="warning" class="mt-5" @click="$router.go(-1)" plain>Go Back</el-button>
  </section>
   
</template>

<script>
import chatRoom from '@/cmps/chat-room.cmp'
import {toyService} from '../services/toy.service.js'
import reviewList from '@/cmps/review-list.cmp'
import addReview from '@/cmps/add-review.cmp'
export default {
  name:'toy-details',
  data() {
    return {
  
    }
  },
computed:{

  toy(){
    return this.$store.getters.toyForDisplay
  },
  isLoading(){
    return this.$store.isLoading
  },
  price(){
    return 'Price: ' + this.toy.price + ' $'
  },
    stock(){
        return (this.toy.inStock) ? 'Stock' : 'Out Of Stock'
    },
      reviews() {
      return this.$store.getters.reviews;
    },
    user(){
      return this.$store.getters.loggedinUser
    },
    year(){
      const year = new Date(this.toy.createdAt).toLocaleDateString()
      return year
    },
     stockColor(){
      return {red:!this.toy.inStock, green:this.toy.inStock}
    }

},
  methods: {


  },
created() {
    const { toyId } = this.$route.params;
    if(!toyId) this.$router.go(-1);
    this.$store.dispatch({type:'loadToy',toyId})
     this.$store.dispatch({type: 'loadUsers'})
    this.$store.dispatch({type: 'loadReviews',filterBy:{toyId:toyId}})
  },
 
  components:{
    reviewList,
    addReview,
    chatRoom
  }

}
</script>

<style>

</style>