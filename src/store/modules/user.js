import * as type from '../action-types'
import { login } from '@/api/login'
import { Message } from 'element-ui'
import { setCookie } from '@/utils/cookies'
import { setLocal } from '@/utils/local'
import to from 'await-to'
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
      setCookie('userInfo', payload)
      setCookie('myToken', payload.token)
    },
    [type.SET_COLLEGE](state, payload) {
      state.currentCollege = payload
      setLocal('currentCollege', payload)
    },
  },
  actions: {
    async [type.LOGIN]({ commit }, formData) {
      const [res, err] = await to(login(formData))
      if (err) return Message.warning(err.msg)
      commit(type.SET_USER_INFO, res.data)
      return res
    },
    async [type.LOGOUT]() {
      console.log('退出登录')
    },
  },
}
