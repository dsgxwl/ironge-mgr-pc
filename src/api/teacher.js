import config from './config/teacher'
import axios from '@/utils/request'
export const teacherAdd = params => axios.post(config.teacherAdd, params) // 新增视频
export const teacherQuery = params => axios.post(config.teacherQuery, params) // 新增视频
