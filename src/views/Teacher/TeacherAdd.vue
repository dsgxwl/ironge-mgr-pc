<!--
 * @Description: 添加讲师
 * @Author: xiawenlong
 * @Date: 2020-12-18 17:31:41
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 09:02:05
-->
<template>
  <form-wrapper class="teacher-add">
    <el-form
      ref="teacherForm"
      class="teacher-form"
      :model="teacherForm"
      :rules="teacherFormRules"
      label-width="120px"
    >
      <el-form-item label="讲师名称" prop="teacherName">
        <el-input v-model="teacherForm.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="teacherForm.sort" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="讲师图片" prop="pic">
        <upload-image v-model="teacherForm.pic"></upload-image>
      </el-form-item>
      <el-form-item label="讲师介绍" prop="introduction">
        <el-input v-model="teacherForm.introduction" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitAddTeacher">提交</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import FormWrapper from '@/components/FormWrapper'
import UploadImage from '@/components/UploadImage'
// import { addTeacher } from '@/api/teacher'
export default {
  name: 'TeacherAdd',
  components: {
    FormWrapper,
    UploadImage,
  },
  data() {
    return {
      teacherForm: {
        name: '',
        sort: '',
        pic: '',
        introduction: '',
      },
      teacherFormRules: {
        teacherName: [{ required: true, message: '请输入讲师名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitAddTeacher() {
      this.$refs['teacherForm'].validate(value => {
        if (!value) return false
        console.log(this.teacherForm)
      })
    },
  },
}
</script>
