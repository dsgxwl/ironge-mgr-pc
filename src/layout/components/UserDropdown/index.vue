<!--
 * @Description: 用户右上角信息下拉菜单
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:19:20
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 10:58:39
-->
<template>
  <div class="user-dropdown">
    <el-dropdown>
      <div class="user-info">
        <span class="name">
          {{ userInfo.userName || userInfo.nickName }}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <img :src="userInfo.headPic" :onerror="defaultAvatar" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <a @click="logout"><i class="el-icon-switch-button"></i>退出登录</a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import * as type from '@/store/action-types'
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  data() {
    return {
      defaultAvatar: `this.src="${require('./avatar.png')}"`,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapActions([type.LOGOUT]),
    logout() {
      this[type.LOGOUT]()
    },
  },
}
</script>
