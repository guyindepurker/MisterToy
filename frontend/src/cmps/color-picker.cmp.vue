<template>
  <section class="color-picker ">
      <div @click="isPick = !isPick" class="color-pick" :style="{backgroundColor:value}"></div>
      <div v-show="isPick" class="colors-controls flex row wrap align-center">
      <div class="color-pick" @click="selectColor(color)" :style="{backgroundColor:color}" v-for="color in colors" :key="color"></div>
      </div>
  </section>
</template>

<script>
export default {
    props:{
        value:String
    },
data(){
    return {
        isPick:false,
        colors:['#ff2211','#ab00b8','#5e22a3','#3c4bbe','#00b338','#009986','#00bed8','#0094fd','#74c715','#c6df00','#ffed00','#ffc000','#3d3d3d','#567c8c','#9d9d9d','#805344','#ff4200']
    }
},
methods:{
    selectColor(color){
        this.$emit('input',color)
        this.isPick = false
    }
}
}
</script>

<style>

.color-pick{
    cursor: pointer;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    border: 1px solid black;
    margin: 2px;
}


</style>