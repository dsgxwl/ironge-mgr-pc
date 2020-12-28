import Layout from '@/layout'
export default [
  {
    path: '/class',
    component: Layout,
    name: 'Class',
    type: 'class',
    meta: { title: '班级管理', icon: 'el-icon-data-board' },
    redirect: '/class/list',
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import(/*webpackChunkName:'ClassList'*/ '@/views/class/ClassList'),
        meta: { title: '班级列表' },
      },
      {
        path: 'add',
        name: 'ClassAdd',
        component: () => import(/*webpackChunkName:'ClassAdd'*/ '@/views/class/ClassAdd'),
        meta: { title: '添加班级' },
      },
      {
        path: 'edit/:id',
        name: 'ClassEdit',
        component: () => import(/*webpackChunkName:'ClassEdit'*/ '@/views/class/ClassAdd'),
        meta: { title: '编辑班级' },
        hidden: true,
      },
      {
        path: 'record',
        name: 'ClassApplyRecord',
        component: () =>
          import(/*webpackChunkName:'ClassApplyRecord'*/ '@/views/class/ClassApplyRecord'),
        meta: { title: '证书申请记录' },
      },
      {
        path: 'student',
        name: 'ClassStudent',
        component: () => import(/*webpackChunkName:'ClassStudent'*/ '@/views/class/ClassStudent'),
        meta: { title: '班级学员管理' },
        hidden: true,
      },
    ],
  },
]
