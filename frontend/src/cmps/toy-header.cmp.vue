<template>
   <div class="header-app-container flex space-between justify-center" >
      <nav>
         <span class="logo">
      MisterToy
         </span>
      <router-link to="/" exact>Home</router-link> |
      <router-link to="/dashbord" exact>dashbord</router-link> |
      <router-link to="/edit" v-if="loggedinUser && loggedinUser.isAdmin" exact>Add New |</router-link> 
      <router-link to="/about" exact>About</router-link>  |
      <router-link to="/reviews" exact>reviews</router-link>  |
      <router-link to="/login" v-if="!loggedinUser" exact>Login</router-link> 
       <el-button :type="darkModeType" @click="darkMode" round>{{darkModeTxtBtn}}</el-button>
      <div v-if="loggedinUser">Walcome ,<router-link to="/user" exact>{{loggedinUser.username}}</router-link> <br />
        <el-button type="danger" class="mt-5" @click="logout">Logout</el-button>
        <el-button v-if="loggedinUser.isAdmin"  type="danger" class="mt-5" @click="adminPanel">Admin Panel</el-button>
       </div>
      </nav>
    </div>
</template>
<script>
export default {
   data(){
      return {
         prefs: JSON.parse(JSON.stringify(this.$store.getters.siteTheme)),
         isDarkMode:false,
      }
   },
   computed:{
       loggedinUser() {
      console.log('this.$store.getters.loggedinUser:', this.$store.getters.loggedinUser)
      return this.$store.getters.loggedinUser

    },
    darkModeTxtBtn(){
       return this.isDarkMode ? 'Light' : 'DarkMode'
    },
    darkModeType(){
       return this.isDarkMode ? '' : 'info'

    }

   },
   methods:{
      adminPanel(){
         this.$router.push('/admin') 
         .catch(()=>{})
      },
      logout(){
         this.$store.dispatch({type:'logout'})
         console.log(this.loggedinUser,'logut!');
      },
      darkMode(){
         this.isDarkMode = !this.isDarkMode
         if(this.isDarkMode){
         this.prefs.color = '#323131'
         this.prefs.bgColor = '#505050'
         }else{
         this.prefs.color = ''
         this.prefs.bgColor = ''
         }
         var prefs = JSON.parse(JSON.stringify(this.prefs))
         this.$store.commit({type:'setPrefs',prefs})  
      }
   }
}
</script>
