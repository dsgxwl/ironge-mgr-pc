/*
 * @Description: 处理Promise返回中间件
 * @Author: xiawenlong
 * @Date: 2020-12-28 16:37:02
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 15:50:22
 */
const to = function(promise) {
  return promise
    .then(res => [res, null])
    .catch(err => {
      if (!err.msg) err.msg = err
      return [null, err]
    })
}
export default to
