
module.exports = ctx => ({
  title: 'ironge-mgr-pc',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: '中潮教育-融e学前端项目文档',
  theme: '@vuepress/theme-default',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/introduction' },
      {
        text: '相关资源',
        items: [
          { text: '产品原型图', link: 'https://app.mockplus.cn/s/NbNK3-En0Tr' },
        ],
      },
    ],
    sidebar: [
      {
        title: '项目说明',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            ['/guide/introduction','项目介绍'],
            ['/guide/layout','布局'],
            ['/guide/http','请求'],
            ['/guide/router','路由'],
            ['/guide/style','样式'],
            ['/guide/store','vuex'],
            ['/guide/add','新增'],
            ['/guide/standard','风格规范'],
            ['/guide/ESLint','ESLint'],
        ],
      },
      {
        title: '组件说明',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            ['/components/TableList','TableList'],
            ['/components/more','more...'],
        ],
      },
      {
        title: '其他',
        children: [
            ['/other/vscode','vscode插件'],
        ],
      },
    ],
  },
})
