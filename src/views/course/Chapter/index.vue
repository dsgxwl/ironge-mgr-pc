<!--
 * @Description: 章节管理
 * @Author: xiawenlong
 * @Date: 2020-12-24 11:27:16
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:27:52
-->
<template>
  <div class="chapter">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :btns="btns(this)"
      :data="chapterList"
      :columns="columns"
      :operates="operates(this)"
      :options="{
        'default-expand-all': true,
        'row-key': 'id',
        'tree-props': { children: 'sectionList', hasChildren: 'hasChildren' },
      }"
      @search="onSearch"
    >
    </table-list>
    <!-- 绑定视频 -->
    <chapter-video-bind
      ref="chapterVideoBind"
      :course-id="courseId"
      @success="handleSuccess"
    ></chapter-video-bind>
    <!-- 新增修改章节、节点 -->
    <chapter-add-edit ref="chapterAddEdit" @success="handleSuccess"></chapter-add-edit>
  </div>
</template>
<script>
const searchForm = [
  {
    label: '章节名称',
    prop: 'keyword',
  },
]
const btns = _this => [
  {
    label: '新增章节',
    method: () => {
      _this.$refs.chapterAddEdit.open(type.CHAPTER_ADD, { id: _this.courseId })
    },
  },
]
const columns = [
  {
    prop: 'id',
    label: '章节ID',
  },
  {
    prop: 'label',
    label: '章节名称',
  },
  {
    prop: 'type',
    label: '类型',
    formatter: row => ['章节', '节点'][row.type - 1],
  },
]
const operates = _this => [
  {
    label: '绑定视频',
    isShow: row => !Object.hasOwnProperty.call(row, 'sectionList') && row.organizationVideoId === 0,
    method: row => {
      _this.$refs.chapterVideoBind.open(row)
    },
  },
  {
    label: '更换视频',
    isShow: row => !Object.hasOwnProperty.call(row, 'sectionList') && row.organizationVideoId !== 0,
    method: row => {
      _this.$refs.chapterVideoBind.open(row)
    },
  },
  {
    label: '新增节点',
    isShow: row => row.type == 1,
    method: row => {
      _this.$refs.chapterAddEdit.open(type.SECTION_ADD, { id: row.id })
    },
  },
  {
    label: '编辑节点',
    isShow: row => row.type == 2,
    type: 'warning',
    method: row => {
      _this.$refs.chapterAddEdit.open(type.SECTION_EDIT, { id: row.id, label: row.label })
    },
  },
  {
    label: '删除节点',
    isShow: row => row.type == 2,
    type: 'danger',
    method: _this.handleDelete,
  },
  {
    label: '编辑章节',
    isShow: row => row.type == 1,
    type: 'warning',
    method: row => {
      _this.$refs.chapterAddEdit.open(type.CHAPTER_EDIT, { id: row.id, label: row.label })
    },
  },
  {
    label: '删除章节',
    isShow: row => row.type == 1,
    type: 'danger',
    method: _this.handleDelete,
  },
]
import TableList from '@/components/TableList'
import { chapterQuery, chapterDelete, sectionDelete } from '@/api/course'
import ChapterVideoBind from './components/ChapterVideoBind'
import ChapterAddEdit from './components/ChapterAddEdit'
import * as type from './dialog-type'
import to from 'await-to'
export default {
  name: 'Chapter',
  components: {
    TableList,
    ChapterVideoBind,
    ChapterAddEdit,
  },
  data() {
    return {
      searchForm,
      btns,
      columns,
      operates,
      loading: false,
      chapterList: [],
      courseId: '',
    }
  },
  created() {
    this.courseId = this.$route.params.id
    this.getChapterList()
  },
  methods: {
    async getChapterList(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const [res, err] = await to(chapterQuery({ ...queryParams, courseId: this.courseId }))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.chapterList = res.data.chapterList
    },
    onSearch(params) {
      this.pager.current = 1
      this.getChapterList(params)
    },
    handleSuccess() {
      this.getChapterList() // 操作成功刷新列表
    },
    async handleDelete({ type, id }) {
      const msg = `此操作将删除${type == 1 ? '章节下所有节点，请慎重操作' : '此节点'}, 是否继续?`
      const [, cancel] = await to(this.$confirm(msg, '提示', { type: 'warning' }))
      if (cancel) return
      const [, err] = type == 1 ? await to(chapterDelete({ id })) : await to(sectionDelete({ id }))
      if (err) return this.$message.warning(err.msg)
      this.getChapterList()
      this.$message.success('删除成功')
    },
  },
}
</script>
