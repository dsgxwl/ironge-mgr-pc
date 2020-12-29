import config from './config/student'
import axios from '@/utils/request'
export const studentList = params => axios.post(config.studentList, params)
export const studentInfoUpdate = params => axios.post(config.studentInfoUpdate, params)
export const studentInfo = params => axios.post(config.studentInfo, params)
export const studentDelete = params => axios.post(config.studentDelete, params)
export const studentCreate = params => axios.post(config.studentCreate, params)
