import axios from 'axios'

//全局请求拦截
axios.interceptors.request.use((config) => {
  //请求不是登录、验证码接口，添加token header
  if (['/sysUser/login', '/captcha'].indexOf(config.url) === -1) {
    const token = localStorage.getItem('token')
    if (token != null) {
      config.headers.Authorization = token
    }
    return config
  }
})
