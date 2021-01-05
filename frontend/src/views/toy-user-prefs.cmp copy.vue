<template>
  <section class="user-prefs flex column align-center">
    <h1>User perfs</h1>
    <p class="txt mb-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum amet
      neque libero ea! Architecto cum tempora culpa labore expedita quidem nobis
      repellat quaerat, eligendi alias. Recusandae voluptas eaque eligendi
      ducimus?
    </p>
    <div class="flex column wrap space-between align-center">
    <gender-picker v-model="userPrfs.gender" />
    <color-picker v-model="userPrfs.favColor" />
    <el-button type="primary" class="mt-5" @click="updateUser" i>Save</el-button>
    </div>
  </section>
</template>

<script>

import genderPicker from "@/cmps/gender-picker.cmp";
import colorPicker from "@/cmps/color-picker.cmp";
export default {
  data() {
    return {
      userPrfs:{
        favColor:'black',
        gender:'male'
      }
    };
  },
  methods: {
    updateUser() {
      const user = JSON.parse(JSON.stringify(this.userPrfs));
      this.userPrfs = user
    },
  },

  components: {
    genderPicker,
    colorPicker,

  },
};
</script>

<style>
</style>