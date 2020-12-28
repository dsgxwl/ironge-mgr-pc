
# 路由

## 路由配置
```bash
├── router
│   ├── modules                    # 按模块配置路由地址
│   ├── index.js                   # 路由基础设置
```
::: tip 代码目录
@/router
:::

1. 路由模块化：`@/router/modules`下`.router.js`结尾的文件为不同模块的路由配置文件，在`index.js`通过`require.context`实现自动引入：
```js
const files = require.context('./modules/', false, /\.router.js$/)
files.keys().forEach(key => {
  const file = files(key).default || files(key)
  routes.push(...file)
})
```
2. 使用路由懒加载：如`component: () => import(/*webpackChunkName:'ClassList'*/ '@/views/Class/ClassList.vue')`