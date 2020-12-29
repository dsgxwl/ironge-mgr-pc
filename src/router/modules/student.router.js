import Layout from '@/layout'
export default [
  {
    path: '/student',
    component: Layout,
    name: 'Student',
    type: 'student',
    meta: { title: '学员管理', icon: 'el-icon-user' },
    redirect: '/student/list',
    children: [
      {
        path: 'list',
        name: 'StudentList',
        component: () => import(/*webpackChunkName:'StudentList'*/ '@/views/student/StudentList'),
        meta: { title: '学员列表' },
      },
      {
        path: 'edit/:id',
        name: 'StudentEdit',
        component: () => import(/*webpackChunkName:'StudentEdit'*/ '@/views/student/StudentEdit'),
        meta: { title: '编辑学员' },
        hidden: true,
      },
      {
        path: 'add',
        name: 'StudentAdd',
        component: () => import(/*webpackChunkName:'StudentAdd'*/ '@/views/student/StudentAdd'),
        meta: { title: '添加学员' },
      },
    ],
  },
]
