<!--
 * @Description: 切换学院弹窗
 * @Author: xiawenlong
 * @Date: 2020-12-21 10:13:17
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:30:50
-->
<template>
  <el-dialog
    custom-class="college-dialog"
    :close-on-click-modal="false"
    append-to-body
    :title="(currentCollege.organizationId ? '切换' : '选择') + '学院'"
    :visible.sync="collegeDialogVisible"
    width="450px"
    :show-close="false"
    :close-on-press-escape="false"
  >
    <el-table
      ref="collegeTable"
      :data="collegeData"
      border
      highlight-current-row
      @current-change="handleCollegeRowClick"
    >
      <el-table-column property="organizationId" label="机构ID" width="80"></el-table-column>
      <el-table-column property="organizationName" label="学院"></el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pager.current"
      background
      :page-size="pager.size"
      layout="total, prev, pager, next"
      :total="pager.total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="currentCollege.organizationId" @click="collegeDialogVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="confirmChangeCollege">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getAllCollegeList, changeCollege } from '@/api/identify'
import * as type from '@/store/action-types'
import { createNamespacedHelpers, mapGetters } from 'vuex'
const { mapMutations } = createNamespacedHelpers('user')
import to from 'await-to'
export default {
  data() {
    return {
      collegeDialogVisible: false,
      collegeData: [],
      pager: {
        total: 0,
        current: 1,
        size: 5,
      },
      selectedCollege: null,
    }
  },
  computed: {
    ...mapGetters(['currentCollege', 'organizationId']),
  },
  created() {
    !this.currentCollege.organizationId && this.open()
  },
  methods: {
    ...mapMutations([type.SET_COLLEGE]),
    open() {
      this.collegeDialogVisible = true
      this.pager = { total: 0, current: 1, size: 5 }
      this.getCollegeData()
    },
    // 获取所有学院
    async getCollegeData() {
      const [res, err] = await to(getAllCollegeList(this.pager))
      if (err) return this.$message.warning(err.msg)
      this.collegeData = res.data.list
      this.pager.total = res.data.total
    },
    // 单击选择学院
    handleCollegeRowClick(row) {
      this.selectedCollege = row
    },
    // 确认切换学院
    async confirmChangeCollege() {
      const { organizationId, tenantId } = this.selectedCollege
      const [, err] = await to(changeCollege({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this[type.SET_COLLEGE](this.selectedCollege)
      window.location.reload()
    },
    // 分页
    handleCurrentChange(current) {
      this.pager.current = current
      this.getCollegeData()
    },
  },
}
</script>
<style lang="scss" scoped>
.college-dialog {
  .el-table {
    margin-bottom: 10px;
    ::v-deep .el-table__row {
      cursor: pointer;
      &.current-row {
        > td {
          background-color: $active-color;
          color: #fff;
        }
      }
    }
  }
  .el-pagination {
    text-align: center;
  }
  .dialog-footer {
    display: block;
    text-align: center;
  }
}
</style>
