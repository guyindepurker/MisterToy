<template>
  <section class="toy-app">
    <toy-filter @filtered="setFilter"></toy-filter>
    <toy-list class="container-toy"
      v-if="!isLoading"
      :toys="toys"
      @setPage="changeCurrPage"
      @remove="removeToy"
    ></toy-list>
    <img
      v-else
      src="https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif"
    />
    
  </section>
</template>

<script>
import toyFilter from "@/cmps/toy-filter.cmp.vue";
import toyList from "@/cmps/toy-list.cmp.vue";
export default {
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    toys() {
      return JSON.parse(JSON.stringify(this.$store.getters.toysForDisplay));
    },
    user(){
      return this.$store.getters.loggedinUser
    }
 
  },
  methods: {
    changeCurrPage(diff) {
      this.$store.dispatch({ type: "changePage", diff });
    },
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "loadToys" });
    },
    removeToy(id) {
      this.$store.dispatch({
        type: "removeToy",
        id,
      });
    },
  },
    created() {
    this.$store.dispatch({
      type: "loadToys",
    })},
  components: {
    toyList,
    toyFilter,
  },
};
</script>

