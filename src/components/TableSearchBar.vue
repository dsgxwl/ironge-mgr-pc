<!--
 * @Description: 表格搜索栏
 * @Author: xiawenlong
 * @Date: 2020-12-21 18:06:30
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 10:29:04
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
    <div class="form">
      <el-form-item
        v-for="item in searchForm"
        :key="item.prop"
        :label="item.label ? item.label + ':' : ''"
        :prop="item.prop"
      >
        <el-select
          v-if="item.type === 'select'"
          v-model="searchData[item.prop]"
          clearable
          :placeholder="item.placeholder || '请选择' + item.label"
        >
          <el-option
            v-for="option in item.children"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </el-select>
        <el-date-picker
          v-else-if="item.type === 'picker'"
          v-model="searchData[item.prop]"
          clearable
          style="width: 100%;"
          placeholder="请选择日期"
        />
        <el-input
          v-if="!item.type || item.type === 'input'"
          v-model="searchData[item.prop]"
          clearable
          :placeholder="item.placeholder || '请输入' + item.label"
        ></el-input>
      </el-form-item>
    </div>
    <div class="btns">
      <el-form-item>
        <el-button
          v-for="(btn, key) in btns"
          :key="key"
          :type="btn.type || 'primary'"
          @click.native.prevent="btn.method"
        >
          {{ btn.label }}
        </el-button>
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
    btns: {
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
  padding: 15px 20px 5px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  .el-form-item {
    margin-bottom: 0;
  }
  .form {
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .btns {
    ::v-deep .el-form-item__content {
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>
