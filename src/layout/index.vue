<template>
  <div class="wrapper" :class="{ closeBar: opened }">
    <m-header></m-header>
    <div class="wrapper_main">
      <side-menu></side-menu>
      <div class="main-container">
        <tags-view></tags-view>
        <bread-crumb></bread-crumb>
        <page-main></page-main>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu'
import MHeader from './components/Header'
import PageMain from './components/PageMain'
import TagsView from './components/TagsView'
import BreadCrumb from './components/BreadCrumb'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    SideMenu,
    MHeader,
    PageMain,
    TagsView,
    BreadCrumb,
  },
  computed: {
    ...mapGetters(['opened']),
  },
}
</script>
