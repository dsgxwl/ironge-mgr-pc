<!--
 * @Description: 
 * @Author: xiawenlong
 * @Date: 2020-12-23 08:32:48
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-23 09:35:53
-->
# 状态管理

## 模块化

```bash
├── store
│   ├── modules                    # 模块
│   ├── root                       # 根模块
│   ├── action-types.js            # 方法名常量配置
│   ├── getters.scss               # 全局getters
│   ├── index.js
```
::: tip 代码目录
@/store
:::

1. 根据业务拆分成不同模块的js文件，存放在modules里
2. root模块存放全局状态
3. action、mutation方法名在`action-types.js`作为常量声明

## 使用
在 `@/store/action-types.js` 声明方法常量名
```js
export const LOGIN = 'LOGIN' // 登录
export const SET_USER_INFO = 'SET_USER_INFO' // 设置用户信息
```
在modules/里使用时，引入常量文件并保持一致使用，如：
```js
import * as type from '../action-types'
export default {
  mutations: {
    [type.SET_USER_INFO](state, payload) {
        // ...
    },
  },
  actions: {
    async [type.LOGIN]({ commit }, formData) {
        // ...
        commit(type.SET_USER_INFO, result.data)
        // ...
    },
  },
}

```
在组件中使用时，同理：
```vue
<script>
import * as type from '@/store/action-types' // 引入常量文件
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')
export default {
  methods: {
    ...mapActions([type.LOGIN]),
    login() {
        // ...
        await this[type.LOGIN](params)
        // ...
    },
  },
}
</script>
```
::: tip
这里使用了借助[createNamespacedHelpers](https://vuex.vuejs.org/zh/api/#createnamespacedhelpers)创建基于user模块下的组件绑定辅助函数，可以更方便的直接获取对应模块的`state`、`mutation`、`action`
:::
获取module下的state 也可以通过在`@/store/getters.js`里提前定义好，如：
```js
const getters = {
  userInfo: state => state.user.userInfo,
}
```
在组件里使用时，使用`mapGetters`辅助函数：
```vue
<template>
    <span>{{ userInfo.userName }}</span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>
```