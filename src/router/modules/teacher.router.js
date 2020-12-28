import Layout from '@/layout'
export default [
  {
    path: '/teacher',
    component: Layout,
    name: 'Teacher',
    type: 'teacher',
    meta: { title: '教师管理', icon: 'el-icon-s-custom' },
    redirect: '/teacher/add',
    children: [
      {
        path: 'add',
        name: 'TeacherAdd',
        component: () => import(/*webpackChunkName:'TeacherAdd'*/ '@/views/teacher/TeacherAdd'),
        meta: { title: '添加教师' },
      },
    ],
  },
]
