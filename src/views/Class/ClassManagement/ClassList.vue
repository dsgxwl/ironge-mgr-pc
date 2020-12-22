<!--
 * @Description: 班级-班级管理-班级列表
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:31:10
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-22 15:16:14
-->
<template>
  <div class="class-list">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :data="classList"
      :columns="columns"
      :operates="operates"
      :pager="pager"
      @search="onSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></table-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getClassList, deleteClass } from '@/api/class'
import TableList from '@/components/TableList'
export default {
  name: 'ClassList',
  components: {
    TableList,
  },
  data() {
    return {
      loading: false,
      searchForm: [
        {
          label: '班级名称',
          prop: 'keyword',
        },
      ],
      columns: [
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
            this.$router.push('/')
          },
        },
      ],
      operates: [
        {
          label: '编辑',
          method: this.handleEdit,
        },
        {
          label: '删除',
          method: this.handleDelete,
        },
      ],
      pager: {
        total: 0,
        size: 10,
        current: 1,
      },
      classList: [],
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
      try {
        const { tenantId, organizationId } = this
        let params = { ...queryParams, ...this.pager, tenantId, organizationId }
        const { data } = await getClassList(params)
        this.classList = data.list
        this.pager.total = data.total
      } catch (error) {
        this.$message.warning(error.msg)
      }
      this.loading = false
    },
    // 查询按钮
    onSearch(queryParams) {
      this.getClassListData(queryParams)
    },
    // 重置搜索条件
    resetSearchForm() {
      this.$refs['classSearchForm'].resetFields()
    },
    // 编辑
    handleEdit(row) {
      this.$router.push(`/class/edit/${row.classId}`)
    },
    // 删除
    async handleDelete(row) {
      try {
        await this.$confirm(`确定删除班级【${row.className}】?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        const { classId, tenantId, organizationId } = row
        await deleteClass({ classId, tenantId, organizationId })
        this.$message.success('删除成功')
        this.getClassListData()
      } catch (error) {
        this.$message.warning(error.msg)
      }
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
