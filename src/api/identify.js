import config from './config/identify'
import axios from '@/utils/request'
export const getAllCollegeList = params => axios.post(config.getAllCollegeList, params) // 学院列表
export const changeCollege = params => axios.post(config.changeCollege, params) // 切换学院
