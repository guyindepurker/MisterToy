<template>
  <section v-if="loggedinUser && loggedinUser.isAdmin" class="admin">
      <table>
          <thead>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>User Details</th>
              <th>Actions</th>
          </thead>
          <tbody>
              <tr v-for="user in users" :key="user._id">
                  <td>{{user._id}}</td>
                  <td>{{user.username}}</td>
                  <td>{{user.email}}</td>
                  <td><router-link :to="'/user/'+user._id" >Profile</router-link> </td>
                  <td v-show="user._id !== loggedinUser._id "><button @click="removeUser(user._id)">X</button></td>
              </tr>
          </tbody>
      </table>

  </section>
</template>

<script>
export default {
    methods:{
        removeUser(userId){
            this.$store.dispatch({type:'removeUser',userId})
        }
    },
computed:{
    loggedinUser(){
        return this.$store.getters.loggedinUser
    },
    users(){
        return this.$store.getters.users
    }

}, 

created(){
    if(!this.loggedinUser||!this.loggedinUser.isAdmin){
        this.$router.push('/')
    }  else{
        this.$store.dispatch({type:'loadUsers'})

    }
}
}
</script>

<style>

</style>