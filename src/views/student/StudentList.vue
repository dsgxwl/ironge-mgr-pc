<!--
 * @Description: 学员列表
 * @Author: xiawenlong
 * @Date: 2020-12-25 18:19:13
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:29:24
-->
<template>
  <div class="student-list">
    <table-list
      :loading="loading"
      :columns="columns"
      :data="studentList"
      :search-form="searchForm"
      :operates="operates(this)"
      :pager="pager"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      @search="onSearch"
    ></table-list>
  </div>
</template>
<script>
const searchForm = [
  {
    label: '学员姓名',
    prop: 'keyword',
  },
]
const columns = [
  {
    label: '学员名称',
    prop: 'studentName',
  },
  {
    label: '学员号码',
    prop: 'mobile',
  },
  {
    label: '身份证/护照',
    prop: 'cardNo',
  },
  {
    label: '班级',
    prop: 'classInfo',
  },
  {
    label: '部门',
    prop: 'deptInfo',
  },
  {
    label: '注册时间',
    prop: 'registerTime',
  },
]
const operates = _this => [
  {
    label: '编辑',
    method: _this.handleEdit,
  },
  {
    label: '删除',
    method: _this.handleDelete,
    type: 'danger',
  },
]
import TableList from '@/components/TableList'
import { studentList, studentDelete } from '@/api/student'
import { mapGetters } from 'vuex'
import to from 'await-to'
export default {
  name: 'StudentList',
  components: { TableList },
  data() {
    return {
      searchForm,
      columns,
      operates,
      loading: false,
      studentList: [],
      pager: {
        total: 0,
        current: 1,
        size: 10,
      },
    }
  },
  computed: {
    ...mapGetters(['organizationId', 'tenantId']),
  },
  created() {
    this.getStudentList()
  },
  methods: {
    async getStudentList(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const { organizationId, tenantId } = this
      const [res, err] = await to(studentList({ ...queryParams, organizationId, tenantId }))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.studentList = res.data.list
      this.pager.total = res.data.total
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getStudentList()
    },
    handleSizeChange(size) {
      this.pager.size = size
      this.getStudentList()
    },
    handleEdit(row) {
      this.$router.push(`/student/edit/${row.studentId}`)
    },
    async handleDelete(row) {
      const tip = `确定删除学员【${row.studentName}】?`
      const [, cancel] = await to(this.$confirm(tip, '提示', { type: 'warning' }))
      if (cancel) return
      const { studentId, tenantId, organizationId } = row
      const [, err] = await to(studentDelete({ studentId, tenantId, organizationId }))
      if (err) return this.$message.warning(err.msg)
      this.$message.success('删除成功')
      this.getStudentList()
    },
    onSearch(params) {
      this.pager.current = 1
      this.getStudentList(params)
    },
  },
}
</script>
