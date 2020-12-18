import Layout from '@/layout'
export default [
  {
    path: '/class',
    component: Layout,
    name: 'Class',
    type: 'class',
    meta: { title: '班级管理', icon: 'el-icon-s-grid' },
    redirect: '/class/list',
    children: [
      {
        path: 'list',
        name: 'ClassList',
        component: () => import('@/views/Class/ClassList.vue'),
        meta: { title: '班级列表' },
      },
      {
        path: 'add',
        name: 'ClassAdd',
        component: () => import('@/views/Class/ClassAdd.vue'),
        meta: { title: '添加班级' },
      },
      {
        path: 'record',
        name: 'ClassApplyRecord',
        component: () => import('@/views/Class/ClassApplyRecord.vue'),
        meta: { title: '证书申请记录' },
      },
    ],
  },
  {
    path: '/course',
    component: Layout,
    name: 'Class',
    type: 'class',
    meta: { title: '课程管理', icon: 'el-icon-s-grid' },
    redirect: '/course/list',
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/Class/CourseList.vue'),
        meta: { title: '课程列表' },
      },
      {
        path: 'add',
        name: 'CourseAdd',
        component: () => import('@/views/Class/CourseAdd.vue'),
        meta: { title: '添加课程' },
      },
    ],
  },
]
