/*
 * @Description:
 * @Author: xiawenlong
 * @Date: 2020-12-24 11:43:35
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-24 11:46:39
 */
import Layout from '@/layout'
export default [
  {
    path: '/video',
    component: Layout,
    name: 'Video',
    type: 'class',
    meta: { title: '视频管理', icon: 'el-icon-video-camera' },
    redirect: '/video/list',
    children: [
      {
        path: 'list',
        name: 'VideoList',
        component: () => import(/*webpackChunkName:'VideoList'*/ '@/views/video/VideoList.vue'),
        meta: { title: '视频列表' },
      },
      {
        path: 'add',
        name: 'VideoAdd',
        component: () => import(/*webpackChunkName:'VideoAdd'*/ '@/views/video/VideoAdd.vue'),
        meta: { title: '添加视频' },
      },
    ],
  },
]
