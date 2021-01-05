<template>

  <section class="toy-preview flex column wrap align-center justify-center">
    <img class="img-item" :src="toy.imgUrl||'https://robohash.org/'+toy.name" />
    <h1 class="name-preivew">{{ toy.name }}</h1>
    <h1>{{ price }}</h1>
    <h2 :class="stockColor">{{stock}}</h2>
    <div class="controls-preview">
      <template v-if="loggedinUser && loggedinUser.isAdmin">
      <el-button type="primary"  @click="toyEdit(toy._id)" icon="el-icon-edit"></el-button>
      <el-button @click="removeCurrToy(toy._id)" type="danger" icon="el-icon-delete"> </el-button>
      </template>
       <el-button @click="toyDetails(toy._id)">Details</el-button>
    </div>
  </section>
</template>

<script>

export default {
  
  props: {
    toy: Object,
  },
  computed: {
    price() {
      return "Price: " + this.toy.price + "$";
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    stock(){
      return this.toy.inStock ? 'In Stock' : 'Out Of Stock'
    },
    stockColor(){
      return {red:!this.toy.inStock, green:this.toy.inStock}
    }
  },
  methods: {
    toyDetails(id) {
      this.$router.push(`/details/${id}`);
    },
    toyEdit(id) {
      this.$router.push(`/edit/${id}`);
    },
    removeCurrToy(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

