<template>
  <div>
    <el-form class="tableToolBar" size="small" :inline="true" :model="formInline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="tableToolBar"></div> -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ClassList',
  data() {
    return {
      tableData: [],
      formInline: {},
    }
  },
}
</script>
<style lang="scss" scoped>
.tableToolBar {
  // height: 50px;
  padding: 15px 20px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
