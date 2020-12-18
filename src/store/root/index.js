import * as type from '../action-types'
export default {
  state: {
    opened: sessionStorage.getItem('open') ? sessionStorage.getItem('open') : 'false',
    menuType: '',
  },
  mutations: {
    [type.SET_SIDE_OPENED](state, payload) {
      state.opened = String(payload)
      sessionStorage.setItem('open', payload)
    },
    [type.SET_MENU_TYPE](state, payload) {
      state.menuType = payload
    },
  },
  actions: {},
  modules: {},
}
