<template>
  <section class="toy-filter flex column justify-center align-center wrap">
        <h1>Filter toys:</h1>
        <div class="filter-controls ">
    <form @submit.prevent="emitFilter" class="form-container flex row wrap justify-center align-center">
        <el-input class="input-filter" placeholder="Looking for..." @input="emitFilter" v-model="filterBy.q"></el-input>
                       <el-select v-model="filterBy.sort" placeholder="Sort By">
    <el-option
      v-for="item in optionsSort"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select v-model="filterBy.type" placeholder="Sort by Type">
    <el-option
      v-for="item in optionsType"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
           <el-select v-model="filterBy.inStock" placeholder="Sort by Stock">
    <el-option
      v-for="item in optionsStock"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
             <!-- <el-checkbox v-model="filterBy.inStock">{{stockTxt}}</el-checkbox> -->
 
    </form>
     <div class="flex justify-center align-center">
            <el-button type="primary" @click="emitFilter" icon="el-icon-search">Search</el-button>
  </div>
</div>
</section>
</template>

<script>
import lodash from 'lodash'
export default {
data(){
    return {
        filterBy:{
            q:'',
            inStock:'',
            type:'',
            sort:''
        },
          optionsType: [{
          value: 'all',
          label: 'All'
        }, {
          value: 'Adult',
          label: 'Adult'
        }, {
          value: 'Educational',
          label: 'Educational'
        }, {
          value: 'Funny',
          label: 'Funny'
        }],
        optionsSort: [{
          value: 'all',
          label: 'All'
        }, 
        {
          value: 'high',
          label: 'Highest Price'
        }, 
        {
          value: 'low',
          label: 'Lowest Price'
        }, 
        {
          value: 'name',
          label: 'Name'
        },],
        optionsStock: [{
          value: 'all',
          label: 'All'
        }, {
          value: true,
          label: 'In Stock'
        }, {
          value: false,
          label: 'Out of Stock'
        },],

    }
},
computed:{
    stockTxt(){
        return (this.filterBy.inStock) ? 'In Stock' : 'Out Of Stock'
    },
},
methods:{
    emitFilter(){
        const filterBy =JSON.parse(JSON.stringify(this.filterBy))
        console.log('filterBy q:', filterBy)
        this.$emit('filtered',filterBy )
    }
},
created(){
   this.emitFilter = lodash.debounce(this.emitFilter, 500)
}
}
</script>

<style>

</style>