<!--
 * @Description: 班级-班级管理-班级列表
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:31:10
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 11:43:44
-->
<template>
  <div class="class-list">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :data="classList"
      :columns="columns(this)"
      :operates="operates(this)"
      :pager="pager"
      @search="onSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></table-list>
  </div>
</template>
<script>
// 搜索框配置
const searchForm = [
  {
    label: '班级名称',
    prop: 'keyword',
  },
]
// 表格列配置
const columns = _this => [
  {
    prop: 'className',
    label: '班级名称',
  },
  {
    prop: 'pic',
    label: '封面图片',
    render: (h, { row }) => {
      return [
        row.pic
          ? h('img', {
              domProps: { src: row.pic },
              style: 'height: 50px',
            })
          : null,
      ]
    },
  },
  {
    prop: 'principal',
    label: '班主任',
  },
  {
    prop: 'classBeginTime',
    label: '开班时间',
  },
  {
    prop: 'classEndTime',
    label: '结束时间',
  },
  {
    prop: 'studentTotal',
    label: '学员数(可点击)',
    click: () => {
      _this.$router.push('/class/student')
    },
  },
]
// 表格操作按钮配置
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
import { mapGetters } from 'vuex'
import { classList, classDelete } from '@/api/class'
import TableList from '@/components/TableList'
import to from 'await-to'
export default {
  name: 'ClassList',
  components: {
    TableList,
  },
  data() {
    return {
      searchForm,
      columns,
      operates,
      loading: false,
      classList: [],
      pager: {
        total: 0,
        size: 10,
        current: 1,
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.getClassListData()
  },
  methods: {
    async getClassListData(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const { tenantId, organizationId } = this
      const params = { ...queryParams, ...this.pager, tenantId, organizationId }
      const [res, err] = await to(classList(params))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.classList = res.data.list
      this.pager.total = res.data.total
    },
    // 查询按钮
    onSearch(queryParams) {
      this.pager.current = 1
      this.getClassListData(queryParams)
    },
    // 编辑
    handleEdit(row) {
      this.$router.push(`/class/edit/${row.classId}`)
    },
    // 删除
    async handleDelete(row) {
      const tip = `确定删除班级【${row.className}】?`
      const [, cancel] = await to(this.$confirm(tip, '提示', { type: 'warning' }))
      if (cancel) return
      const { classId, tenantId, organizationId } = row
      const [, err] = await to(classDelete({ classId, tenantId, organizationId }))
      if (err) return this.$message.warning(err.msg)
      this.$message.success('删除成功')
      this.getClassListData()
    },
    // 分页
    handleSizeChange(size) {
      this.pager.current = 1
      this.pager.size = size
      this.getClassListData()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getClassListData()
    },
  },
}
</script>
