<!--
 * @Description: 顶部菜单导航
 * @Author: xiawenlong
 * @Date: 2020-12-18 09:05:33
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 16:14:55
-->
<template>
  <scroll-pane ref="scrollPane" class="top-menu">
    <router-link
      v-for="item in topMenuList"
      ref="menu"
      :key="item.path"
      :type="item.type"
      :name="item.path"
      :class="isActive(item) ? 'active' : ''"
      :to="item.path"
    >
      <!-- @click.middle.native="handleTopMenuClick" -->
      <span><i :class="item.icon"></i> {{ item.label }}</span>
    </router-link>
  </scroll-pane>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import * as type from '@/store/action-types'
import ScrollPane from '../ScrollPane'
import menu from './menu'
let menuType = ''
export default {
  components: {
    ScrollPane,
  },
  data() {
    return {
      topMenuList: menu,
      activeMenuType: '',
    }
  },
  computed: {
    ...mapState(['menuType']),
  },
  watch: {
    // 监听路由变化重新设置type
    $route: function() {
      this.fetchTopMenuData()
      this.moveToCurrentMenu()
    },
  },
  created() {
    this.fetchTopMenuData()
  },
  methods: {
    ...mapMutations([type.SET_MENU_TYPE]),
    isActive(route) {
      return route.type === this.menuType
    },
    // handleTopMenuClick(tab) {
    //   console.log(tab)
    // },
    moveToCurrentMenu() {
      const menus = this.$refs.menu
      this.$nextTick(() => {
        for (const menu of menus) {
          if (menu.$attrs.type === this.menuType) {
            this.$refs.scrollPane.moveToTarget(menu, menus)
            break
          }
        }
      })
    },
    // 初始化菜单激活项，设置type
    fetchTopMenuData(routes = this.$router.options.routes) {
      let currentRouteName = this.$route.name
      menuType = ''
      for (var i = 0; i < routes.length; i++) {
        let children = routes[i].children
        if (children) {
          if (menuType) break
          this.reSetMenuType(currentRouteName, routes[i], children)
        }
      }
      // if (menuType == 'system') {
      //   this.activeMenuPath = '/'
      // } else {
      //   this.activeMenuPath = '/' + menuType
      // }
      this[type.SET_MENU_TYPE](menuType)
    },
    // 递归获取当前路由的type
    reSetMenuType(currentRouteName, parent, children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].name === currentRouteName) {
          menuType = parent.type
          break
        }
        if (children[i].children) {
          this.reSetMenuType(currentRouteName, parent.type, children[i].children)
        }
      }
    },
  },
}
</script>
