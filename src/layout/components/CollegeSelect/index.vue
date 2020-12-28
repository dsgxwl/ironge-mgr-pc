<!--
 * @Description: 切换学院
 * @Author: xiawenlong
 * @Date: 2020-12-21 09:43:31
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-25 08:59:47
-->
<template>
  <div class="college-select" :title="currentCollege.organizationName" @click="openCollegeDialog">
    <div class="organizationName">{{ currentCollege.organizationName || '请选择' }}</div>
    <i class="el-icon-d-caret"></i>
    <college-dialog ref="collegeDialog"></college-dialog>
  </div>
</template>
<script>
import CollegeDialog from './CollegeDialog'
import { mapGetters } from 'vuex'
export default {
  components: {
    CollegeDialog,
  },
  computed: {
    ...mapGetters(['currentCollege']),
  },
  methods: {
    openCollegeDialog() {
      this.$refs.collegeDialog.open()
    },
  },
}
</script>
