/*
 * @Description: 请求处理
 * @Author: xiawenlong
 * @Date: 2020-12-16 19:57:59
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-25 14:19:22
 */
import axios from 'axios'
import codeMsg from './code-msg'
class Http {
  constructor() {
    this.baseURL = process.env.VUE_APP_BASE_API
    this.timeout = 3000
  }
  setInterceptor(instance) {
    instance.interceptors.request.use(
      config => {
        // TODO: 获取token
        const token = 'ironge-user-aac144e29a594bca8154a4bdce548049'
        config.headers.authorization = token
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )
    instance.interceptors.response.use(
      response => {
        const { code } = response.data
        switch (~~code) {
          case 0:
            return response.data
          default:
            return Promise.reject(response.data)
        }
      },
      error => {
        const { status = 404 } = error?.response
        if (Object.prototype.hasOwnProperty.call(codeMsg, status)) {
          this.errorHandler(error, codeMsg[status])
        }
        throw error
      },
    )
  }
  // 异常处理器
  errorHandler(error, msg) {
    if (process.env.NODE_ENV === 'development') {
      console.group('❌ HTTP Error')
      console.log('错误信息：' + msg)
      console.log('接口地址：' + error.response.config.url)
      console.log(error)
      console.groupEnd()
    } else {
      return Promise.reject(error)
    }
  }
  mergeOptions(options) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    }
  }
  request(options) {
    const instance = axios.create()
    const opts = this.mergeOptions(options)
    this.setInterceptor(instance)
    return instance(opts)
  }
  get(url, config = {}) {
    return this.request({
      method: 'get',
      url: url,
      ...config,
    })
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data,
    })
  }
}
export default new Http()
