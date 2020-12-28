<!--
 * @Description: @/components/TableList.vue
 * @Author: xiawenlong
 * @Date: 2020-12-23 11:30:50
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 11:15:51
-->
::: tip 代码目录
@/components/TableList.vue
:::
## 参数
### Attributes
```js
props: {
    // 搜索栏输入框配置
    searchForm: {
        type: Array,
        default: () => [],
    },
    // 搜索栏右侧按钮配置
    btns: {
        type: Array,
        default: () => [],
    },
    // 表格loading状态
    loading: {
        type: Boolean,
        default: false,
    },
    // 表格数据
    data: {
        type: Array,
        default: () => [],
    },
    // 表格列配置
    columns: {
        type: Array,
        default: () => [],
    },
    // 表格操作列按钮配置
    operates: {
        type: Array,
        default: () => [],
    },
    // 分页参数
    pager: {
        type: Object,
        default: () => {},
    },
    // 其他element表格参数
    options: {
        type: Object,
        default: () => {},
    },
},
```
#### searchForm [] (搜索栏输入框配置) 
| 参数 | 说明 | 类型 | 默认值 | 必填项 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| label | 搜索框关联的文字 | String | - | 否 |
| prop | 搜索框在请求时对应的key | String | - | 是 |
| type | 搜索框类型 | String | 'input' | 否 |
| placeholder | 搜索框占位文本	 | String | '请输入' + label | 否 |
| children | 下拉框选项值(type:select时生效) | Array | - | 否 |

#### btns [] (搜索栏右侧按钮配置)
| 参数 | 说明 | 类型 | 默认值 | 必填项 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| label | 按钮文字 | String | - | 否 |
| type | 按钮类型 | String | 'primary' | 否 |
| method | 按钮执行方法	 | Fuction | - | 是 |

#### columns [] (表格列配置)
| 参数 | 说明 | 类型 | 默认值 | 必填项 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| label | 列头文字 | String | - | 否 |
| prop | 列在数据项中对应的 key	 | String | - | 是 |
| width | 列宽度 | String,Number | - | 否 |
| render | 生成复杂数据的渲染函数 | Fuction(h, record) | - | 否 |
| click | 点击事件 | Fuction(row, index) | - | 否 |
| render | 生成复杂数据的渲染函数 | Fuction(h, record) | - | 否 |
| formatter | 数据格式化 | Function(row, columns, index) | - | 否 |

#### operates [] (表格操作列按钮配置)
| 参数 | 说明 | 类型 | 默认值 | 必填项 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| label | 操作按钮文本 | String | - | 否 |
| type | 按钮类型 | String | 'primary' | 否 |
| isShow | 是否显示 | Function(row, index) | - | 否 |
| disabled | 是否禁用 | Fuction(row, index) | - | 否 |
| method | 触发事件 | Fuction(row, index) | - | 否 |

### Events
| 事件名 | 说明 | 类型 | 默认值 | 必填项 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| search | 搜索时触发,返回搜索参数 | Function(params) | - | 否 |
| handleSizeChange | 每页数量改变时会触发 | Function(size) | - | 否 |
| handleCurrentChange | 页码改变时会触发 | Function(current) | - | 否 |

## 使用
例子（伪代码）
```vue
<template>
  <table-list
    :loading="loading"
    :search-form="searchForm"
    :data="classList"
    :btns="btns(this)"
    :columns="columns(this)"
    :operates="operates(this)"
    :pager="pager"
    @search="onSearch"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></table-list>
</template>
<script>
// 搜索框配置
const searchForm = [
  {
    label: '班级名称',
    prop: 'keyword',
  },
]
// 搜索栏按钮
const btns = _this => [
  {
    label: '导入',
    method: _this.import,
  },
]
// 表格列配置
const columns = _this => [
  {
    prop: 'className',
    label: '班级名称',
  },
  {
    prop: 'pic',
    label: '封面图片',
    render: (h, { row }) => {
      return [
        row.pic
          ? h('img', {
              domProps: { src: row.pic },
              style: 'height: 50px',
            })
          : null,
      ]
    },
  },
  {
    prop: 'studentTotal',
    label: '学员数(可点击)',
    click: () => {
      _this.$router.push('/class/student')
    },
  },
]
// 表格操作按钮配置
const operates = _this => [
  {
    label: '编辑',
    method: _this.handleEdit,
  },
]
import TableList from '@/components/TableList'
export default {
  components: {
    TableList,
  },
  data() {
    return {
      searchForm,
      columns,
      operates,
      loading: false,
      classList: [],
      pager: {
        total: 0,
        size: 10,
        current: 1,
      },
    }
  },
  created() {
    this.getClassListData()
  },
  methods: {
    // 获取列表数据
    async getClassListData(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      //   ...
      const params = { ...queryParams, ...this.pager }
      const { data } = await getClassList(params)
      this.classList = data.list
      this.pager.total = data.total
      //   ...
      this.loading = false
    },
    // 查询按钮
    onSearch(queryParams) {
      this.pager.current = 1
      this.getClassListData(queryParams)
    },
    // 编辑
    handleEdit(row) {
      // ...
    },
    // 删除
    async handleDelete(row) {
      // ...
    },
    // 分页
    handleSizeChange(size) {
      this.pager.current = 1
      this.pager.size = size
      this.getClassListData()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getClassListData()
    },
  },
}
</script>

```