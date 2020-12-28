<!--
 * @Description: 
 * @Author: xiawenlong
 * @Date: 2020-12-22 15:51:47
 * @LastEditors: xiawenlong
 * @LastEditTime: 2020-12-23 08:35:47
-->

# 布局
## layout
```bash
├── layout                         # 项目主要代码
│   ├── components                 # 布局相关组件
│   │   ├── BreadCrumb             # 面包屑
│   │   ├── CollegeSelect          # 切换学院
│   │   ├── FullScreen             # 全屏
│   │   ├── Header                 # 公共头部
│   │   ├── PageMain               # 主要内容页
│   │   ├── ScrollPane             # 菜单滚动插件
│   │   ├── SideCollapse           # 左侧菜单收展组件
│   │   ├── SideMenu               # 左侧菜单
│   │   ├── TagsView               # 多标签
│   │   ├── TopMenu                # 头部菜单
│   │   ├── UserDropdown           # 头部用户菜单
│   ├── layout                     # 项目主要代码
│   ├── index.vue                  # 布局入口页面
```
::: tip 代码目录
@/layout
:::
项目页面布局可以分为
1. 常规页面，含`layout`部分
2. 独立页面，不包含公共部分，如登录、注册页等

`layout`主要由三大部分组成 `Header(头部)` `SideMenu(左侧菜单)` `PageMain(右侧内容页)`

如果有增加或修改layout相关组件 统一存放在`@/layout/components`
