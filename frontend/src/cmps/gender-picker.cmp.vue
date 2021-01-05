<template>
  <div class="gender-picker">
      <!-- <button @click="isPick = !isPick">Choose</button> -->
      <div v-if="!isPick"  @click="isPick = !isPick"><strong>Gender: </strong>{{value}}</div>
      <ul v-else class="gender-select" v-show="isPick">
        <li @click="genderSelect(option)"  v-for="(option,idx) in options" :key="idx">
            {{option}}
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
    value:String
    },
data(){
    return {
        isPick:false,
        options:['Male','Female','None']
    }
},
methods:{
    genderSelect(gender){
       this.$emit('input',gender)
       this.isPick = false
    }
}
}
</script>

<style>
.gender-select{
    cursor: pointer;
    list-style: none;
}
</style>