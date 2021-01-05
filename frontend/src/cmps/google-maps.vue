<template>
  <GmapMap
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
     :options="{
   zoomControl: true,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: true,
   disableDefaultUi: false
 }"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="center = m.position"
    />
  </GmapMap>
</template>

<script>
export default {
    props:{
        zoom:[Number,String],
        center:Object
    },
  data() {
    return {
      markers: [
        { position: { lat: 40.712776, lng: -74.005974 } },
        { position: { lat: 34.052235, lng: -118.243683 } },
        { position: { lat: 21.306944, lng: -157.858337 } },
      ],
    };
  },
};
</script>

<style>
</style>