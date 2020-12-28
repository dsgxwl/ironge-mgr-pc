
# 风格规范

统一风格规范有利于多人项目的协作和维护，增加代码的可读性，避免小错误，但规范不是绝对的。

参考[Vue.js风格指南](https://cn.vuejs.org/v2/style-guide)

## component
所有的Component文件都采用PascalCase命名法，所有单词首字母全部大写，在DOM模板中采用kebab-case命名。

例子:
-  `@/components/TableList.vue` => `<table-list></table-list>`
-  `@/views/class/components/ClassAdd.vue` => `<class-add></class-add>`

## view
`views`下代表模块的文件夹名称尽量为一个单词，采用小写命名

例子:
-  `@/views/class`
-  `@/views/course`

`views`目录下除`index.vue`外所有页面的.vue文件，都采用PascalCase命名法

例子:
-  `@/views/class/ClassList.vue`
-  `@/views/course/CourseAdd.vue`

如果页面包含组件，则在模块下创建代表页面的文件夹 + `index.vue`文件，组件存放在页面文件夹目录下的`components`内，采用PascalCase命名法，以所属页面文件夹名开头

例子:
-  `@/views/class/ClassAdd/index.vue`
-  `@/views/class/ClassAdd/components/ClassAddCourse.vue`

## js
所有的js文件都采用kebab-case命名。

例子:
-  `@/utils/code-msg.js`
-  `@/store/action-types.js`

## props

1. prop 定义需要指定类型，设置默认值
2. prop 命名应该使用 camelCase ，而在模板中应该使用 kebab-case，如：

```js
props: {
  searchForm: {
    type: Array,
    default: () => [],
  },
}
```
```html
<table-list :search-form="exampleForm"></table-list>
```



## http调用
调用http请求的两种方式
```js
getData(){
  getClassList().then(res => {
    // 请求成功
  }, err => {
    // 请求失败
  })
}
```
```js
async getData(){
  try {
    await getClassList()
    // 请求成功
  } catch (error) {
    // 请求失败
  }
}
```