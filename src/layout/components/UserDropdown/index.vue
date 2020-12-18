<template>
  <div class="user-dropdown">
    <el-dropdown>
      <div class="user-info">
        <span class="name">admin<i class="el-icon-caret-bottom"></i></span>
        <img src="./avatar.png" alt="user" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/"><i class="el-icon-s-home"></i>首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <router-link to="/"><i class="el-icon-s-custom"></i>我的主页</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <a @click="loginOut"><i class="el-icon-switch-button"></i>登出</a>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userName: 'admin',
    }
  },
  computed: {
    // ...mapGetters(['userName']),
  },
  methods: {
    loginOut() {
      this.$store.dispatch('user/loginOut')
    },
  },
}
</script>
