import config from './config/oss'
import axios from '@/utils/request'
export const upload = params => axios.post(config.upload, params) // 上传图片
