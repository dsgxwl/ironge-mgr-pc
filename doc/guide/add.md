<!--
 * @Description: 
 * @Author: xiawenlong
 * @Date: 2020-12-22 18:09:27
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-26 15:22:56
-->
# 新增


## 新增路由
::: tip 代码目录
@/router
:::

1. 在`@/router/modules`下按模块拆分路由配置
2. 新增一个带有公共部分(layout)的页面需要在最外层创建一个基于layout的一级路由，然后在它下面的 children 中添加子路由，如：
```js
import Layout from '@/layout'
export default [
  {
    path: '/course',
    component: Layout,
    name: 'Course',
    type: 'class',
    meta: { title: '课程管理', icon: 'el-icon-notebook-1' },
    redirect: '/course/list',
    children: [
      {
        path: 'list',
        name: 'CourseList',
        component: () => import(/*webpackChunkName:'CourseList'*/ '@/views/Course/CourseList.vue'),
        meta: { title: '课程列表' },
      },
    ],
  },
]
```
3. 路由 `router` 和路由对应的 `view` 的 两者的 name 必须是完全一致的

## 新增页面
::: tip 代码目录
@/views
:::
新增完路由之后在`@/views`下创建对应模块的文件夹，存放模块下的所有页面

1. 目录按模块划分层级，最外层目录名作为模块名，尽量为一个单词，如：`Class`、`Course`，模块下的页面命名时带上对应模块的前缀，如`Class/ClassAdd.vue`、`Course/CourseList.vue`
2. 每个页面模块下的组件就在当前文件夹下的`components`下维护，组件名应该以当前页面模块名作为前缀命名，如：
```
├── Class
│   ├── ClassAdd.vue
│   │   ├── components
│   │   │   ├── ClassAddInfo.vue
│   │   │   ├── ClassAddCourse.vue
│   │   │   ├── ClassAddStudent.vue
```

## 新增组件
::: tip 代码目录
@/components
:::
1. 此目录仅用于存放全局使用的组件，页面级别的组件存放在相应页面目录下components目录内，如`@/views/Class/components/xxx`

2. 组件命名采用PascalCase命名法，所有单词首字母全部大写，在DOM模板中采用kebab-case命名

如 `@/components/TableList.vue` => `<table-list></table-list>`

## 新增api
::: tip 代码目录
@/api
:::

1. 在`@/api/config`下新建本模块对应的接口地址配置文件`模块名.js`
2. 在`@/api`下新建`模块名.js`引入刚刚创建的`config`文件，维护所有请求方法

## 新增样式

1. 全局样式在`@/style`下维护
2. 页面样式在自己的.vue文件下`<style lang="scss" scoped></scoped>`维护

```vue
<template>
  <div class="命名空间">
    <!-- 内容 -->
  </div>
</template>
<style lang="scss" scoped>
.命名空间{
  /* 样式 */
}
</scoped>
```