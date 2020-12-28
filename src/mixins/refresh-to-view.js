/*
 * @Description: 跳转并刷新某个页面 如：修改完成跳转到列表页并刷新
 * @Author: xiawenlong
 * @Date: 2020-12-26 16:49:58
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 16:55:33
 */
import { mapGetters, createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('tagsView')
import * as type from '@/store/action-types'
export default {
  computed: {
    ...mapGetters(['visitedViews']),
  },
  methods: {
    ...mapActions([type.DEL_CACHED_VIEW]),
    async refreshToView(viewPath) {
      const view = this.visitedViews.find(item => item.path === viewPath)
      view && (await this[type.DEL_CACHED_VIEW](view))
      this.$nextTick(() => {
        this.$router.replace(viewPath)
      })
    },
  },
}
