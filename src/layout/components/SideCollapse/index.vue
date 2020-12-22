<!--
 * @Description: 侧边菜单收起展开
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:19:20
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 11:43:47
-->
<template>
  <div class="side-collapse">
    <i :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }" @click="toggleOpen()"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as type from '@/store/action-types'
export default {
  computed: {
    ...mapGetters(['opened']),
  },
  methods: {
    ...mapMutations([type.SET_SIDE_OPENED]),
    toggleOpen() {
      this[type.SET_SIDE_OPENED](!this.opened)
    },
  },
}
</script>
<style lang="scss" scoped>
.side-collapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
</style>
