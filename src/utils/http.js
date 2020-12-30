import axios from 'axios'
import { apiConfig } from '@/config/apiConfig'
import { axiosConfig } from '@/config/axiosConfig'
import { messageError, loading } from '@/utils/elementTools'

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
        if (res.data.message_no == 100) {
          messageError('用户认证信息错误，请重新登录')
          return
        }
        if (this._loading) this._loading.close()
        return res.data
      })
      .catch((e) => {
        messageError('网络通信异常')
      })
  }
}

export { Http }
