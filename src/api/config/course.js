/*
 * @Description: 课程相关接口
 * @Author: xiawenlong
 * @Date: 2020-12-22 17:09:32
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 15:39:30
 */
export default {
  // 课程详情
  courseInfo: '/course/admin/course',
  // 创建课程
  courseCreate: '/course/admin/course/create',
  // 修改课程
  courseUpdate: '/course/admin/course/update',
  // 课程列表
  courseList: '/course/admin/courses/list',
  // 删除课程
  courseDelete: '/course/admin/course/delete',
  // 章节管理 - 章节查询
  chapterQuery: '/course/identify/chapter/section/query',
  // 章节管理 - 绑定视频
  bindVideo: '/course/identify/section/bind/video',
  // 章节管理 - 新增章节
  chapterAdd: '/course/identify/chapter/add',
  // 章节管理 - 编辑章节
  chapterUpdate: '/course/identify/chapter/update',
  // 章节管理 - 删除章节
  chapterDelete: '/course/identify/chapter/delete',
  // 章节管理 - 新增节点
  sectionAdd: '/course/identify/section/add',
  // 章节管理 - 编辑节点
  sectionUpdate: '/course/identify/section/update',
  // 章节管理 - 删除节点
  sectionDelete: '/course/identify/section/delete',
}
