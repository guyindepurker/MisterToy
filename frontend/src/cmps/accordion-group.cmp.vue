<template>
  <section class="acordion-group">
      <slot></slot>
  </section>
</template>

<script>
export default {
methods:{
    toggleAccordion(item){
        this.$children.forEach(child => {
          child.isActive = false
        })
        item.isActive = true
    }
}
}
</script>

<style>

</style>