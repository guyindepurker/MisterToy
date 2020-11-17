<template>
  <section class="toy-edit">
      <h1>{{title}}</h1>
      <form @submit.prevent="saveToy">
          <input type="text" placeholder="Toy Name" v-model="toyToSave.name">
          <label for="toy-stock">In stock?
          </label>
          <input type="checkbox" id="toy-stock"  v-model="toyToSave.inStock">
            <label for="toy-price">Price
          </label>
          <input type="number" id="toy-price" v-model.number="toyToSave.price" placeholder="Price">
          <select  v-model="toyToSave.type">
              <option value="Adult">Adult</option>
              <option value="Educational">Educational</option>
              <option value="Funny">Funny</option>
          </select>
          <button>{{save}}</button>
      </form>
      
  </section>
</template>

<script>
    import { toyService } from '@/services/toy.service.js'
export default {
    name:'toy-edit',
    data(){
        return {
           toyToSave: toyService.getEmptyToy()
        }
    },
     computed:{
        title(){
            return (this.$route.params.toyId)? 'Toy Editor' : 'Add New Toy';
          },
          save(){
            return  (this.$route.params.toyId)? 'Save Changes' : 'Add';
          }

},
    methods:{
               saveToy(){
            const toy = JSON.parse(JSON.stringify(this.toyToSave))
            if(!toy.name) return 
            this.$store.dispatch({
                type:'saveToy',
                toy
            })
            this.todoToUpdate = toyService.getEmptyToy()
            this.$router.go(-1)
        }
    },
      created() {
    const { toyId } = this.$route.params;
    if(toyId){
     toyService.getById(toyId).then(res => this.toyToSave = res)}
  },
}
</script>
