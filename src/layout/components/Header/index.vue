<template>
  <div class="header">
    <div class="header-logo">
      <router-link to="/" class="logoLink"
        ><img src="../../../assets/common/logo.png" alt=""
      /></router-link>
    </div>
    <div class="header-main">
      <div class="tools_l">
        <top-menu></top-menu>
      </div>
      <div class="tools_r">
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
export default {
  components: {
    UserDropdown,
    FullScreen,
    TopMenu,
  },
}
</script>
