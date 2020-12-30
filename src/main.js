import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/button.css'
// import 'element-ui/lib/theme-chalk/dialog.css'
// import 'element-ui/lib/theme-chalk/radio.css'
// import 'element-ui/lib/theme-chalk/form.css'
// import 'element-ui/lib/theme-chalk/form-item.css'
// import 'element-ui/lib/theme-chalk/popover.css'
// import 'element-ui/lib/theme-chalk/dialog.css'
// import 'element-ui/lib/theme-chalk/input.css'
// import 'element-ui/lib/theme-chalk/dropdown.css'
// import 'element-ui/lib/theme-chalk/dropdown-menu.css'
// import 'element-ui/lib/theme-chalk/dropdown-item.css'
// import 'element-ui/lib/theme-chalk/tabs.css'
// import 'element-ui/lib/theme-chalk/tab-pane.css'
// import 'element-ui/lib/theme-chalk/avatar.css'
// import 'element-ui/lib/theme-chalk/divider.css'
// import 'element-ui/lib/theme-chalk/upload.css'
// import 'element-ui/lib/theme-chalk/radio-group.css'
// import 'element-ui/lib/theme-chalk/message.css'
// import 'element-ui/lib/theme-chalk/date-picker.css'

import App from './App.vue'
import { apiConfig } from './config/apiConfig'
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
  Message,
  DatePicker,
  Select,
  Option,
  InfiniteScroll,
  Tag,
  Loading,
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
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(InfiniteScroll)
Vue.use(Tag)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

Vue.prototype.baseUrl = apiConfig.apiBaseUrl

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
