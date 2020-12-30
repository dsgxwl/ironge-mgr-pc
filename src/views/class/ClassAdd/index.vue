<!--
 * @Description: 班级-班级管理-添加班级
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:43:32
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 16:30:57
-->
<template>
  <div class="class-add">
    <el-steps :active="activeState" finish-status="success" simple>
      <el-step v-for="(step, index) in steps" :key="index" :title="step.title"></el-step>
    </el-steps>
    <component
      :is="steps[activeState].component"
      :class-id="classId"
      @stateChange="onStateChange"
    ></component>
  </div>
</template>
<script>
import ClassAddInfo from './components/ClassAddInfo'
import ClassAddStudent from './components/ClassAddStudent'
import ClassAddCourse from './components/ClassAddCourse'
export default {
  name: 'ClassAdd',
  components: {
    ClassAddInfo,
    ClassAddStudent,
    ClassAddCourse,
  },
  data() {
    return {
      activeState: 0,
      classId: '',
      steps: [
        {
          title: '班级基本信息',
          component: ClassAddInfo,
        },
        {
          title: '添加学员',
          component: ClassAddStudent,
        },
        {
          title: '添加课程',
          component: ClassAddCourse,
        },
      ],
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
  padding: 15px;
  .el-steps {
    margin: 0 0 20px 0 !important;
  }
}
</style>
