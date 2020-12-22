<template>
  <div class="login">
    <div class="loginBox">
      <h2 class="loginH2">融e学运营平台</h2>
      <div class="loginCon">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
          <el-form-item prop="account">
            <el-input
              v-model="loginForm.account"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-button v-loading="loading" type="primary" class="loginBtn" @click="login">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import * as type from '@/store/action-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        password: '',
      },
      loginRules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    ...mapActions([type.LOGIN]),
    login() {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            await this[type.LOGIN](this.loginForm)
            // this.$router.push({ path: '/' })
            const redirect = this.$route.query.redirect
            this.$router.push(redirect ? redirect : '/')
          } catch (error) {
            this.$message.warning(error.msg)
          }
        } else {
          return false
        }
        this.loading = false
      })
    },
  },
}
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.loginBox {
  width: 500px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  margin-top: -250px;
}
.loginH2 {
  font-size: 30px;
  color: #fff;
  text-align: center;
  letter-spacing: 1px;
}
.loginCon {
  margin-top: 20px;
  background: #eee;
  border-radius: 4px;
  .titleDiv {
    padding: 0 28px;
    position: relative;
    height: 120px;
    border-radius: 4px;
    h3 {
      font-size: 22px;
      color: #555;
      font-weight: initial;
      padding-top: 23px;
    }
    p {
      font-size: 16px;
      color: #888;
      padding-top: 12px;
    }
    i {
      font-size: 65px;
      color: #ddd;
      position: absolute;
      right: 27px;
      top: 29px;
    }
  }
  .el-form {
    padding: 30px 25px 40px;
    background: #eee;
    border-radius: 4px;
    ::v-deep .el-input__inner {
      height: 50px;
    }
  }
}
.loginBtn {
  width: 100%;
}
</style>
