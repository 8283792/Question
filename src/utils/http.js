import axios from 'axios'
import { apiConfig } from '@/config/apiConfig'
import { axiosConfig } from '@/config/axiosConfig'

class Http{
  static async request({url, data, method = 'GET'}){
    url = apiConfig.apiBaseUrl + url
    const _config = Object.assign(axiosConfig, {
      method, data, url
    })
    
    const instance = await axios(_config)
    return instance.data;
  }
}

export {
  Http
}