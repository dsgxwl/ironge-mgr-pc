<!--
 * @Description: 面包屑
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:19:20
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 14:31:50
-->
<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="item.path">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [],
    }
  },
  watch: {
    $route: {
      handler(route) {
        let allList = route.matched.filter(item => {
          if (item.meta && item.meta.title) {
            if (item.redirect) {
              item.path = ''
            }
            return true
          }
        })
        if (allList[0]?.path !== '/' && allList[0]?.path !== '/dashbord') {
          allList.unshift({ path: '/', meta: { title: '首页' } })
        }
        this.breadList = allList
      },
      immediate: true,
    },
  },
}
</script>
