<!--
 * @Description: 切换学院
 * @Author: xiawenlong
 * @Date: 2020-12-21 09:43:31
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 17:55:28
-->
<template>
  <div class="college-select" :title="currentCollege.organizationName" @click="openCollegeDialog">
    <div class="organizationName">{{ currentCollege.organizationName || '请选择' }}</div>
    <i class="el-icon-d-caret"></i>
    <college-dialog
      ref="collegeDialog"
      :visible="collegeDialogVisible"
      @updateVisible="updateDialogVisible"
    ></college-dialog>
  </div>
</template>
<script>
import CollegeDialog from './CollegeDialog'
import { mapGetters } from 'vuex'
export default {
  components: {
    CollegeDialog,
  },
  data() {
    return {
      collegeDialogVisible: false,
    }
  },
  computed: {
    ...mapGetters(['currentCollege']),
  },
  created() {
    if (!this.currentCollege.organizationId) {
      this.openCollegeDialog()
      this.$nextTick(() => {
        this.$refs.collegeDialog.getCollegeData()
      })
    }
  },
  methods: {
    openCollegeDialog() {
      this.collegeDialogVisible = true
    },
    updateDialogVisible(val) {
      this.collegeDialogVisible = val
    },
  },
}
</script>
