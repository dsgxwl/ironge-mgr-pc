<template>
  <div class="full-screen" v-if="isEnabled">
    <i class="el-icon-full-screen iconFont" @click="toggleFull"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    toggleFull() {
      screenfull.toggle()
    },
  },
  computed: {
    isEnabled() {
      return screenfull.isEnabled
    },
  },
}
</script>
