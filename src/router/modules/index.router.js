import Layout from '@/layout'

export default [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/dashbord',
    type: 'system',
    children: [
      {
        path: '/dashbord',
        name: 'Dashbord',
        component: () => import(/*webpackChunkName:'Dashboard'*/ '@/views/dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data', affix: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/*webpackChunkName:'Login'*/ '@/views/login'),
    meta: { title: '登录' },
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/*webpackChunkName:'Redirect'*/ '@/views/redirect'),
      },
    ],
  },
  {
    path: '/exception',
    name: 'ErrorPage',
    component: Layout,
    type: 'system',
    children: [
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: '404' */ '@/views/error/404.vue'),
        hidden: true,
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '*',
    name: '*404',
    redirect: '/exception/404',
    hidden: true,
  },
]
