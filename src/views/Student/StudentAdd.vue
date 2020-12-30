<!--
 * @Description: 添加学员
 * @Author: xiawenlong
 * @Date: 2020-12-29 16:30:21
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-30 08:54:37
-->
<template>
  <form-wrapper class="student-add">
    <el-table :data="students" border>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="studentName" label="学员姓名">
        <template slot-scope="scope">
          <el-input v-model="scope.row.studentName"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="学员手机号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.mobile"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="cardNo" label="身份证/护照">
        <template slot-scope="scope">
          <el-input v-model="scope.row.cardNo"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="depts" label="部门（选填）">
        <template slot-scope="scope">
          <el-select v-model="scope.row.depts" multiple placeholder="请选择部门">
            <el-option
              v-for="item in deptList"
              :key="item.deptId"
              value-key="deptId"
              :label="item.deptName"
              :value="item.deptId"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="classes" label="班级（选填）">
        <template slot-scope="scope">
          <el-select v-model="scope.row.classes" multiple placeholder="请选择班级">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              value-key="classId"
              :label="item.className"
              :value="item.classId"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="el-icon-circle-plus-outline" @click="addRow(scope.$index, scope.row)"></i>
          <i
            v-if="students.length > 1"
            class="el-icon-remove-outline"
            @click="removeRow(scope.$index, scope.row)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
    <template slot="footer">
      <el-button type="primary" @click="submitAddStudent">提交</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import FormWrapper from '@/components/FormWrapper'
import to from 'await-to'
import { deptsSelect } from '@/api/dept'
import { classSelect } from '@/api/class'
import { studentCreate } from '@/api/student'
import { mapGetters } from 'vuex'
import refreshToView from '@/mixins/refresh-to-view'
import { isMobile, isIDcard } from '@/utils/validate'
export default {
  name: 'StudentAdd',
  components: { FormWrapper },
  mixins: [refreshToView],
  data() {
    return {
      students: [
        {
          studentName: '',
          mobile: '',
          cardNo: '',
          depts: [],
          classes: [],
        },
      ],
      studentsRules: {
        studentName: [{ required: true, message: '学生姓名' }],
        mobile: [{ required: true, validator: isMobile, message: '手机号' }],
        cardNo: [{ required: true, validator: isIDcard, message: '身份证号' }],
      },
      deptList: [],
      classList: [],
    }
  },
  computed: {
    ...mapGetters(['organizationId', 'tenantId']),
  },
  mounted() {
    this.getDeptList()
    this.getClassList()
  },
  methods: {
    // 获取部门选择框数据
    async getDeptList() {
      const { organizationId, tenantId } = this
      const [res, err] = await to(deptsSelect({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.deptList = res.data
    },
    // 获取班级选择框数据
    async getClassList() {
      const { organizationId, tenantId } = this
      const [res, err] = await to(classSelect({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.classList = res.data
    },
    async submitAddStudent() {
      for (let i = 0; i < this.students.length; i++) {
        let student = this.students[i]
        for (const key in this.studentsRules) {
          const { required, message, validator } = this.studentsRules[key][0]
          if (required && !student[key]) {
            return this.$message.warning(`序号${i + 1}行${message}不能为空`)
          }
          if (validator && !validator(student[key])) {
            return this.$message.warning(`序号${i + 1}行请填写正确的${message}`)
          }
        }
      }
      const { organizationId, tenantId, students } = this
      const [, err] = await to(studentCreate({ students, organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.refreshToView('/student/list')
    },
    addRow() {
      this.students.push({
        studentName: '',
        mobile: '',
        cardNo: '',
        depts: [],
        classes: [],
      })
    },
    removeRow(index) {
      this.students.splice(index, 1)
    },
  },
}
</script>
<style lang="scss" scoped>
.student-add {
  .cell {
    i {
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>
