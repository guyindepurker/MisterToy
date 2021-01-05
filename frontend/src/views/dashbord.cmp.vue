<template>
  <section v-if="types" class="dasbord flex row justify-center">
    <chart class="charting" :label="titleTypesChart" :labels="typesKeys" :data="typesValue" />
  </section>
</template>

<script>
import chart from "@/cmps/chart.cmp.vue";
export default {
  name: "dashbord",
  data(){
      return {
          types:null,
      }
  },
  computed: {
    toys() {
      return JSON.parse(JSON.stringify(this.$store.getters.toysForDisplay));
    },
    typesKeys(){
        return Object.keys(this.types)
    },
    typesValue(){
        return Object.values(this.types)
    },
    titleTypesChart(){
        return 'Price for catrgory'
    }
  },
    created(){
        const types = this.toys.reduce((acc, toy) => {
        if (!acc[toy.type]) acc[toy.type] = 0;
        acc[toy.type] += toy.price
        return acc;
      }, {});
       this.types = types;
    },
  components: {
    chart,
  },
};
</script>

<style>
</style>