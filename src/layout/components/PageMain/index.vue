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
