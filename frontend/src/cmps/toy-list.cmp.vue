<template>
  <section v-if="toys" class="toy-list">
    <ul class="toy-list clean-list flex row wrap align-center space-between">
      <li v-for="currToy in toys" :key="currToy._id">
        <toy-preview :toy="currToy" @remove="removeCurrToy"></toy-preview>
      </li>
    </ul>
    <div class="contorls-paging flex row space-around">
      <button @click="pagging(-1)">Prev</button>
      <button @click="pagging(1)">Next</button>
    </div>
  </section>
</template>

<script>
import toyPreview from "./toy-preview.cmp.vue";
export default {
  name: "toy-list",
  props: {
    toys: Array,
  },
  methods: {
    removeCurrToy(id) {
      this.$emit("remove", id);
    },
    pagging(diff) {
      this.$emit("setPage", diff);
    },
  },
  components: {
    toyPreview,
  },
};
</script>

<style>
</style>