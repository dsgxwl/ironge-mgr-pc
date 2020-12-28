<!--
 * @Description: 班级-班级管理-添加班级-班级基本信息
 * @Author: xiawenlong
 * @Date: 2020-12-19 11:59:09
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 17:44:44
-->
<template>
  <form-wrapper class="class-base-info-form">
    <el-form ref="classInfoForm" :model="classInfoForm" :rules="classInfoRules" label-width="120px">
      <el-form-item label="班级名称" prop="className">
        <el-input v-model="classInfoForm.className"></el-input>
      </el-form-item>
      <el-form-item label="班级开始时间" prop="classTime">
        <el-date-picker
          v-model="classInfoForm.classTime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <span class="tip">班级开班前和开班中都可购买班级，班级结束后将不允许购买班级</span>
      </el-form-item>
      <el-form-item label="任课老师" prop="principals">
        <el-select v-model="classInfoForm.principals" multiple placeholder="请选择">
          <el-option
            v-for="item in teacherList"
            :key="item.teacherId"
            :label="item.teacherName"
            :value="item.teacherId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片" prop="pic">
        <upload-image v-model="classInfoForm.pic"></upload-image>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="classInfoForm.sort" :controls="false"></el-input-number>
      </el-form-item>
      <el-form-item label="介绍" prop="introduction">
        <el-input v-model="classInfoForm.introduction" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="sumitToNext">下一步，添加学员</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import { classCreate, classInfo, classUpdate } from '@/api/class'
import { teacherQuery } from '@/api/teacher'
import UploadImage from '@/components/UploadImage'
import FormWrapper from '@/components/FormWrapper'
import { mapGetters } from 'vuex'
import { validateInputDate } from '@/utils/validate'
import to from 'await-to'
export default {
  name: 'ClassAddInfo',
  components: {
    UploadImage,
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
      classInfoForm: {
        className: '',
        classTime: '',
        principals: [],
        sort: '',
        introduction: '',
      },
      classInfoRules: {
        className: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' },
        ],
        principals: [{ required: true, message: '请选择任课老师', trigger: 'change' }],
        classTime: [{ required: true, validator: validateInputDate, trigger: 'change' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
      },
      teacherList: [],
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.getTeacherList()
    if (this.classId) this.getClassInfoBack() // 回显班级信息
  },
  methods: {
    // 获取教师列表
    async getTeacherList() {
      const [res, err] = await to(teacherQuery({ teacherName: '' }))
      if (err) return this.$message.warning(err.msg)
      this.teacherList = res.data
    },
    // 获取班级信息
    async getClassInfoBack() {
      const { classId, tenantId, organizationId } = this
      const [res, err] = await to(classInfo({ tenantId, organizationId, classId }))
      if (err) return this.$message.warning(err.msg)
      const principals = res.data.principals.map(item => ~~item.teacherId)
      const classTime = [res.data.classBeginTime, res.data.classEndTime]
      this.classInfoForm = { ...res.data, principals, classTime }
    },
    sumitToNext() {
      this.$refs['classInfoForm'].validate(async valid => {
        if (!valid) return false
        const { tenantId, organizationId } = this
        const selectTeacherIds = this.classInfoForm.principals // 已选择的教师id
        const principals = this.teacherList.filter(function(teacher) {
          return selectTeacherIds.includes(teacher.teacherId) // 重组为已选择的教师对象
        })
        const [classBeginTime, classEndTime] = this.classInfoForm.classTime
        const params = { principals, classBeginTime, classEndTime, tenantId, organizationId }
        let { classId } = this
        const [res, err] = classId
          ? await to(classUpdate({ ...this.classInfoForm, ...params, classId })) // 修改
          : await to(classCreate(params)) // 新建
        if (err) return this.$message.warning(err.msg)
        if (!classId) classId = res.data
        this.$emit('stateChange', { activeState: 1, classId })
      })
    },
  },
}
</script>
