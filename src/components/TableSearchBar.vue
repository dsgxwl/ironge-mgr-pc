<!--
 * @Description: 表格搜索栏
 * @Author: xiawenlong
 * @Date: 2020-12-21 18:06:30
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 19:49:50
-->
<template>
  <el-form
    ref="tableSearchForm"
    :model="searchData"
    class="table-search-bar"
    :inline="true"
    @submit.native.prevent
    @keyup.enter.native="onSearch"
  >
    <div class="from">
      <el-form-item
        v-for="item in searchForm"
        :key="item.prop"
        :label="item.label + ':'"
        :prop="item.prop"
      >
        <el-input v-model="searchData[item.prop]" :placeholder="'请输入' + item.label"></el-input>
      </el-form-item>
    </div>
    <div class="btns">
      <el-form-item>
        <el-button @click="resetSearchForm">重置</el-button>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'TableSearchBar',
  props: {
    searchForm: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchData: {},
    }
  },
  methods: {
    // 重置搜索条件
    resetSearchForm() {
      this.$refs['tableSearchForm'].resetFields()
    },
    onSearch() {
      this.$emit('search', this.searchData)
    },
  },
}
</script>
<style lang="scss" scoped>
.table-search-bar {
  box-sizing: border-box;
  padding: 15px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
