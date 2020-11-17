<template>
  <section class="toy-filter flex column justify-center align-center wrap">
        <h1>Filter toys:</h1>
        <div class="filter-controls flex row wrap">
    <form @submit.prevent="emitFilter" class="form-container">
            <input type="text" v-model="filterBy.q" @input="emitFilter" id="filter-by-txt" placeholder="Looking for..." >
            <select v-model="filterBy.sort">
                <option value="">All</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>
             <select  v-model="filterBy.type">
                <option value="">All</option>
              <option value="Adult">Adult</option>
              <option value="Educational">Educational</option>
              <option value="Funny">Funny</option>
          </select>
            <label for="toy-in-stock">In Stock</label>
            <input type="checkbox" v-model="filterBy.inStock" id="toy-in-stock">
            <button class="btn">Search</button>
    </form>
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
            inStock:true,
            type:'',
            sort:''
        }
    }
},
methods:{
    emitFilter(){
        const filterBy =JSON.parse(JSON.stringify(this.filterBy))
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