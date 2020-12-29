<!--
 * @Description: 全局常规通用数据表格 带搜索栏、分页、操作
 * @Author: xiawenlong
 * @Date: 2020-12-21 19:52:13
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-29 14:31:20
-->
<template>
  <div>
    <table-search-bar
      v-if="searchForm.length"
      :search-form="searchForm"
      :btns="btns"
      @search="onSearch"
    ></table-search-bar>
    <div class="table-list">
      <el-table
        v-loading="loading"
        stripe
        border
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        v-bind="options"
      >
        <el-table-column
          v-for="(col, index) in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
        >
          <template slot-scope="scope">
            <template>
              <template v-if="!col.render">
                <template v-if="col.formatter">
                  <span
                    @click="col.click && col.click(scope.row, scope.$index)"
                    v-text="col.formatter(scope.row, col, scope.$index)"
                  ></span>
                </template>
                <template v-else>
                  <span
                    :style="col.click ? 'color: #409EFF; cursor: pointer;' : null"
                    @click="col.click && col.click(scope.row, scope.$index)"
                  >
                    {{ scope.row[col.prop] || col.content }}
                  </span>
                </template>
              </template>
              <template v-else>
                <render :column="col" :row="scope.row" :render="col.render" :index="index"></render>
              </template>
            </template>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column v-if="operates && operates.length > 0" label="操作" align="center">
          <template slot-scope="scope">
            <div class="operate-group">
              <template v-for="(btn, key) in operates">
                <span
                  v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row, scope.$index))"
                  :key="key"
                >
                  <el-button
                    size="mini"
                    :type="btn.type || 'primary'"
                    :disabled="btn.disabled && btn.disabled(scope.row, scope.$index)"
                    @click.native.prevent="btn.method(scope.row, scope.$index)"
                  >
                    {{ btn.label }}
                  </el-button>
                </span>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="pager"
        background
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pager.size"
        layout="total, prev, pager, next, sizes, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TableSearchBar from './TableSearchBar'
export default {
  name: 'TableList',
  components: {
    TableSearchBar,
    render: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, opt) => {
        const params = {
          row: opt.props.row,
          index: opt.props.index,
        }
        if (opt.props.column) params.column = opt.props.column
        return opt.props.render(h, params)
      },
    },
  },
  props: {
    searchForm: {
      type: Array,
      default: () => [],
    },
    btns: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    operates: {
      type: Array,
      default: () => [],
    },
    pager: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 分页
    handleSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleCurrentChange(current) {
      this.$emit('current-change', current)
    },
    onSearch(params) {
      this.$emit('search', params)
    },
  },
}
</script>
<style lang="scss" scoped>
.table-list {
  background-color: #fff;
  padding: 20px;
  .el-table {
    margin-bottom: 10px;
  }
  .operate-group {
    > span {
      margin-right: 5px;
      &:last-of-type {
        margin: 0;
      }
    }
  }
  .el-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ::v-deep .el-pagination__total {
      flex: 1;
    }
  }
}
</style>
