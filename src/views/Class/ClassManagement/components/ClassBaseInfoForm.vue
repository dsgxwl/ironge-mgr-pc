<!--
 * @Description: 班级-班级管理-添加班级-班级基本信息
 * @Author: xiawenlong
 * @Date: 2020-12-19 11:59:09
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 22:09:51
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
        <el-input v-model="classInfoForm.sort"></el-input>
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
import { queryTeacher, createClass, getClassInfo, updateClass } from '@/api/class'
import UploadImage from '@/components/UploadImage'
import FormWrapper from '@/components/FormWrapper'
import { mapGetters } from 'vuex'
export default {
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
        classTime: [{ required: true, validator: validateTime, trigger: 'change' }],
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
    sumitToNext() {
      this.$refs['classInfoForm'].validate(async valid => {
        if (valid) {
          try {
            const { tenantId, organizationId, classInfoForm, teacherList } = this
            const { classTime } = classInfoForm
            // 处理教师数组
            const selectTeacherIds = classInfoForm.principals
            const principals = teacherList.filter(function(teacher) {
              return selectTeacherIds.includes(teacher.teacherId)
            })
            const params = {
              ...classInfoForm,
              principals,
              classBeginTime: classTime[0],
              classEndTime: classTime[1],
              tenantId,
              organizationId,
            }
            let { classId } = this
            if (classId) {
              await updateClass({ ...params, classId }) // 修改
            } else {
              const { data } = await createClass(params) // 新建
              classId = data
            }
            this.$emit('stateChange', { activeState: 1, classId })
          } catch (error) {
            this.$message.warning(error.msg)
          }
        } else {
          return false
        }
      })
    },
    // 获取教师列表
    async getTeacherList() {
      try {
        const teacherName = ''
        const { data } = await queryTeacher({ teacherName })
        this.teacherList = data
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
    // 获取班级信息
    async getClassInfoBack() {
      const { classId, tenantId, organizationId } = this
      try {
        const { data } = await getClassInfo({ tenantId, organizationId, classId })
        if (data) {
          const principals = data.principals.map(item => ~~item.teacherId)
          const classTime = [data.classBeginTime, data.classEndTime]
          this.classInfoForm = { ...data, classTime, principals }
        }
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
  },
}

const validateTime = function(rule, value, callback) {
  if (!value || value.length == 0 || value == null || value == undefined) {
    return callback('日期不能为空')
  }
  if (Array.isArray(value)) {
    //格式为：daterange、datetimerange检测
    value.map(function(item) {
      if (item === '') {
        return callback('日期不能为空')
      }
    })
  } else {
    //格式为：date、datetime、year、month 检测
    if (value === '') {
      return callback('日期不能为空')
    }
  }
  return callback()
}
</script>
<style lang="scss" scoped>
.class-base-info-form {
  width: 90%;
  .tip {
    color: #909399;
    font-size: 14px;
    padding-left: 20px;
  }
}
</style>
