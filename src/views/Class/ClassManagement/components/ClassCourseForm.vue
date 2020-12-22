<!--
 * @Description: 班级-班级管理-添加班级-添加课程
 * @Author: xiawenlong
 * @Date: 2020-12-19 16:03:14
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 22:11:31
-->
<template>
  <form-wrapper class="class-course-form">
    <el-transfer
      v-model="selectCourseIds"
      :data="courseList"
      :props="{ key: 'courseId', label: 'courseName' }"
      :titles="['全部课程', '班级课程']"
      :filterable="true"
      filter-placeholder="请输入课程名称"
    ></el-transfer>
    <template slot="footer">
      <el-button @click="sumitToPrev">上一步，添加学员</el-button>
      <el-button type="primary" @click="sumitToNext">完成</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import { getClassCourseList, getExcludedCourseList, saveClassCourse } from '@/api/class'
import { mapGetters } from 'vuex'
import FormWrapper from '@/components/FormWrapper'
export default {
  components: {
    FormWrapper,
  },
  props: {
    classId: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      selectCourseIds: [],
      courseList: [],
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.initCourseData()
  },
  methods: {
    // 初始化数据
    async initCourseData() {
      const { classId, organizationId, tenantId } = this
      const params = { organizationId, tenantId, classId }
      this.getClassCourse(params)
      this.getExcludedCourse(params)
    },
    // 获取班级的课程
    async getClassCourse(params) {
      try {
        const { data } = await getClassCourseList(params)
        this.selectCourseIds = data.map(course => course.courseId)
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
    // 获取班级没有的课程
    async getExcludedCourse(params) {
      try {
        const { data } = await getExcludedCourseList(params)
        this.courseList = data
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
    sumitToPrev() {
      this.$emit('stateChange', { activeState: 1 })
    },
    async sumitToNext() {
      const { classId, courseList, selectCourseIds, organizationId, tenantId } = this
      const courses = courseList.filter(course => selectCourseIds.includes(course.courseId))
      try {
        await saveClassCourse({ organizationId, tenantId, classId, courses })
        this.$emit('stateChange', { classId: '', activeState: 0 })
        this.$router.push('/class/list')
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.class-course-form {
  .el-transfer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ::v-deep .el-transfer-panel {
      width: 400px;
      min-height: 450px;
      .el-input {
        width: 370px;
      }
    }
  }
}
</style>
