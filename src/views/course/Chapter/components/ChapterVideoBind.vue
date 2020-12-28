<!--
 * @Description: 章节管理 - 绑定视频
 * @Author: xiawenlong
 * @Date: 2020-12-25 08:41:07
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:28:33
-->
<template>
  <el-dialog :title="'绑定视频'" class="chapter-video-bind" width="70%" :visible.sync="visible">
    <table-list
      :loading="loading"
      :search-form="searchForm"
      :data="chapterVideoList"
      :columns="columns"
      :operates="operates(this)"
      :pager="pager"
      @search="onSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </table-list>
  </el-dialog>
</template>
<script>
const searchForm = [
  {
    placeholder: '请输入视频名称或ID',
    prop: 'keyword',
  },
]
const columns = [
  {
    prop: 'videoId',
    label: '视频ID',
  },
  {
    prop: 'videoName',
    label: '视频名称',
  },
  {
    prop: 'teacherName',
    label: '讲师',
  },
  {
    prop: 'duration',
    label: '视频时长',
  },
  {
    prop: 'uploadTime',
    label: '上传时间',
  },
]
const operates = _this => [
  {
    label: '绑定',
    method: _this.bindChapterVideo,
    isShow: row => row.videoId !== _this.videoId,
  },
  {
    label: '已绑定',
    type: 'warning',
    disabled: () => true,
    isShow: row => row.videoId === _this.videoId,
  },
]
import TableList from '@/components/TableList'
import { videoList } from '@/api/video'
import { bindVideo } from '@/api/course'
import to from 'await-to'
export default {
  name: 'ChapterVideoBind',
  components: { TableList },
  props: {
    courseId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      searchForm,
      columns,
      operates,
      loading: false,
      chapterVideoList: [],
      pager: {
        total: 0,
        current: 1,
        size: 5,
      },
      videoId: '',
      sectionId: '',
      visible: false,
    }
  },
  methods: {
    open({ videoId, id }) {
      this.videoId = videoId
      this.sectionId = id
      this.pager = { total: 0, current: 1, size: 5 }
      this.visible = true
      this.getChapterVideo()
    },
    async getChapterVideo(queryParams = {}) {
      if (this.loading) return
      this.loading = true
      const { searchForm, pager, courseId } = this
      const params = { ...searchForm, ...pager, ...queryParams, courseId }
      const [res, err] = await to(videoList(params))
      this.loading = false
      if (err) return this.$message.warning(err.msg)
      this.chapterVideoList = res.data.list
      this.pager.total = res.data.total
    },
    onSearch(params) {
      this.pager.current = 1
      this.getChapterVideo(params)
    },
    handleCurrentChange(current) {
      this.pager.current = current
      this.getChapterVideo()
    },
    handleSizeChange(size) {
      this.pager.size = size
      this.getChapterVideo()
    },
    // 绑定视频
    async bindChapterVideo({ id }) {
      const [, err] = await to(bindVideo({ organizationVideoId: id, sectionId: this.sectionId }))
      if (err) return this.$message.warning(err.msg)
      this.$message.success('绑定成功')
      this.visible = false
      this.$emit('success')
    },
  },
}
</script>
