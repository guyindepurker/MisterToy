<template>
  <section class="chat-app">
      <popup>
          <h1 slot="header">Conteact With Us!</h1>
          <div class="container-massages">
              <div class="msg-txt-container" v-for="msg in massages" :key="msg._id">
                  <h2><span class="title-talking">{{msg.name}}</span> : {{msg.txt}}</h2>
              </div>
          </div>
              <form slot="footer" @submit.prevent="sendMsg" class="">
              <input type="text" v-model.trim="userMsg" placeholder="ask something...">
              <button>Send</button>
              </form>
      </popup>
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
            const userMsg = {_id:utilService.makeId(),name:'user',txt:msg}
            this.massages.push(userMsg)
            this.userMsg = ''
            this.answer()
        },
        answer(){
            const msg = {_id:utilService.makeId(),name:'Store',txt:'Sorry , we need didnt have bot yet...'}
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

