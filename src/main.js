import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import httpAxios from './views/utils/httpAxios'
import './assets/css/global.scss'
Vue.use(ElementUI)
// 富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import global from './js/global.js'
import './assets/css/global.css'

Vue.use(VueQuillEditor /* { default global options } */)

// 设置默认接口请求路径
Vue.prototype.axios = axios
Vue.prototype.global = global

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem('token')
//   let isLogin
//   if (token == 'null') {
//     isLogin = false
//   } else {
//     isLogin = true
//   }
//   if (!isLogin) {
//     if (to.path !== '/login') {
//       return next({ path: '/login' })
//     } else {
//       next()
//     }
//   } else {
//     if (to.path === '/login') {
//       return next({ path: '/' })
//     }
//     next()
//   }
// })

new Vue({
  router,
  store,
  httpAxios,
  render: (h) => h(App)
}).$mount('#app')
