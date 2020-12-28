<!--
 * @Description: 班级-课程管理-课程列表
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:54:33
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 21:52:49
-->
<template>
  <div class="course-list">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :data="courseList"
      :columns="columns"
      :operates="operates(this)"
      :pager="pager"
      @search="onSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></table-list>
  </div>
</template>
<script>
const searchForm = [
  {
    label: '课程名称',
    prop: 'keyword',
  },
]
const columns = [
  {
    prop: 'courseName',
    label: '课程名称',
  },
  {
    prop: 'pic',
    label: '封面图片',
    render: (h, { row }) => {
      return [
        row.pic &&
          h('img', {
            src: row.pic,
            style: 'height: 50px',
          }),
      ]
    },
  },
]
const operates = _this => [
  {
    label: '编辑',
    method: _this.handleEdit,
  },
  {
    label: '章节管理',
    method: _this.handleChapter,
    type: 'warning',
  },
  {
    label: '删除',
    method: _this.handleDelete,
  },
]
import { mapGetters } from 'vuex'
import { courseList, courseDelete } from '@/api/course'
import TableList from '@/components/TableList'
import to from 'await-to'
export default {
  name: 'CourseList',
  components: {
    TableList,
  },
  data() {
    return {
      searchForm,
      columns,
      operates,
      loading: false,
      courseList: [],
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
    this.getCourseList()
  },
  methods: {
    async getCourseList(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const { tenantId, organizationId } = this
      let params = { ...queryParams, ...this.pager, tenantId, organizationId }
      const [res, err] = await to(courseList(params))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.courseList = res.data.list
      this.pager.total = res.data.total
    },
    // 查询按钮
    onSearch(queryParams) {
      this.pager.current = 1
      this.getCourseList(queryParams)
    },
    // 编辑
    handleEdit(row) {
      this.$router.push(`/course/edit/${row.courseId}`)
    },
    handleChapter(row) {
      this.$router.push(`/course/chapter/${row.courseId}`)
    },
    // 删除
    async handleDelete(row) {
      const tip = `确定删除课程【${row.courseName}】?`
      const [, cancel] = await to(this.$confirm(tip, '提示', { type: 'warning' }))
      if (cancel) return
      const { courseId, tenantId, organizationId } = row
      const [, err] = await to(courseDelete({ courseId, tenantId, organizationId }))
      if (err) return this.$message.warning(err.msg)
      this.$message.success('删除成功')
      this.getCourseList()
    },
    // 分页
    handleSizeChange(size) {
      this.pager.current = 1
      this.pager.size = size
      this.getCourseList()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getCourseList()
    },
  },
}
</script>
