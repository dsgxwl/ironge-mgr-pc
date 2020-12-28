<!--
 * @Description: 新增修改章节、节点，通过type区分
 * @Author: xiawenlong
 * @Date: 2020-12-25 11:20:41
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-28 18:00:55
-->
<template>
  <el-dialog :title="dialogOptions[dialogType].title" :visible.sync="dialogTypeVisible" width="30%">
    <el-form ref="addEditForm" label-width="80px" :model="addEditForm" :rules="addEditFormRules">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="addEditForm.name" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogTypeVisible = false">取 消</el-button>
      <el-button type="primary" @click="chapterAddEditSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as type from '../dialog-type'
import { chapterAdd, chapterUpdate, sectionAdd, sectionUpdate } from '@/api/course'
import to from 'await-to'
export default {
  name: 'ChapterAddEdit',
  props: {
    type: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogTypeVisible: false,
      addEditForm: {
        name: '',
      },
      id: '',
      addEditFormRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 20, message: '请输入20字以内', trigger: 'blur' },
        ],
      },
      dialogType: type.CHAPTER_ADD,
      dialogOptions: Object.freeze({
        [type.CHAPTER_ADD]: {
          title: '新增章节',
          method: chapterAdd,
          key: {
            id: 'courseId',
            name: 'chapterName',
          },
        },
        [type.CHAPTER_EDIT]: {
          title: '编辑章节',
          method: chapterUpdate,
          key: {
            id: 'id',
            name: 'chapterName',
          },
        },
        [type.SECTION_ADD]: {
          title: '新增节点',
          method: sectionAdd,
          key: {
            id: 'chapterId',
            name: 'sectionName',
          },
        },
        [type.SECTION_EDIT]: {
          title: '编辑节点',
          method: sectionUpdate,
          key: {
            id: 'id',
            name: 'sectionName',
          },
        },
      }),
    }
  },
  methods: {
    open(type, { id, label }) {
      this.dialogType = type
      this.dialogTypeVisible = true
      this.id = id
      this.addEditForm.name = label || ''
    },
    chapterAddEditSubmit() {
      this.$refs['addEditForm'].validate(async valid => {
        if (!valid) return false
        const option = this.dialogOptions[this.dialogType]
        const [, err] = await to(
          option.method({
            [option.key.name]: this.addEditForm.name,
            [option.key.id]: this.id,
          }),
        )
        if (err) return this.$message.warning(err.msg)
        this.$message.success('操作成功')
        this.$emit('success')
        this.$refs['addEditForm'].resetFields()
        this.dialogTypeVisible = false
      })
    },
  },
}
</script>
