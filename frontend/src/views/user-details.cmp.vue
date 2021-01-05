<template>
  <section v-if="user" class="user-details">
    <div class="user-profile flex column wrap align-center">
    <h1>User profile</h1>
    <avatar :username="user.username"></avatar>
    <h2>User Name: {{user.username}}</h2>
    <h2>Email: {{user.email}}</h2>
        <div class="flex column wrap space-between align-center">
    <gender-picker v-model="userPrfs.gender" />
    <color-picker v-model="userPrfs.favColor" />
    <el-button type="primary" class="mt-5" @click="updateUser" i>Save</el-button>
    <el-button type="primary" class="mt-5" @click="isShowReview = !isShowReview" i>{{reviewBtn}}</el-button>
    </div>
    </div>
    <section v-if="reviews && isShowReview" class="reviews flex column wrap">
     <review-list v-if="user" :reviews="reviews" />
    </section>
  
  </section>
</template>

<script>
import genderPicker from "@/cmps/gender-picker.cmp";
import colorPicker from "@/cmps/color-picker.cmp";
import Avatar from 'vue-avatar'
import reviewList from '@/cmps/review-list.cmp'
import {userService} from '../services/UserService.js'
export default {
data(){
  return {
    userPrfs:{
        favColor:'black',
        gender:'male'
      },
      isShowReview:true,
    user:this.$store.getters.loggedinUser
  }
},
computed:{
  reviews(){
      console.log('this.$store.getters.reviews;:', this.$store.getters.reviews)
      return this.$store.getters.reviews;
  },
  reviewBtn(){
    return this.isShowReview ? 'Hide Reviews' : 'Show Reviews'
  }
},
methods:{
  updateUser() {
      const user = JSON.parse(JSON.stringify(this.userPrfs));
      this.userPrfs = user
    },
 async getUser(id){
   const user = await userService.getById(id)
   this.$store.dispatch({type: 'loadReviews',filterBy:{userId:user._id}})
   this.user = user
  },
},
created(){
    const { userId } = this.$route.params;
  if (userId){
    this.getUser(userId)
   }else{
     this.$store.dispatch({type: 'loadReviews',filterBy:{userId:this.user._id}})
   }
},
components:{
  reviewList,
  Avatar,
   
    genderPicker,
    colorPicker,


}
}
</script>

<style>

</style>