<template>
  <div class="side-collapse">
    <i :class="{ 'el-icon-s-unfold': opened, 'el-icon-s-fold': !opened }" @click="toggleOpen()"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import * as type from '@/store/action-types'
export default {
  methods: {
    ...mapMutations([type.SET_SIDE_OPENED]),
    toggleOpen() {
      this[type.SET_SIDE_OPENED](!this.opened)
    },
  },
  computed: {
    ...mapGetters(['opened']),
  },
}
</script>
<style lang="scss" scoped>
.side-collapse i {
  font-size: 18px;
  color: #363f44;
  cursor: pointer;
}
</style>
