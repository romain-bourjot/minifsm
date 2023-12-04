import * as fs from 'fs'
import * as path from 'path'
import {defineConfig} from 'vitepress'

const navJSONPath = path.resolve('./vitepress/typedoc/typedoc-sidebar.json')
const navJSONContent = fs.existsSync(navJSONPath) ? fs.readFileSync(navJSONPath, 'utf8') : '{}'
const navContent = JSON.parse(navJSONContent)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MiniFSM",
  description: "Empowering Stateful Efficiency",
  appearance: false,
  base: '/minifsm/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Examples', link: '/markdown-examples'}
    ],

    sidebar: {
      '/typedoc/': navContent
    },
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       {text: 'Markdown Examples', link: '/markdown-examples'},
    //       {text: 'Runtime API Examples', link: '/api-examples'}
    //     ]
    //   }
    // ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
    ]
  }
})
