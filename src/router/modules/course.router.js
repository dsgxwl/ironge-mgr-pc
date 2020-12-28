import Layout from '@/layout'
export default [
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
        component: () => import(/*webpackChunkName:'CourseList'*/ '@/views/course/CourseList'),
        meta: { title: '课程列表' },
      },
      {
        path: 'add',
        name: 'CourseAdd',
        component: () => import(/*webpackChunkName:'CourseAdd'*/ '@/views/course/CourseAdd'),
        meta: { title: '添加课程' },
      },
      {
        path: 'edit/:id',
        name: 'CourseEdit',
        component: () => import(/*webpackChunkName:'CourseEdit'*/ '@/views/course/CourseAdd'),
        meta: { title: '编辑课程' },
        hidden: true,
      },
      {
        path: 'chapter/:id',
        name: 'Chapter',
        component: () => import(/*webpackChunkName:'Chapter'*/ '@/views/course/Chapter'),
        meta: { title: '章节管理' },
        hidden: true,
      },
    ],
  },
]
