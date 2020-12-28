import config from './config/dept'
import axios from '@/utils/request'
export const deptsTree = params => axios.post(config.deptsTree, params) // 部门树结构
export const deptsSelect = params => axios.post(config.deptsSelect, params) // 部门下拉列表
