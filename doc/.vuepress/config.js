module.exports = ctx => ({
  title: '融e学运营平台',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  description: '中潮教育-融e学前端项目文档',
  theme: '@vuepress/theme-default',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/introduction' },
      {
        text: '接口',
        items: [
          { text: '微信小程序', link: '/interface/wxapi/' },
          { text: '网站', link: '/interface/web/' },
        ],
      },
      // { text: '', link: '' },
    ],
    sidebar: [
      {
        title: '基础',
        collapsable: false,
        sidebarDepth: 1,
        children: [
            ['/guide/introduction','项目介绍'],
            ['/guide/layout','页面结构'],
        ],
      },
      {
        title: 'Group 2',
        children: [
          /* ... */
        ],
        initialOpenGroupIndex: -1, // 可选的, 默认值是 0
      },
    ],
  },
})
