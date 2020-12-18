export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { title: '登录页' },
    hidden: true,
  },
  {
    path: '*',
    name: '*404',
    redirect: '/404',
    hidden: true,
  },
]
