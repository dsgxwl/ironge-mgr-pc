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
        component: () => import('@/views/Class/ClassManagement/ClassList.vue'),
        meta: { title: '班级列表' },
      },
      {
        path: 'add',
        name: 'ClassAdd',
        component: () => import('@/views/Class/ClassManagement/ClassAdd.vue'),
        meta: { title: '添加班级' },
      },
      {
        path: 'edit/:id',
        name: 'ClassEdit',
        component: () => import('@/views/Class/ClassManagement/ClassAdd.vue'),
        meta: { title: '编辑班级' },
        hidden: true,
      },
      {
        path: 'record',
        name: 'ClassApplyRecord',
        component: () => import('@/views/Class/ClassManagement/ClassApplyRecord.vue'),
        meta: { title: '证书申请记录' },
      },
    ],
  },
  {
    path: '/course',
    component: Layout,
    name: 'Course',
    type: 'class',
    meta: { title: '课程管理', icon: 'el-icon-notebook-1' },
    redirect: '/course/list',
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import('@/views/Class/CourseManagement/CourseList.vue'),
        meta: { title: '课程列表' },
      },
      {
        path: 'add',
        name: 'CourseAdd',
        component: () => import('@/views/Class/CourseManagement/CourseAdd.vue'),
        meta: { title: '添加课程' },
      },
      {
        path: 'edit/:id',
        name: 'CourseEdit',
        component: () => import('@/views/Class/CourseManagement/CourseAdd.vue'),
        meta: { title: '编辑课程' },
        hidden: true,
      },
    ],
  },
]
