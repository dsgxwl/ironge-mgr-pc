# ESLint
为了更好的统一项目代码规范，项目开启了`eslint`代码检查

## vscode配置

配置完成可以标红不符合`ESLint`规范的地方，每次保存可以自动修复部分规范
1. 首先安装`ESLint`插件
   ![ESLint插件](/eslint.jpg)
2. 安装并配置完成 `ESLint` 后，打开 VSCode 设置文件，添加如下配置
```json
  "files.autoSave": "off",
  // 配置 ESLint 检查的文件类型
  "eslint.validate": ["javascript", "javascriptreact", "vue", "html"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```
