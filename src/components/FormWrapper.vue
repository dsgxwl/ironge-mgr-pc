<!--
 * @Description: 通用表单外层样式，按钮底部固定
 * @Author: xiawenlong
 * @Date: 2020-12-21 22:01:56
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 16:30:39
-->
<template>
  <div class="form-wrapper">
    <slot></slot>
    <div class="btnBar">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form-wrapper {
  padding: 30px 0 80px;
  ::v-deep .el-form {
    width: 90%;
    .tip {
      color: #909399;
      font-size: 14px;
      padding-left: 20px;
    }
    .el-input__inner {
      text-align: left;
    }
  }
  .btnBar {
    z-index: 100;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: #fff;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 35px;
    box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    margin-bottom: 0;
  }
}
</style>
