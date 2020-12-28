<!--
 * @Description: 上传图片组件
 * @Author: xiawenlong
 * @Date: 2020-12-19 14:23:46
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 20:01:46
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
      <img v-if="image" :src="image" class="avatar" />
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>
<script>
import { upload } from '@/api/oss'
import to from 'await-to'
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
      image: '',
    }
  },
  watch: {
    value(val) {
      this.image = val
    },
  },
  methods: {
    async uploadRequest(file) {
      const params = new FormData()
      params.append('fileTypeCode', 'F001')
      params.append('file', file.file)
      params.append('fileName', file.file.name)
      const [res, err] = await to(upload(params))
      if (err) return this.$message.warning(err.msg)
      this.image = res.data
      this.$emit('setModelVal', res.data)
    },
  },
}
</script>
