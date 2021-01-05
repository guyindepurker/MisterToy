<template>
  <section class="login-page">
    <h1>{{titleLogin}}</h1>
    <h2 class="msg">{{msg}}</h2>
    <div v-if="loggedinUser">
        <h2 class="green">Walcome back,{{loggedinUser.username}} moving you to the main page</h2>
        <el-button type="danger" @click="doLogout">Logout</el-button>
    </div>
    <div v-else>
<!-- login section -->
    <form class="form-login flex column wrap align-center" v-show="!isSignUp" @submit.prevent="doLogin">
      <el-input  v-model="loginCred.email" placeholder="Email"></el-input>
      <el-input placeholder="Please Enter Password" v-model="loginCred.password" show-password></el-input>
          <el-button type="primary" @click="doLogin">Login</el-button>
          <div class="mt-5">
           Not A member? <strong> <span class="green sign-up-click" @click="isSignUp =!isSignUp">Signup</span></strong>
          </div>
    </form>
<!-- signup section -->
    <form class="form-login flex column wrap align-center" @submit.prevent="doSignup" v-show="isSignUp">
      <el-input  v-model="signupCred.email" placeholder="Email" ></el-input>
      <el-input v-model="signupCred.password" placeholder="Password" show-password></el-input>
      <el-input  v-model="signupCred.username" placeholder="User name"></el-input>
          <el-button type="primary" @click="doSignup">Signup</el-button>
          <div class="mt-5">
           Alerdy A member? <strong> <span class="green sign-up-click" @click="isSignUp =!isSignUp">Login</span></strong>
          </div>
    </form>
    </div>   

  </section>
</template>

<script>
export default {
  name: 'user-login',
  data() {
    return {
      loginCred: {},
      signupCred: {},
      msg: '',
      // userToEdit: {},
      isSignUp:false
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      console.log('this.$store.getters.loggedinUser:', this.$store.getters.loggedinUser)
      return this.$store.getters.loggedinUser

    },
    titleLogin(){
      return this.isSignUp ? 'Sign up' : 'Login'
    }
  },
  created() {
    console.log('this.loggedinUser', this.loggedinUser)
  },
  methods: {
    async doLogin() {
      const cred = this.loginCred
      if(!cred.email || !cred.password) return this.msg = 'Please enter user/password'
       await this.$store.dispatch({type :'login', userCred:cred})
       setTimeout(()=>{
         this.$router.push('/') 
       },2000)    
      this.loginCred = {};
    },   
    doLogout() {
      this.$store.dispatch({type: 'logout'})
    },
    doSignup() {
      const cred = this.signupCred
      if(!cred.email || !cred.password ||!cred.username) return this.msg = 'Please fill up the form'
      this.$store.dispatch({type: 'signup', userCred: cred})
           setTimeout(()=>{
         this.$router.push('/') 
       },2000)  
    },
  },
  watch : {
    loggedinUser() {
      this.userToEdit = {...this.loggedinUser}
    }
  }  
}
</script>