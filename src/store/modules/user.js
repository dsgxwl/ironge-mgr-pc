import * as type from '../action-types'
import { login } from '@/api/login'
import { Message } from 'element-ui'
import { setCookie } from '@/utils/cookies'
import { setLocal } from '@/utils/local'
export default {
  state: {
    token: '',
    userInfo: {},
    currentCollege: {},
  },
  mutations: {
    [type.SET_USER_INFO](state, payload) {
      state.userInfo = payload
      state.token = payload.token
      setLocal('userInfo', payload)
      setCookie('myToken', payload.token)
    },
    [type.SET_COLLEGE](state, payload) {
      state.currentCollege = payload
      setLocal('currentCollege', payload)
    },
  },
  actions: {
    async [type.LOGIN]({ commit }, formData) {
      try {
        const result = await login(formData)
        commit(type.SET_USER_INFO, result.data)
        return result
      } catch (error) {
        console.log(error)
        error.msg && Message.warning(error.msg)
      }
    },
    async [type.LOGOUT]() {
      try {
        console.log('退出登录')
      } catch (error) {
        console.log(error)
        error.msg && Message.warning(error.msg)
      }
    },
  },
}
