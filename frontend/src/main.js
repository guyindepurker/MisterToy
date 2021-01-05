import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDA-5D_hj0UwZeQ3hTvxn_WgvQK67mk_8w',}})
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/sass/styles.scss';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
