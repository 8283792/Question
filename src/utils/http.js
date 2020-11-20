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