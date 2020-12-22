<!--
 * @Description: 页面内容部分
 * @Author: xiawenlong
 * @Date: 2020-12-17 22:18:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 09:51:51
-->
<template>
  <div class="pageMain">
    <transition name="fade-page" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('tagsView')
export default {
  computed: {
    ...mapState(['cachedViews']),
    key() {
      return this.$route.path
    },
  },
}
</script>
