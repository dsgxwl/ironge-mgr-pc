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
        component: () => import('@/views/Dashboard'),
        meta: { title: '首页', icon: 'el-icon-s-data', affix: true },
      },
    ],
  },
]
