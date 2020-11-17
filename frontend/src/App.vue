<template>
  <div id="app" class="">
   <app-header />
    <router-view class=""/>
    <button @click="isChat=!isChat" class="btn-chat"><i class="icon-chat fas fa-comment"></i></button>
    <chat-app v-if="isChat" />
    <app-footer/>
  </div>
</template>

<script>
import appHeader from './views/toy-header.cmp.vue'
import appFooter from './views/toy-footer.cmp.vue'
import chatApp from './cmps/chat-app.cmp.vue'
export default {

  name:'app-main',
  data(){
    return {
      isChat:false
    }
  },
  methods:{
    clickMe(){
       this.isChat = !this.isChat
    }
  },
 components:{
   appHeader,
   appFooter,
   chatApp
 }
}
</script>
