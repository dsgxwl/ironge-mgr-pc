import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import getTitle from '@/utils/getTitle'
import store from '@/store'
import * as type from '@/store/action-types'
import { getCookie } from '@/utils/cookies'
import { getLocal } from '@/utils/local'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

let routes = []
const files = require.context('./modules/', false, /\.router.js$/)
files.keys().forEach(key => {
  const file = files(key).default || files(key)
  routes.push(...file)
})
const router = new VueRouter({
  mode: 'history',
  routes,
})

NProgress.configure({
  showSpinner: false,
})
router.beforeEach((to, from, next) => {
  document.title = getTitle(to.meta.title)
  NProgress.start()
  console.log(getCookie('myToken'))
  if (to.path === '/login') return next()
  if (!getCookie('myToken')) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    })
  } else {
    // 重拿用户信息
    if (JSON.stringify(store.state.user.userInfo) == '{}') {
      const userInfo = getLocal('userInfo', true)
      JSON.stringify(userInfo) !== '{}' && store.commit(`user/${type.SET_USER_INFO}`, userInfo)
    }
    // 重拿用户当前选择学院
    if (JSON.stringify(store.state.user.currentCollege) == '{}') {
      const currentCollege = getLocal('currentCollege', true)
      JSON.stringify(currentCollege) !== '{}' &&
        store.commit(`user/${type.SET_COLLEGE}`, currentCollege)
    }
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
