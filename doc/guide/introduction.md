
# 项目介绍

## 技术栈
ES6 + Vue + vue-router + vuex + axios + Element UI + sass

## 目录结构

```bash
├── doc                        # 项目文档
├── public                     # 静态资源
├── src                        # 项目主要代码
│   ├── api                    # 请求模块管理
│   ├── assets                 # 静态资源文件
│   ├── components             # 全局公用组件
│   ├── layout                 # 页面外层布局容器
│   ├── mixins                 # 全局混入模块
│   ├── plugins                # 全局插件
│   ├── router                 # 路由模块管理
│   ├── store                  # 全局状态管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 公用方法
│   ├── views                  # 项目主要页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件
├── .env.development           # 开发环境变量配置
├── .env.production            # 生产环境变量配置
├── .env.test                  # 测试环境变量配置
├── .eslintrc.js               # eslint配置
├── .gitignore.js              # git忽略文件配置
├── .babelrc.config.js         # babel-loader配置
├── package.json               # 项目依赖模块
├── prettier.config.js         # 代码格式化工具配置
└── vue.config.js              # vue-cli配置
```

## 安装
```bash
# 安装依赖
npm install

# npm安装速度慢或安装失败时使用
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run serve

# 测试环境 项目打包
npm run build:test

# 生产环境 项目打包
npm run build:pro

# 自动修复Eslint报错
npm run lint

# 项目文档
npm run doc
```
