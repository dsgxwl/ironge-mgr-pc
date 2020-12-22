<!--
 * @Description: 全屏
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:19:20
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 09:51:30
-->
<template>
  <div v-if="isEnabled" class="full-screen">
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  computed: {
    isEnabled() {
      return screenfull.isEnabled
    },
  },
  methods: {
    toggleFull() {
      screenfull.toggle()
    },
  },
}
</script>
