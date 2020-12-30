<!--
 * @Description: 班级-班级管理-添加班级-添加学员
 * @Author: xiawenlong
 * @Date: 2020-12-19 16:03:00
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 17:37:59
-->
<template>
  <form-wrapper class="class-student-form">
    <el-card class="tree-card">
      <div slot="header">部门信息</div>
      <el-tree
        :data="deptsTreeData"
        default-expand-all
        node-key="deptId"
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-card>
    <el-card class="table-card">
      <div slot="header">人员信息</div>
      <div class="search">
        <el-input v-model="keyword" placeholder="请输入姓名" clearable></el-input>
        <el-button @click="getStudents">搜索</el-button>
        <el-button type="primary" @click="submitStudent">
          提交（已选 <span>{{ selectStudents.length || 0 }} </span>人）
        </el-button>
      </div>
      <el-table
        ref="studentTable"
        border
        stripe
        :data="students"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center" width="50"> </el-table-column>
        <el-table-column prop="studentName" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="手机号"> </el-table-column>
        <el-table-column prop="cardNo" label="身份证"> </el-table-column>
      </el-table>
    </el-card>
    <template slot="footer">
      <el-button @click="sumitToPrev">上一步，添加班级基本信息</el-button>
      <el-button type="primary" @click="sumitToNext">下一步，添加课程</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import { classDeptStudents, classDeptStudentsUpdate } from '@/api/class'
import { deptsTree } from '@/api/dept'
import { mapGetters } from 'vuex'
import FormWrapper from '@/components/FormWrapper'
import to from 'await-to'
export default {
  name: 'ClassAddStudent',
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
      deptsTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      deptId: '', // 部门id
      keyword: '',
      students: [],
      selectStudents: [],
    }
  },
  computed: {
    ...mapGetters(['tenantId', 'organizationId']),
  },
  created() {
    this.getTreeData()
  },
  methods: {
    // 获取部门树 数据
    async getTreeData() {
      const { organizationId, tenantId } = this
      const [res, err] = await to(deptsTree({ organizationId, tenantId }))
      if (err) return this.$message.warning(err.msg)
      this.deptsTreeData = res.data
    },
    // 根据部门id 获取学员数据
    async getStudents() {
      const { classId, deptId, keyword, organizationId, tenantId } = this
      const params = { classId, deptId, keyword, organizationId, tenantId }
      const [res, err] = await to(classDeptStudents(params))
      if (err) return this.$message.warning(err.msg)
      this.students = res.data.deptStudentInfo
    },
    // 部门树节点点击
    handleNodeClick(dept) {
      this.deptId = dept.deptId
      this.getStudents()
    },
    // 学员列表勾选
    handleSelectionChange(val) {
      this.selectStudents = val
    },
    // 提交学员
    async submitStudent() {
      const { classId, deptId, organizationId, tenantId } = this
      const studentInfo = this.selectStudents.map(student => student.studentId)
      const params = { classId, organizationId, tenantId, studentInfo, deptId }
      const [, err] = await to(classDeptStudentsUpdate(params))
      if (err) return this.$message.warning(err.msg)
      this.$refs.studentTable.clearSelection()
      this.selectStudents = []
      this.$message.success('提交成功')
    },
    sumitToPrev() {
      this.$emit('stateChange', { activeState: 0 })
    },
    sumitToNext() {
      this.$emit('stateChange', { activeState: 2, classId: this.classId })
    },
  },
}
</script>
<style lang="scss" scoped>
.class-student-form {
  display: flex;
  ::v-deep .el-card {
    .el-card__header {
      padding: 10px 20px;
      font-size: 13px;
    }
  }
  .tree-card {
    width: 300px;
    min-height: 450px;
    margin-right: 20px;
  }
  .table-card {
    width: 100%;
    .search {
      margin-bottom: 10px;
      .el-input {
        width: 300px;
        margin-right: 20px;
      }
      .el-button {
        &:last-of-type {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
