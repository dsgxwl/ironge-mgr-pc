/*
 * @Description: 处理Promise返回中间件
 * @Author: xiawenlong
 * @Date: 2020-12-28 16:37:02
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 16:48:37
 */
const to = function(promise) {
  return promise.then(res => [res, null]).catch(err => [null, err])
}
export default to
