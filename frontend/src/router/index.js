import Vue from 'vue'
import VueRouter from 'vue-router'
import misterToy from '@/views/toy-app.cmp.vue'
import toyEdit from '@/views/toy-edit.cmp.vue'
import toyDetails from '@/views/toy-details.cmp.vue'
import dashbord from '@/views/dashbord.cmp.vue'
import about from '@/views/about.cmp.vue'
import userDetails from '@/views/user-details.cmp'
import reviews from '@/views/reviews.cmp'
import login from '@/views/login.cmp'
import adminPanel from '@/views/admin.cmp'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: misterToy
  },
  {
    path: '/edit/:toyId?',
    name: 'edit',
    component: toyEdit
  },
  {
    path: '/details/:toyId',
    name: 'details',
    component: toyDetails
  },
  {
    path: '/dashbord',
    name: 'dashbord',
    component: dashbord
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/user/:userId?',
    name: 'user',
    component: userDetails
  },
  {
    path: '/reviews',
    component: reviews
  },
  {
    path: '/admin',
    component: adminPanel
  },

]

const router = new VueRouter({
  routes
})

export default router
