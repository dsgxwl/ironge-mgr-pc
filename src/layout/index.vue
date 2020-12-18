<template>
  <div class="wrapper" :class="{ closeBar: opened }">
    <m-header></m-header>
    <div class="wrapper_main">
      <side-menu></side-menu>
      <div class="main-container">
        <tags-view></tags-view>
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
import { mapGetters } from 'vuex'
export default {
  name: 'layout',
  computed: {
    ...mapGetters(['opened']),
  },
  components: {
    SideMenu,
    MHeader,
    PageMain,
    TagsView,
  },
}
</script>
