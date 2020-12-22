<!--
 * @Description: 公共头部
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:18:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 10:59:30
-->
<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/" class="logoLink">
        <img src="../../../assets/common/logo.png" alt="" />
      </router-link>
    </div>
    <div class="header-main">
      <div class="tools_l">
        <top-menu></top-menu>
      </div>
      <div class="tools_r">
        <college-select></college-select>
        <full-screen></full-screen>
        <user-dropdown></user-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import UserDropdown from '../UserDropdown'
import FullScreen from '../FullScreen'
import TopMenu from '../TopMenu'
import CollegeSelect from '../CollegeSelect'
export default {
  components: {
    UserDropdown,
    FullScreen,
    TopMenu,
    CollegeSelect,
  },
}
</script>
