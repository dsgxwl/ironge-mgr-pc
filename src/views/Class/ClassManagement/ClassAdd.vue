<!--
 * @Description: 班级-班级管理-添加班级
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:43:32
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-22 09:27:01
-->
<template>
  <div class="class-add">
    <el-steps :active="activeState" finish-status="success" simple>
      <el-step title="班级基本信息"></el-step>
      <el-step title="添加学员"></el-step>
      <el-step title="添加课程"></el-step>
    </el-steps>
    <component
      :is="formComponents[activeState]"
      :class-id="classId"
      @stateChange="onStateChange"
    ></component>
  </div>
</template>
<script>
import ClassBaseInfoForm from './components/ClassBaseInfoForm'
import ClassStudentForm from './components/ClassStudentForm'
import ClassCourseForm from './components/ClassCourseForm'
export default {
  name: 'ClassAdd',
  components: {
    ClassBaseInfoForm,
    ClassStudentForm,
    ClassCourseForm,
  },
  data() {
    return {
      activeState: 0,
      classId: '',
      formComponents: [ClassBaseInfoForm, ClassStudentForm, ClassCourseForm],
    }
  },
  created() {
    this.classId = this.$route.params.id
  },
  methods: {
    onStateChange({ activeState, classId }) {
      this.activeState = activeState
      if (classId !== undefined) this.classId = classId
    },
  },
}
</script>
<style lang="scss" scoped>
.class-add {
  position: relative;
  padding: 15px;
  padding-bottom: 90px;
  .el-steps {
    margin-top: 0 !important;
    margin-bottom: 20px;
  }
}
</style>
