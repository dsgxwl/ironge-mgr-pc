import config from './config/login'
import axios from '@/utils/request'
export const login = params => axios.post(config.login, params) // 登录
