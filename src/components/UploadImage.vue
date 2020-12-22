<!--
 * @Description: 上传图片组件
 * @Author: xiawenlong
 * @Date: 2020-12-19 14:23:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-21 18:08:34
-->
<template>
  <div class="upload-image">
    <el-upload
      class="uploader"
      drag
      action=""
      :limit="1"
      :show-file-list="false"
      :http-request="uploadRequest"
      accept=".jpg,.jpeg,.png,.gif,.svg,.JPG,.JPEG"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script>
import { upload } from '@/api/oss'
export default {
  name: 'UploadImage',
  model: {
    prop: 'value',
    event: 'setModelVal',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imageUrl: '',
    }
  },
  watch: {
    value(val) {
      this.imageUrl = val
    },
  },
  methods: {
    async uploadRequest(file) {
      const params = new FormData()
      params.append('fileTypeCode', 'F001')
      params.append('file', file.file)
      params.append('fileName', file.file.name)
      try {
        const { data } = await upload(params)
        this.imageUrl = data.fileUrl
        this.$emit('setModelVal', data.fileUrl)
      } catch (error) {
        this.$message.warning(error.msg)
      }
    },
  },
}
</script>
