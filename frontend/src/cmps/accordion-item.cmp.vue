<template>
  <section @click="toggleItem" class="accordion-item">
      <h2 class="title">{{title}}</h2>
      <div v-show="isActive">
<slot>Sorry we didnt have content yet...</slot>
          
      </div>
  </section>
</template>

<script>

export default {
props:{
    title:{
        type:String,
        required:true,
    },
},
data(){
    return {
        isActive:false,
    }
},
methods:{
    toggleItem(){
        this.$parent.toggleAccordion(this)
    }
}
}
</script>

<style>

</style>