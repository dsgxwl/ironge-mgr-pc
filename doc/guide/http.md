# 请求

## axios封装
```bash
├── utils
│   ├── request.js                   # 封装axios
│   ├── codeMsg.js                   # 处理网络请求错误信息
```
::: tip 代码目录
@/utils/request.js
:::
```js
// 请求拦截器
instance.interceptors.request.use(
    config => {
        // ...
        // 请求前添加token等操作
        return config
    },
    // ...
)
// 响应拦截器
instance.interceptors.response.use(
    response => {
        // ...
        switch (~~code) {
            //根据后台约定的code 处理一些特殊错误
        }
        // ...
    },
    error => {
        // ...
        // 常规http错误处理
        this.errorHandler(error, codeMsg[status])
        // ...
    },
)
```
::: tip 代码目录
@/utils/codeMsg.js
:::
```js
// 常见http状态码 错误信息定义 在响应拦截器 中使用errorHandler抛出
export const codeMsg = {
  400: '请求错误',
  401: '未授权',
  403: '拒绝访问',
  404: '请求地址出错',
  406: '请求的格式不可得',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}
```


## api接口
```bash
├── api
│   ├── config                     # 接口地址配置
│   │   ├── class.js
│   ├── class.js                   # 请求方法配置
```
::: tip 代码目录
@/api
:::

`@/api/config`下用于存放模块接口地址，如：
```js
export default {
  // 班级列表
  getClassList: '/course/admin/classes/list',
}
```
`@/api`下用于存放模块请求方法，如：
```js
import config from './config/class' // 引入config下接口配置文件
import axios from '@/utils/request'
export const getClassList = params => axios.post(config.getClassList, params) // 班级列表
```

## 环境配置
```bash
├── .env.development    # 开发环境
├── .env.production     # 生产环境
├── .env.test           # 测试环境
```
`.env`文件存放了全局的环境变量，接口中的`baseURL`就是通过`VUE_APP_BASE_API`来根据不同环境声明的
1. 环境变量属性名必须以VUE_APP_开头
2. 代码中通过 `process.env.VUE_APP_XXX` 来访问对应环境变量
