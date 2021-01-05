<template>
<section class="reviews-list">
      <h1>Reviews:</h1>

  <ul v-if="reviews" class="review-list clean-list flex row wrap justify-center align-center">
      <li  v-for="review in reviews" :key="review._id">
          <el-rate
  :value="review.rate"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value} points">
</el-rate>
        <div class="flex wrap justify-center align-center"> 
 
<avatar :username="review.byUser.username"></avatar>
           <strong class="ml-5">By: {{review.byUser.username}}</strong>

        </div>
        <h3 class="review-txt">review: {{review.txt}}</h3>
    
        <h5>{{date(review.createdAt)}}</h5>
       <el-button v-if="user && (user._id === review.byUserId ||user.isAdmin ) " type="danger" class="mt-5" @click="removeReview(review._id)" plain>X</el-button>
      </li>
    </ul>
    </section>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name:'review-list',
    props:{
        reviews:[Array,Object],
       
    },
    computed:{
          user(){
    return this.$store.getters.loggedinUser
  },
    },
    methods:{
     removeReview(reviewId){
      this.$store.dispatch({type: 'removeReview', reviewId})
    },
    date(time){
      return new Date(time).toLocaleString()
    }
    },
    components:{
      Avatar
    }

}
</script>

<style>

</style>