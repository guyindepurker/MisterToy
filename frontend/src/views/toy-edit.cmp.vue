<template>
  <section class="toy-edit mt-5">
    <h1>{{ title }}</h1>
    <form
      @submit.prevent="saveToy"
      class="form-editor flex column wrap align-center justify-center"
    >
      <el-input placeholder="Toy Name" v-model="toyToSave.name"></el-input>
      <el-input placeholder="Price" v-model.number="toyToSave.price"></el-input>

      <el-select v-model="toyToSave.type" placeholder="Select Type">
        <el-option
          v-for="item in optionsType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-checkbox v-model="toyToSave.inStock">{{ stockTxt }}</el-checkbox>
   <template v-if="!isLoading">
      <label for="imgUploader"> <img src="https://lh3.googleusercontent.com/proxy/ybV5upOkFlWYVsEN_aWw4UmnHgjOlEG9kzWbDfedBxVYU_jO6UK1bNgdzCGO1FRTT0oCoDPbtweZrB-Qc-dIopuMGygTvvhWdoJznm-RN6g9O_wF-5EuVg4Rr1o" alt=""> </label>
      <input type="file" class="input-file" name="img-uploader" id="imgUploader" @change="onUploadImg">  
    </template>
    <img class="loader" v-else  src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/8ee212dac057d412972e0c8cc164deee.gif" alt="">
      <div v-if="toyToSave.imgUrl" class="img-list">
      <img  :src="toyToSave.imgUrl"  alt="img...">
    </div>
      <el-button type="primary" class="mt-5" @click="saveToy">{{
        save
      }}</el-button>
    </form>
   
  </section>
</template>

<script>
import { toyService } from "@/services/toy.service.js";
import { uploadImg } from '@/services/img-upload.service.js';

export default {
  name: "toy-edit",
  data() {
    return {
      isLoading: false,
      toyToSave: toyService.getEmptyToy(),
      optionsType: [
        {
          value: "Adult",
          label: "Adult",
        },
        {
          value: "Educational",
          label: "Educational",
        },
        {
          value: "Funny",
          label: "Funny",
        },
      ],
    };
  },
  computed: {
    title() {
      return this.$route.params.toyId ? "Toy Editor" : "Add New Toy";
    },
    save() {
      return this.$route.params.toyId ? "Save Changes" : "Add";
    },
    toysTypes() {
      return this.$store.getters.typesForDisplay;
    },
    stockTxt() {
      return this.toyToSave.inStock ? "In Stock" : "Out Of Stock";
    },
  },
  methods: {
     async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      this.toyToSave.imgUrl = res.url;
      this.isLoading = false;
    },
    saveToy() {
      const toy = JSON.parse(JSON.stringify(this.toyToSave));
      if (!toy.name) return;
      this.$store.dispatch({
        type: "saveToy",
        toy,
      });
      this.todoToUpdate = toyService.getEmptyToy();
      this.$router.push('/');
    },
   async loadToy(id){
     const toy = await toyService.getById(id)
     this.toyToSave = toy
    }
  },
  created() {
    const { toyId } = this.$route.params;
    if (toyId) {
      this.loadToy(toyId)
    }
  },
  components: {
  },
};
</script>
