/*
 * @Description: 班级 相关接口
 * @Author: xiawenlong
 * @Date: 2020-12-19 09:21:50
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 15:59:06
 */
export default {
  // 班级列表
  classList: '/course/admin/classes/list',
  // 创建班级
  classCreate: '/course/admin/class/create',
  // 添加学员
  classDeptStudentsUpdate: '/course/admin/class-dept/students/update',
  // 添加学员-根据部门查询学员
  classDeptStudents: '/course/admin/class-dept/students',
  // 添加课程
  classCourseSave: '/course/admin/class-course/save',
  // 添加课程-获取班级课程列表
  classCourseList: '/course/admin/class-course/list',
  // 添加课程-获取班级没有的课程列表
  classCourseExcluded: '/course/admin/org/class/courses/excluded',
  // 班级详情
  classInfo: '/course/admin/class',
  // 修改班级
  classUpdate: '/course/admin/class/update',
  // 删除班级
  classDelete: '/course/admin/class/delete',
  // 班级学员管理 - 班级下拉列表
  classSelect: '/course/admin/classes/select',
  // 班级学员管理 - 学员列表
  classStudentList: '/course/admin/class-student/manage/list',
}
