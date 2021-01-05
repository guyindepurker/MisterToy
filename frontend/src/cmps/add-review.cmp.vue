<template>
<section v-if="user" class="add-reviews ">
       <el-button  :type="reviewType" @click="isAddReivew = !isAddReivew" plain>{{reviewButton}}</el-button>
       <form v-if="isAddReivew" class="form-review flex column wrap align-center mt-5" @submit.prevent="addReview()">
      <el-rate
  v-model="reviewToEdit.rate"
  :texts="['bad', 'disappointed', 'normal', 'good', 'great']"
  show-text>
</el-rate>
      <el-input
  type="textarea"
  :autosize="{ minRows: 2, maxRows: 4}"
  resize="none"
  placeholder="Your Opinion Matters..."
  v-model="reviewToEdit.txt">
</el-input>
        <el-button type="success" @click="addReview()" plain>Save</el-button>
    </form>
    </section>
</template>

<script>
export default {
    props:{
        user:{
            type:Object,
        required:true},
        toy:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
    reviewToEdit: {
        txt: '',
        rate:0
      },
      isAddReivew:false

        }
    },
    computed:{
  reviewType(){
   return this.isAddReivew ? 'danger' : 'success'
  },
  reviewButton(){
    return this.isAddReivew ? 'Close Review Comment' : 'Add New Review'
  },
    },
    methods:{
        addReview() {
          this.reviewToEdit.toyId = this.toy._id
          this.reviewToEdit.createdAt = Date.now()
          this.$store.dispatch({type: 'addReview', review: this.reviewToEdit})
          this.reviewToEdit = {txt: '',rate:0}
        },

    }
}
</script>

<style>

</style>