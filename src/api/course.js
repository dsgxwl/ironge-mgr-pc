import config from './config/course'
import axios from '@/utils/request'
export const courseCreate = params => axios.post(config.courseCreate, params) // 创建课程
export const courseUpdate = params => axios.post(config.courseUpdate, params) // 编辑课程
export const courseInfo = params => axios.post(config.courseInfo, params) // 课程详情
export const courseList = params => axios.post(config.courseList, params) // 课程列表
export const courseDelete = params => axios.post(config.courseDelete, params) // 删除课程

export const chapterQuery = params => axios.post(config.chapterQuery, params) // 章节管理-章节查询
export const bindVideo = params => axios.post(config.bindVideo, params) // 章节管理-绑定视频

export const chapterAdd = params => axios.post(config.chapterAdd, params) // 章节管理-新增章节
export const chapterUpdate = params => axios.post(config.chapterUpdate, params) // 章节管理-编辑章节
export const chapterDelete = params => axios.post(config.chapterDelete, params) // 章节管理-删除章节

export const sectionAdd = params => axios.post(config.sectionAdd, params) // 章节管理-新增节点
export const sectionUpdate = params => axios.post(config.sectionUpdate, params) // 章节管理-编辑节点
export const sectionDelete = params => axios.post(config.sectionDelete, params) // 章节管理-删除节点
