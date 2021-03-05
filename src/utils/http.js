import axios from 'axios'
import { apiConfig } from '@/config/apiConfig'
import { axiosConfig } from '@/config/axiosConfig'
import { messageError, loading } from '@/utils/elementTools'
import { clearUser } from '../common/cache/cache'

class Http {
  static async request({ url, data, method = 'GET' }) {
    url = apiConfig.apiBaseUrl + url
    const _config = Object.assign(axiosConfig, {
      method,
      data,
      url,
    })

    // 如果是与服务器交互时间较长的操作，因为比较慢所以使用loading过渡一下
    if (data && data.authorization) {
      const { transaction } = JSON.parse(data.authorization)
      if (
        transaction == 'Create Reply' ||
        transaction == 'Create Topic' ||
        transaction == 'Update User Avatar'
      ) {
        this._loading = loading({
          lock: true,
          text: '上传中...',
          spinner: 'el-icon-loading',
        })
      }
    }

    return await axios(_config)
      .then((res) => {
        const rescCode = res.data.message_no
        if (this._loading) this._loading.close()
        switch (rescCode) {
          case 101:
            messageError('认证信息错误，请重新登录')
            clearUser()
          case 100:
            messageError('验证失败，请重试')
            return
          case 200:
            return res.data
          default:
            return null
        }
        // if (rescCode == 101) {
        //   messageError('认证信息错误，请重新登录')
        //   localStorage.clear()
        //   return
        // }
        // if (rescCode == 100) {
        //   messageError('数据出错，请重试')
        //   return
        // }
        // if (rescCode == 200) {
        //   return res.data
        // }
        // if (this._loading) this._loading.close()
        // return null
      })
      .catch((e) => {
        messageError('网络通信异常')
      })
  }
}

export { Http }
