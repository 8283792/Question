import axios from 'axios'
import { apiConfig } from '@/config/apiConfig'
import { axiosConfig } from '@/config/axiosConfig'

class Http{
  static async request({url, data, method = 'GET'}){
    url = apiConfig.apiBaseUrl + url
    const _config = Object.assign(axiosConfig, {
      method, data, url
    })
    
    return await axios(_config).then(res => {
      if(res.data.message_no == 100) {
        window.Vue.prototype.$message({
          type: 'error',
          message: '用户信息过期，请重新登录'
        })
      }
      return res.data
    }).catch(e => {
      window.Vue.prototype.$message({
        type: 'error',
        message: '网络通信异常'
      })
    })
  }
}

export {
  Http
}