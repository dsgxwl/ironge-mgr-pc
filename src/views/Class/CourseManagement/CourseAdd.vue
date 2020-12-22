<!--
 * @Description: 班级-课程管理-添加课程
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:54:52
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 22:20:40
-->
<template>
  <form-wrapper class="course-add">
    <el-form
      ref="courseForm"
      class="course-form"
      :model="courseForm"
      :rules="courseRules"
      label-width="120px"
    >
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="courseForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="courseForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="introduction">
        <el-input v-model="courseForm.introduction" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="课程概要" prop="summary">
        <el-input v-model="courseForm.summary" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="封面图片" prop="pic">
        <upload-image v-model="courseForm.pic"></upload-image>
      </el-form-item>
      <el-form-item label="课程平台" prop="videoPlatform">
        <el-radio-group v-model="courseForm.videoPlatform">
          <el-radio :label="0">阿里云</el-radio>
          <el-radio :label="1">保利威视</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitAddCourse">提交</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import { createCourse, getCourseInfo, updateCourse } from '@/api/class'
import UploadImage from '@/components/UploadImage'
import FormWrapper from '@/components/FormWrapper'
import { mapGetters } from 'vuex'
export default {
  name: 'CourseAdd',
  components: {
    UploadImage,
    FormWrapper,
  },
  data() {
    return {
      courseId: '',
      courseForm: {
        courseName: '',
        sort: '',
        introduction: '',
        summary: '',
        pic: '',
        videoPlatform: 0,
      },
      courseRules: {
        courseName: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' },
        ],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
        summary: [{ required: true, message: '请输入课程概要', trigger: 'blur' }],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.courseId = this.$route.params.id
    if (this.courseId) this.getCourseInfoBack() // 回显课程信息
  },
  methods: {
    submitAddCourse() {
      this.$refs['courseForm'].validate(async valid => {
        if (valid) {
          try {
            const { courseId, courseForm, tenantId, organizationId } = this
            const params = { ...courseForm, tenantId, organizationId }
            let msg = ''
            if (courseId) {
              await updateCourse({ ...params, courseId }) // 修改
              msg = '修改成功'
            } else {
              await createCourse(params) // 新建
              msg = '添加成功'
            }
            this.$message.success(msg)
            this.$router.push('/course/list')
          } catch (error) {
            this.$message.warning(error.msg)
          }
        } else {
          return false
        }
      })
    },
    // 获取课程信息
    async getCourseInfoBack() {
      const { courseId, tenantId } = this
      try {
        const { data } = await getCourseInfo({ courseId, tenantId })
        if (data) this.courseForm = data
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.course-add {
  padding: 15px 0 90px;
  .course-form {
    width: 90%;
    .tip {
      color: #909399;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
</style>
