<!--
 * @Description: 班级学员管理
 * @Author: xiawenlong
 * @Date: 2020-12-28 09:39:34
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:26:28
-->
<template>
  <table-list
    :loading="loading"
    :search-form="searchForm(this)"
    :columns="columns"
    :data="studentList"
    :pager="pager"
    @search="onSearch"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></table-list>
</template>
<script>
const searchForm = _this => [
  {
    label: '班级',
    prop: 'classId',
    type: 'select',
    children: _this.classList,
  },
  {
    label: '学员姓名',
    prop: 'studentName',
  },
  {
    label: '手机号',
    prop: 'mobile',
  },
  {
    label: '身份证号',
    prop: 'cardNo',
  },
]
const columns = [
  {
    label: '学员姓名',
    prop: 'studentName',
  },
  {
    label: '学院号码',
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
]
import TableList from '@/components/TableList'
import { classSelect, classStudentList } from '@/api/class'
import { mapGetters } from 'vuex'
import to from 'await-to'
export default {
  name: 'ClassStudent',
  components: { TableList },
  data() {
    return {
      searchForm,
      columns,
      loading: false,
      classList: [],
      studentList: [],
      pager: {
        total: 0,
        current: 1,
        size: 10,
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.getClassList()
    this.getStudentList()
  },
  methods: {
    async getClassList() {
      const { tenantId, organizationId } = this
      const [res, err] = await to(classSelect({ tenantId, organizationId }))
      if (err) return this.$message.warning(err.msg)
      this.classList = res.data.map(item => ({ label: item.className, value: item.classId }))
    },
    async getStudentList(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const [res, err] = await to(classStudentList({ ...queryParams, ...this.pager }))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.studentList = res.data.list
      this.pager.total = res.data.total
    },
    onSearch(params) {
      this.pager.current = 1
      this.getStudentList(params)
    },
    handleSizeChange(size) {
      this.pager.size = size
      this.getStudentList()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getStudentList()
    },
  },
}
</script>
