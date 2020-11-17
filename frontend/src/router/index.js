import Vue from 'vue'
import VueRouter from 'vue-router'
import misterToy from '@/views/toy-app.cmp.vue'
import toyEdit from '@/views/toy-edit.cmp.vue'
import toyDetails from '@/views/toy-details.cmp.vue'


Vue.use(VueRouter)

const routes = [
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

]

const router = new VueRouter({
  routes
})

export default router
