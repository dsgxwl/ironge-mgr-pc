<!--
 * @Description: 视频列表
 * @Author: xiawenlong
 * @Date: 2020-12-24 11:44:37
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:24:32
-->
<template>
  <div class="video-list">
    <table-list
      :loading="false"
      :search-form="searchForm"
      :btns="btns(this)"
      :columns="columns"
      :data="videoList"
      :pager="pager"
      @search="onSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></table-list>
    <el-dialog
      :title="btns()[importType].label"
      width="400px"
      :close-on-click-modal="false"
      :visible.sync="importDialogVisible"
    >
      <el-upload drag action="#" :http-request="importRequest" :file-list="importFiles">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
const searchForm = [
  {
    label: '视频名称',
    prop: 'keyword',
  },
]
const btns = _this => [
  {
    label: '阿里视频导入',
    method: () => _this.import('ali'),
  },
  {
    label: '保利视频导入',
    method: () => _this.import('ployv'),
  },
]
const columns = [
  {
    label: '视频ID',
    prop: 'videoId',
  },
  {
    label: '视频名称',
    prop: 'videoName',
  },
  {
    label: '讲师',
    prop: 'teacherName',
  },
  {
    label: '视频时长',
    prop: 'duration',
  },
  {
    label: '上传时间',
    prop: 'uploadTime',
  },
]
import TableList from '@/components/TableList'
import { videoList, videoPolyvImport, videoAliImport } from '@/api/video'
import to from 'await-to'
export default {
  name: 'VideoList',
  components: {
    TableList,
  },
  data() {
    return {
      searchForm,
      btns,
      columns,
      loading: false,
      videoList: [],
      pager: {
        size: 10,
        current: 1,
        total: 0,
      },
      importDialogVisible: false,
      importType: 0, // 0阿里 1保利
      importFiles: [],
    }
  },
  created() {
    this.getVideoList()
  },
  methods: {
    async getVideoList(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const [res, err] = await to(videoList({ ...queryParams, ...this.pager }))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.videoList = res.data.list
      this.pager.total = res.data.total
    },
    onSearch(params) {
      this.pager.current = 1
      this.getVideoList(params)
    },
    handleSizeChange(size) {
      this.pager.size = size
      this.getVideoList()
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getVideoList()
    },
    import(typeName) {
      this.importType = ['ali', 'ployv'].indexOf(typeName)
      this.importDialogVisible = true
    },
    async importRequest({ file }) {
      const params = new FormData()
      params.append('file', file)
      const [, err] = await to([videoPolyvImport, videoAliImport][this.importType](params))
      this.importFiles = []
      if (err) return this.$message.warning(err.msg)
      this.$message.success('导入成功')
      this.importDialogVisible = false
      this.getVideoList()
    },
  },
}
</script>
