import config from './config/class'
import axios from '@/utils/request'
export const getClassList = params => axios.post(config.getClassList, params) // 获取班级列表
export const createClass = params => axios.post(config.createClass, params) // 添加班级-查询老师
export const queryTeacher = params => axios.post(config.queryTeacher, params) // 添加班级-查询老师
export const getDeptsTree = params => axios.post(config.getDeptsTree, params) // 添加班级-部门树结构
export const getStudentsByDept = params => axios.post(config.getStudentsByDept, params) // 添加班级-通过部门查学员
export const updateStudents = params => axios.post(config.updateStudents, params) // 添加班级-添加学员
export const getClassCourseList = params => axios.post(config.getClassCourseList, params) // 添加班级-获取班级课程列表
export const getExcludedCourseList = params => axios.post(config.getExcludedCourseList, params) // 添加班级-获取班级没有的课程列表
export const saveClassCourse = params => axios.post(config.saveClassCourse, params) // 添加班级-保存课程
export const getClassInfo = params => axios.post(config.getClassInfo, params) // 添加班级-保存课程
export const updateClass = params => axios.post(config.updateClass, params) // 编辑班级-基本信息
export const deleteClass = params => axios.post(config.deleteClass, params) // 删除班级

export const createCourse = params => axios.post(config.createCourse, params) // 创建课程
export const updateCourse = params => axios.post(config.updateCourse, params) // 编辑课程
export const getCourseInfo = params => axios.post(config.getCourseInfo, params) // 获取课程信息
export const getCourseList = params => axios.post(config.getCourseList, params) // 获取课程列表
export const deleteCourse = params => axios.post(config.deleteCourse, params) // 删除课程
