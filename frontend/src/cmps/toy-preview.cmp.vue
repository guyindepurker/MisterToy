<template>
  <section class="toy-preview flex column wrap align-center justify-center">
    <img class="img-item" :src="'https://robohash.org/' + toy.name" />

    <h1>Name: {{ toy.name }}</h1>
    <h1>{{ price }}</h1>
    <div class="controls-preview">
      <button @click="toyEdit(toy._id)">Edit</button>
      <button @click="removeCurrToy(toy._id)" class="btn btn-close">
        Remove
      </button>
      <button @click="toyDetails(toy._id)">Details</button>
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

