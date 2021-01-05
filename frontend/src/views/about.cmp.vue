<template>
  <section class="about-us flex column wrap align-center mt-5">
      <h1>Contect Us</h1>
    <div class="contect-us">   
        <h2><strong>Phone:</strong> 402-736-2502</h2>
        <h2 class="title-address"><strong>Address:</strong> NY,New York,4990  Bell Street,US</h2>
    </div>
  <google-maps :center="center" :zoom="zoom" />
  <h2>Our Branches</h2>
  <div class="contorls-map flex row wrap align-center mt-5">
  <el-button @click="panToMap(40.712776,-74.005974)" type="primery mt-5">Los Angels</el-button>
  <el-button type="primery mt-5" @click="panToMap(34.052235,-118.243683)" >New York</el-button>
  <el-button type="primery mt-5" @click="panToMap( 21.306944,-157.858337)">Honolulu</el-button>
  </div>
   <section class="acotrion mt-5 mb-5">
      <accordion-group>
        <accordion-item title="The Team">
          <h2 class="txt">{{lorem}}</h2>
        </accordion-item>
        <accordion-item title="About Us">
          <h2 class="txt">{{lorem}}</h2> 
        </accordion-item>
        <accordion-item title="Our features">
          <h2 class="txt">{{lorem}}</h2> 
        </accordion-item>
      </accordion-group>
    </section>
  </section>
</template>

<script>
import {utilService} from '@/services/util.service.js';
import googleMaps from '@/cmps/google-maps.vue';
import accordionGroup from "@/cmps/accordion-group.cmp";
import accordionItem from "@/cmps/accordion-item.cmp";
export default {
    data(){
        return {
            center:{ lat: 40.712776, lng: -74.005974 },
            zoom:3
        }
    },
    methods:{
     panToMap(lat,lng){
    this.center = {lat: lat, lng: lng}
    this.zoom=7
    },
        },
  computed:{
      lorem(){
          return utilService.makeLorem()
      }
  },
components:{
    googleMaps,
        accordionGroup,
    accordionItem,
}
}
</script>

<style>

</style>