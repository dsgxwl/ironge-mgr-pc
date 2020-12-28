<!--
 * @Description: 添加视频
 * @Author: xiawenlong
 * @Date: 2020-12-24 11:44:48
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:29:41
-->

<template>
  <form-wrapper class="video-add">
    <el-form
      ref="videoAddForm"
      class="video-add-form"
      :model="videoAddForm"
      :rules="videoAddRules"
      label-width="120px"
    >
      <el-form-item label="视频名称" prop="videoName">
        <el-input v-model="videoAddForm.videoName"></el-input>
      </el-form-item>
      <el-form-item label="主讲老师" prop="teacherName">
        <el-input v-model="videoAddForm.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="封面图片" prop="coverImageUrl">
        <upload-image v-model="videoAddForm.coverImageUrl"></upload-image>
      </el-form-item>
      <el-form-item label="上传视频">
        <el-tabs v-model="uploadType" type="card">
          <el-tab-pane label="本地上传" name="0">
            <el-upload
              action="none"
              :on-remove="handleLocalVideoRemove"
              :http-request="localVideoUploadHttp"
              :file-list="videoFileList"
              :limit="1"
            >
              <el-button :loading="videoUploadLoading" type="primary">本地上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="第三方视频上传" name="1">
            <el-input
              v-model="videoUrl"
              class="video-url"
              placeholder="请输入视频地址"
              clearable
            ></el-input>
            <el-button :loading="videoUploadLoading" type="primary" @click="networkVideoUpload">
              上传视频
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button type="primary" @click="submitAddVideo">确定</el-button>
    </template>
  </form-wrapper>
</template>
<script>
import UploadImage from '@/components/UploadImage'
import FormWrapper from '@/components/FormWrapper'
import { videoAdd, aliLocalFileUpload, aliNetworkFileUpload } from '@/api/video'
import refreshToView from '@/mixins/refresh-to-view'
import to from 'await-to'
export default {
  name: 'VideoAdd',
  components: {
    UploadImage,
    FormWrapper,
  },
  mixins: [refreshToView],
  data() {
    return {
      videoUploadLoading: false,
      videoAddForm: {
        videoName: '',
        teacherName: '',
        coverImageUrl: '',
      },
      videoAddRules: {
        videoName: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        teacherName: [{ required: true, message: '请输入主讲老师', trigger: 'change' }],
      },
      uploadType: 0,
      videoFileList: [],
      videoUrl: '',
      videoId: '',
    }
  },
  methods: {
    async localVideoUploadHttp({ file }) {
      const params = new FormData()
      params.append('fileTypeCode', 'F001')
      params.append('file', file)
      params.append('fileName', file.name)
      this.videoUploadLoading = true
      const [res, err] = await to(aliLocalFileUpload(params))
      this.videoUploadLoading = false
      if (!err) {
        this.$message.success('上传成功')
        this.videoId = res.data
        this.videoFileList.push({ name: res.data, url: res.data })
      } else {
        this.$message.warning(err.msg || '上传失败')
        this.videoFileList = []
      }
    },
    handleLocalVideoRemove(file, fileList) {
      this.videoFileList = fileList
      this.videoId = ''
    },
    async networkVideoUpload() {
      if (!this.videoUrl) return this.$message.warning('请输入第三方视频上传的地址')
      this.videoUploadLoading = true
      const params = { title: this.videoAddForm.videoName, url: this.videoUrl }
      const [res, err] = await to(aliNetworkFileUpload(params))
      this.videoUploadLoading = false
      if (err) return this.$message.warning(err.msg)
      this.videoId = res.data
    },
    submitAddVideo() {
      this.$refs['videoAddForm'].validate(async valid => {
        if (!valid) return false
        if (!this.videoId) return this.$message.warning('请上传视频')
        const { videoId, videoAddForm } = this
        const params = {
          ...videoAddForm,
          videoId,
          coverImageUrl: videoAddForm.coverImageUrl.fileId,
        }
        const [, err] = await to(videoAdd(params))
        if (err) return this.$message.warning(err.msg)
        this.refreshToView('/video/list')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.video-add {
  .video-add-form {
    .video-url {
      width: 50%;
      margin-right: 20px;
    }
  }
}
</style>
