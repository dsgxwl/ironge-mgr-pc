<!--
 * @Description: 404
 * @Author: xiawenlong
 * @Date: 2020-12-16 22:04:14
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 15:48:40
-->
<template>
  <div class="page-404">
    <img src="../../assets/common/404.gif" alt="404" />
    <div class="text">
      <h3>404</h3>
      <p>抱歉，你访问的页面不存在</p>
      <el-button type="primary" @click="toHome">回到首页</el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    toHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.page-404 {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 600px;
    margin-right: 100px;
  }
  .text {
    h3 {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }
    p {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
