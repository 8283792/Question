import Qs from 'qs'

const axiosConfig = {
  headers: {
    'Accept': 'application/json; charset=utf-8',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  // 跨域类型时是否在请求中协带cookie
  withCredentials: false,
  transformRequest: [function (data) {
    return Qs.stringify(data)
  }],
  // transformResponse: [function (data) {
  //   return JSON.parse(data)
  // }]
}

export {
  axiosConfig
}