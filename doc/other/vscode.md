# VSCode插件
## koroFileHeader

一个读取用户自定义模板，通过快捷键添加文件头部注释、在光标处添加函数注释的VsCode插件
### 安装
![koroFileHeader](/vscode1.jpg)
安装并配置完成 `ESLint` 后，打开 VSCode 设置文件，添加如下配置
```json
  "fileheader.customMade": {
    "Description": "",
    "Author": "xiawenlong", // 这里改成你自己的名字
    "Date": "Do not edit",
    "LastEditors": "xiawenlong", // 这里改成你自己的名字
    "LastEditTime": "Do not edit",
  },
```
### 使用
1. 文件头部注释：
创建文件或保存文件可自动生成头部注释

快捷键：window：`ctrl+alt+i` mac：`ctrl+cmd+i`

2. 函数注释：
将光标放在函数行或者将光标放在函数上方的空白行使用快捷键生成

快捷键：window：`ctrl+alt+t` mac：`ctrl+cmd+t`

### 效果
![koroFileHeader](/vscode2.jpg)
<center>头部注释</center>

![koroFileHeader](/vscode3.jpg)
<center>函数注释</center>

## 其他
[30个极大提高开发效率的Visual Studio Code插件](https://zhuanlan.zhihu.com/p/40417719)