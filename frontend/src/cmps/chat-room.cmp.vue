<template>
  <section class="chat-room">
    <h1>chat</h1>

  <div v-show="isTypeing">
  {{msgTyping}}
  </div>
<ul v-if="msgs" class="chat-msgs">
      <li v-for="(msg, idx) in msgs" :key="idx">
       {{msg.from}} : {{msg.txt}}
      </li>
    </ul>
      <form @submit.prevent="sendMsg">
      
      <input type="text" @input="userTyping"  v-model="msg.txt" />
      <button>Send</button>
        </form>
  </section>
</template>

<script>
import {socketService} from '@/services/SocketService.js'
export default {

 data() {
    return {
      msg: {from: (this.$store.getters.loggedinUser ? this.$store.getters.loggedinUser.username : 'guest'), txt: ''},
      msgs: [],
      isTypeing:false,
      msgTyping:'',
      topic:null
    }
  },

  created() {
    const { toyId } = this.$route.params;
    this.topic = toyId
    console.log('topic:',this.topic);
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('history msg',msgs=>this.msgs = msgs)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('isTyping',(boolen)=>this.isTypeing=boolen)
    socketService.on('msg',(msg)=>this.msgTyping=msg)
  },
  destroyed() {
    this.msgs = []
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },

  methods: {
    userTyping(){
      var timer = null
        socketService.emit('typing',this.msg.from)
      clearTimeout(timer); 
       timer = setTimeout(()=>{
          socketService.emit('reset is typing')
        },2500)
    },
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      if(!this.msg.txt) return 
      socketService.emit('reset is typing')
      socketService.emit('chat newMsg', this.msg)
      this.msg.txt=''
    }
  },
 
}
</script>

<style>

</style>