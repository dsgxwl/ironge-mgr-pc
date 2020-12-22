/*
 * @Description:【班级】模块 接口管理
 * @Author: xiawenlong
 * @Date: 2020-12-19 09:21:50
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-22 11:42:22
 */
export default {
  getClassList: '/course/admin/classes/list', // 班级列表
  createClass: '/course/admin/class/create', // 创建班级
  queryTeacher: '/course/admin/teacher/query', // 教师列表
  getDeptsTree: '/course/admin/depts/tree', // 部门树形结构
  getStudentsByDept: '/course/admin/class-dept/students', // 根据部门查询学员
  updateStudents: '/course/admin/class-dept/students/update', // 添加学员
  getClassCourseList: '/course/admin/class-course/list', // 获取班级课程列表
  getExcludedCourseList: '/course/admin/org/class/courses/excluded', // 获取班级没有的课程列表
  saveClassCourse: '/course/admin/class-course/save', // 获取班级没有的课程列表
  getClassInfo: '/course/admin/class', // 获取班级详情
  updateClass: '/course/admin/class/update', // 更新班级基本信息
  deleteClass: '/course/admin/class/delete', // 删除班级

  createCourse: '/course/admin/course/create', // 创建课程
  updateCourse: '/course/admin/course/update', // 更新课程基本信息
  getCourseInfo: '/course/admin/course', // 获取课程详情
  getCourseList: '/course/admin/courses/list', // 课程列表
  deleteCourse: '/course/admin/course/delete', // 删除课程
}
