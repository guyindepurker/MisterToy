<template>
  <div id="app" :style="darkMode" class="flex column main-content">
   <app-header />
    <router-view :style="darkMode" class="grow" />
    <el-button type="primary" @click="isPopupShown=!isPopupShown" class="btn-chat"><i class="icon-chat el-icon-chat-dot-round
"></i></el-button>
    <popup v-if="isPopupShown">
          <h1 class="header-popup" slot="header">Contect</h1>
    <chat-app  />
    <h4 slot="footer">ToyStore</h4>
    </popup>
    <app-footer/>
  </div>
</template>

<script>
import appHeader from '@/cmps/toy-header.cmp.vue'
import appFooter from '@/cmps/toy-footer.cmp.vue'
import chatApp from '@/cmps/chat-app.cmp.vue'
import popup from '@/cmps/popup.cmp.vue'
export default {
  name:'app-main',
  data(){
    return {
      isPopupShown:false
    }
  },
  computed:{
    darkMode(){
      const {color , bgColor} = this.$store.getters.siteTheme
      return {backgroundColor:bgColor || '', color:color||''}
    }
  },
    created() {
    this.$store.dispatch({
      type: "loadToys",
    });
  },
 components:{
   appHeader,
   appFooter,
   chatApp,
   popup
 }
}
</script>
