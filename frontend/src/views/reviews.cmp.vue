<template>
  <section v-if="reviews" class="reviews">
 <review-list title="Toy review" :reviews="reviews" />
  </section>
</template>

<script>
import reviewList from '@/cmps/review-list.cmp'

export default {
    computed:{
        reviews(){
             console.log('this.$store.getters.reviews;:', this.$store.getters.reviews)
             return this.$store.getters.reviews;
         },
       },
created(){
    this.$store.dispatch({type: 'loadReviews',filterBy:null})
},
components:{
reviewList

}
}
</script>

<style>

</style>
