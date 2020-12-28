/*
 * @Description: 视频相关接口
 * @Author: xiawenlong
 * @Date: 2020-12-24 11:57:22
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 16:02:05
 */
export default {
  // 新增视频
  videoAdd: '/course/admin/video/add',
  // 视频列表
  videoList: '/course/admin/video/query/page',
  // 视频导入 - 保利
  videoPolyvImport: '/course/admin/video/polyv/excel/import',
  // 视频导入 - 阿里
  videoAliImport: '/course/admin/video/ali/excel/import',
  // 添加视频 - 本地视频上传
  aliLocalFileUpload: '/third/api/aliUpload/aliLoaclFileUpload',
  // 添加视频 - 第三方视频上传
  aliNetworkFileUpload: '/third/api/aliUpload/ali-netWorkFileUpload',
}
