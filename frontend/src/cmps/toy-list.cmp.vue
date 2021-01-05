<template>
  <section v-if="toys" class="toy-list">
    <ul class="toy-list clean-list flex row wrap align-center space-between">
      <li v-for="currToy in toys" :key="currToy._id">
        <toy-preview :toy="currToy" @remove="removeCurrToy"></toy-preview>
      </li>
    </ul>
    <div class="contorls-paging flex row space-around">
        <el-button type="primary" @click="pagging(-1)" icon="el-icon-arrow-left">Previous Page</el-button>
  <el-button @click="pagging(1)" type="primary">Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
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