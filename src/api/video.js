import config from './config/video'
import axios from '@/utils/request'
export const videoAdd = params => axios.post(config.videoAdd, params) // 新增视频
export const videoList = params => axios.post(config.videoList, params) // 视频列表

export const videoPolyvImport = params => axios.post(config.videoPolyvImport, params) // 保利视频导入
export const videoAliImport = params => axios.post(config.videoAliImport, params) // 阿里视频导入
export const aliLocalFileUpload = params => axios.post(config.aliLocalFileUpload, params) // 添加 - 阿里本地视频上传
export const aliNetworkFileUpload = params => axios.post(config.aliNetworkFileUpload, params) // 添加 - 阿里本地视频上传
