import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify'
import {
  Button,
  Dialog,
  Radio,
  Form,
  FormItem,
  Popover,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tabs,
  TabPane,
  Avatar,
  Divider,
  Upload,
  RadioGroup,
  Message
} from 'element-ui'

// Vue.use(ElementUI)
Vue.use(SlideVerify)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Popover)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Upload)
Vue.use(RadioGroup)

Vue.prototype.$message = Message


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})