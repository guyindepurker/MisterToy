<template>
  <section class="chat-app flex column space-between">
          <div class="container-massages">
              <div class="msg-txt-container" v-for="msg in massages" :key="msg._id">
                  <h2><span class="title-user">{{msg.name}}</span> : {{msg.txt}}</h2>
              </div>
          </div>
              <form  @submit.prevent="sendMsg" class="flex ">
        <el-input  v-model.trim="userMsg" placeholder="ask something..."></el-input>
                <el-button class="mr-5" @click="sendMsg">Send</el-button>
              </form>

  </section>
</template>
<script>
import popup from './popup.cmp.vue'
import {utilService} from '@/services/util.service.js'
export default {
    data(){
        return {
            userMsg:'',
            massages:[]
        }
    },
    methods:{
        sendMsg(){
            const msg = JSON.parse(JSON.stringify(this.userMsg))
            if(!msg) return;
            const userMsg = {_id:utilService.makeId(),name:'User',txt:msg}
            this.massages.push(userMsg)
            this.userMsg = ''
            this.answer()
        },
        answer(){
            const msg = {_id:utilService.makeId(),name:'Store',txt:'Sorry , this chat is in progress...'}
             setTimeout(()=>{
            this.massages.push(msg)
            },1000)
     
        },
    },
    created(){
        this.answer()
    },
components:{
    popup
}
}
</script>

