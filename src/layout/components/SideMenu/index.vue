<!--
 * @Description: 侧边菜单导航
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:18:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 09:52:22
-->
<template>
  <div class="menu">
    <el-scrollbar>
      <el-menu
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        background-color="#2b364d"
        text-color="#829cbd"
        active-text-color="#ffffff"
        mode="vertical"
        :collapse-transition="false"
        :collapse="opened"
      >
        <side-collapse></side-collapse>
        <div v-for="item in routes" :key="item.path">
          <side-menu-item
            v-if="item.type === menuType"
            :item="item"
            :base-path="item.path"
          ></side-menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SideMenuItem from './SideMenuItem'
import SideCollapse from '../SideCollapse'
import { mapGetters } from 'vuex'
export default {
  components: { SideMenuItem, SideCollapse },
  data() {
    return {
      routes: this.$router.options.routes,
    }
  },
  computed: {
    ...mapGetters(['opened', 'menuType']),
    activeMenu() {
      return this.$route.path
    },
  },
}
</script>
