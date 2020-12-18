<template>
  <div class="top-menu">
    <el-tabs v-model="activeMenuPath" @tab-click="handleTopMenuClick">
      <el-tab-pane v-for="item in topMenuList" :key="item.path" :name="item.path">
        <span slot="label"><i :class="item.icon"></i> {{ item.label }}</span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import * as type from '@/store/action-types'
let menuType = ''
export default {
  data() {
    return {
      topMenuList: [
        {
          label: '系统',
          path: '/',
          icon: 'el-icon-setting',
        },
        {
          label: '班级',
          path: '/class',
          icon: 'el-icon-data-board',
        },
        {
          label: '讲师',
          path: '/teacher',
          icon: 'el-icon-s-custom',
        },
        {
          label: '学员',
          path: '/student',
          icon: 'el-icon-user',
        },
        {
          label: '订单',
          path: '/order',
          icon: 'el-icon-tickets',
        },
        {
          label: '资讯',
          path: '/info',
          icon: 'el-icon-news',
        },
        {
          label: '促销',
          path: '/sale',
          icon: 'el-icon-shopping-cart-full',
        },
        {
          label: '问答',
          path: '/qa',
          icon: 'el-icon-chat-line-square',
        },
        {
          label: '考试',
          path: '/exam',
          icon: 'el-icon-edit',
        },
        {
          label: '统计',
          path: '/statis',
          icon: 'el-icon-pie-chart',
        },
        {
          label: '审核',
          path: '/examine',
          icon: 'el-icon-s-check',
        },
        {
          label: '社区',
          path: '/community',
          icon: 'el-icon-office-building',
        },
      ],
      activeMenuPath: '/',
    }
  },
  created() {
    this.fetchTopMenuData()
  },
  methods: {
    ...mapMutations([type.SET_MENU_TYPE]),
    handleTopMenuClick(tab) {
      this.$router.push(tab.name)
    },
    // 初始化菜单激活项，设置type
    fetchTopMenuData(routes = this.$router.options.routes) {
      let currentRouteName = this.$route.name
      menuType = ''
      for (var i = 0; i < routes.length; i++) {
        let children = routes[i].children
        if (children) {
          if (menuType) break
          this.reSetMenuType(currentRouteName, routes[i].type, children)
        }
      }
      if (menuType == 'system') {
        this.activeMenuPath = '/'
      } else {
        this.activeMenuPath = '/' + menuType
      }
      this[type.SET_MENU_TYPE](menuType)
    },
    // 递归获取当前路由的type
    reSetMenuType(currentRouteName, currentMenuType, children) {
      for (let i = 0; i < children.length; i++) {
        if (children[i].name === currentRouteName) {
          menuType = currentMenuType
          break
        }
        if (children[i].children) {
          this.reSetMenuType(currentRouteName, currentMenuType, children[i].children)
        }
      }
    },
  },
  watch: {
    // 监听路由变化重新设置type
    $route: function() {
      this.fetchTopMenuData()
    },
  },
}
</script>
