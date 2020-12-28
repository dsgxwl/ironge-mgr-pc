# 样式

## 全局样式

```bash
├── styles
│   ├── index.scss                 # 全局样式
│   ├── layout.scss                # layout部分样式
│   ├── transition.scss            # 动画样式
│   ├── variable.scss              # 全局css变量
```
::: tip 代码目录
@/styles
:::
1. `index.scss` 作为全局css入口文件，同时做了`css reset`重置了浏览器样式，在main.js引入
2. `layout.scss` 存放了`layout`相关的组件（头部、侧边栏...）等公共部分样式存放在
3. `transition.scss` 存放了vue transition相关动画样式，如：页面路由切换动画、面包屑切换动画
4. `variable.scss` 存放了全局变量，如：
```scss
$active-color: #409eff;
// 超出一行显示省略号
%one-line-text{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
```
`variable.scss` 在`vue.config.js` 中使用`sass-loader`的配置 进行了全局优先引入，在页面中直接使用：
```scss
<style scoped>
p {
  color: $active-color;
}
.text {
  @extend %one-line-text;
}
</style>
```
## 页面样式

1. 页面样式加上`scoped`，并在最外层添加当前页面的命名空间，避免全局污染
2. 命名空间最好根据页面的文件名转成下划线格式，`ClassList.vue => class="class-list"`，如：
```vue
<template>
  <!-- 最外层类名为文件名ClassList的 kebab-case 格式 -->
  <div class="class-list"> 
    <!-- ... -->
  </div>
</template>
<style scoped>
.class-list{ /*样式最外层添加类名*/
  /* ... */
}
</style>
```