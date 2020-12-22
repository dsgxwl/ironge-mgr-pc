<!--
 * @Description: 班级-课程管理-课程列表
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:54:33
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 22:29:45
-->
<template>
  <div class="course-list">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :data="courseList"
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
import { getCourseList, deleteCourse } from '@/api/class'
import TableList from '@/components/TableList'
export default {
  name: 'CourseList',
  components: {
    TableList,
  },
  data() {
    return {
      loading: false,
      searchForm: [
        {
          label: '课程名称',
          prop: 'keyword',
        },
      ],
      courseList: [],
      columns: [
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
      ],
      operates: [
        {
          label: '编辑',
          method: this.handleEdit,
        },
        {
          label: '章节管理',
          method: this.handleEdit,
          type: 'default',
        },
        {
          label: '新章节管理',
          method: this.handleEdit,
          type: 'default',
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
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.getCourseListData()
  },
  methods: {
    async getCourseListData(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      try {
        const { tenantId, organizationId } = this
        let params = { ...queryParams, ...this.pager, tenantId, organizationId }
        const { data } = await getCourseList(params)
        this.courseList = data.list
        this.pager.total = data.total
      } catch (error) {
        this.$message.warning(error.msg)
      }
      this.loading = false
    },
    // 查询按钮
    onSearch(queryParams) {
      this.getCourseListData(queryParams)
    },
    // 编辑
    handleEdit(row) {
      this.$router.push(`/course/edit/${row.courseId}`)
    },
    // 删除
    async handleDelete(row) {
      try {
        await this.$confirm(`确定删除课程【${row.courseName}】?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        const { courseId, tenantId, organizationId } = row
        await deleteCourse({ courseId, tenantId, organizationId })
        this.$message.success('删除成功')
        this.getCourseListData()
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
    // 分页
    handleSizeChange(size) {
      this.pager.current = 1
      this.pager.size = size
      this.getCourseListData()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getCourseListData()
    },
  },
}
</script>
