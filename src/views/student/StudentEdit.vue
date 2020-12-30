<!--
 * @Description: 
 * @Author: xiawenlong
 * @Date: 2020-12-26 09:46:56
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:13:34
-->
<template>
  <form-wrapper class="studentEdit">
    <el-form
      ref="studentForm"
      class="student-form"
      :model="studentForm"
      :rules="studentFormRules"
      label-width="120px"
    >
      <el-form-item label="学员姓名" prop="studentName">
        <el-input v-model="studentForm.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学员手机号" prop="mobile">
        <el-input v-model="studentForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="cardNo">
        <el-input v-model="studentForm.cardNo"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="depts">
        <el-select v-model="studentForm.depts" multiple placeholder="请选择">
          <el-option
            v-for="item in deptList"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="classes">
        <el-select v-model="studentForm.classes" multiple placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.classId"
            :label="item.className"
            :value="item.classId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitEditStudent">提交</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import FormWrapper from '@/components/FormWrapper'
import { validateInputMobile } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { studentInfo, studentInfoUpdate } from '@/api/student'
import { deptsSelect } from '@/api/dept'
import { classSelect } from '@/api/class'
import refreshToView from '@/mixins/refresh-to-view'
import to from 'await-to'
export default {
  name: 'StudentEdit',
  components: { FormWrapper },
  mixins: [refreshToView],
  data() {
    return {
      studentId: '',
      studentForm: {
        studentName: '',
        mobile: '',
        cardNo: '',
        depts: [],
        classes: [],
      },
      studentFormRules: {
        studentName: [{ required: true, message: '请输入学员姓名', trigger: 'blur' }],
        mobile: [{ required: true, validator: validateInputMobile, trigger: 'blur' }],
      },
      deptList: [],
      classList: [],
    }
  },
  computed: {
    ...mapGetters(['organizationId', 'tenantId']),
  },
  created() {
    this.studentId = this.$route.params.id
    this.getStudentInfo()
    this.getDeptList()
    this.getClassList()
  },
  methods: {
    async getStudentInfo() {
      const { organizationId, tenantId, studentId } = this
      const [data, err] = await to(studentInfo({ organizationId, tenantId, studentId }))
      if (err) return this.$message.warning(err.msg)
      this.studentForm = data
    },
    submitEditStudent() {
      this.$refs['studentForm'].validate(async valid => {
        if (!valid) return false
        const [, err] = await to(studentInfoUpdate(this.studentForm))
        if (err) return this.$message.warning(err.msg)
        this.$message.success('修改成功')
        this.refreshToView('/student/list')
      })
    },
    // 部门列表
    async getDeptList() {
      const { organizationId, tenantId } = this
      const [res, err] = await to(deptsSelect({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.deptList = res.data
    },
    // 班级列表
    async getClassList() {
      const { organizationId, tenantId } = this
      const [res, err] = await to(classSelect({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.classList = res.data
    },
  },
}
</script>
