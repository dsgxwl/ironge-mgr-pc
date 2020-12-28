import config from './config/class'
import axios from '@/utils/request'
export const classList = params => axios.post(config.classList, params) // 班级列表
export const classCreate = params => axios.post(config.classCreate, params) // 创建班级
export const classInfo = params => axios.post(config.classInfo, params) // 班级详情
export const classUpdate = params => axios.post(config.classUpdate, params) // 编辑班级
export const classDelete = params => axios.post(config.classDelete, params) // 删除班级

export const classDeptStudentsUpdate = params => axios.post(config.classDeptStudentsUpdate, params) // 添加学员
export const classDeptStudents = params => axios.post(config.classDeptStudents, params) // 添加学员-通过部门查学员
export const classCourseSave = params => axios.post(config.classCourseSave, params) // 添加课程
export const classCourseList = params => axios.post(config.classCourseList, params) // 添加课程-获取班级课程列表
export const classCourseExcluded = params => axios.post(config.classCourseExcluded, params) // 添加课程-获取班级没有的课程列表

export const classSelect = params => axios.post(config.classSelect, params) // 班级学员管理-班级下拉列表
export const classStudentList = params => axios.post(config.classStudentList, params) // 班级学员管理-学员列表
