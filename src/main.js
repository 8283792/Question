import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(ElementUI)
Vue.use(SlideVerify)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})