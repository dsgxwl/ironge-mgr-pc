/*
 * @Description: 验证方法
 * @Author: xiawenlong
 * @Date: 2020-12-16 21:56:37
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 17:35:39
 */
/**
 * @description: 验证地址是否为绝对地址
 * @param {String} path
 * @return {Boolean}
 */
export function isAbsolutePath(path) {
  return /^(https?|tel|mailto)/.test(path)
}
/**
 * @description: 验证手机号是否正确
 * @param {String} mobile
 * @return {Boolean}
 */
export function isMobile(mobile) {
  return /^1[3456789]\d{9}$/.test(mobile)
}
/**
 * @description: 验证身份证号是否正确
 * @param {String} mobile
 * @return {Boolean}
 */
export function isIDcard(IDcard) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDcard)
}
/**
 * @description: 验证日期 [输入框]
 */
export function validateInputDate(rule, value, callback) {
  if (!value || value.length == 0 || value == null || value == undefined) {
    return callback('日期不能为空')
  }
  if (Array.isArray(value)) {
    //格式为：daterange、datetimerange检测
    value.map(function(item) {
      if (item === '') {
        return callback('日期不能为空')
      }
    })
  } else {
    //格式为：date、datetime、year、month 检测
    if (value === '') {
      return callback('日期不能为空')
    }
  }
  return callback()
}
/**
 * @description: 验证手机号 [输入框]
 */
export function validateInputMobile(rule, value, callback) {
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return callback('请填写正确手机号')
  }
  return callback()
}
