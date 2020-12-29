<!--
 * @Description: 班级-班级管理-添加班级-添加课程
 * @Author: xiawenlong
 * @Date: 2020-12-19 16:03:14
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 16:00:12
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
import { classCourseList, classCourseExcluded, classCourseSave } from '@/api/class'
import { mapGetters } from 'vuex'
import FormWrapper from '@/components/FormWrapper'
import refreshToView from '@/mixins/refresh-to-view'
import to from 'await-to'
export default {
  name: 'ClassAddCourse',
  components: {
    FormWrapper,
  },
  mixins: [refreshToView],
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
      const [res, err] = await to(classCourseList(params))
      if (err) return this.$message.warning(err.msg)
      this.selectCourseIds = res.data.map(course => course.courseId)
    },
    // 获取班级没有的课程
    async getExcludedCourse(params) {
      const [res, err] = await to(classCourseExcluded(params))
      if (err) return this.$message.warning(err.msg)
      this.courseList = res.data
    },
    sumitToPrev() {
      this.$emit('stateChange', { activeState: 1 })
    },
    async sumitToNext() {
      const { classId, courseList, selectCourseIds, organizationId, tenantId } = this
      const courses = courseList.filter(course => selectCourseIds.includes(course.courseId))
      const [, err] = await to(classCourseSave({ organizationId, tenantId, classId, courses }))
      if (err) return this.$message.warning(err.msg)
      this.$emit('stateChange', { classId: this.classId || '', activeState: 0 })
      this.$message.success('保存成功')
      this.refreshToView('/class/list')
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
