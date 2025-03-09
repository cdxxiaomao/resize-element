import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ResizeElement",
  description: "拖拽元素尺寸大小的公共方法库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '更新日志', link: '/changelog' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cdxxiaomao/resize-element' }
    ]
  }
})
