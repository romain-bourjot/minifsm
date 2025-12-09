import * as fs from 'fs'
import * as path from 'path'
import {defineConfig} from 'vitepress'

const navJSONPath = path.resolve('./vitepress/typedoc/typedoc-sidebar.json')
const navJSONContent = fs.existsSync(navJSONPath) ? fs.readFileSync(navJSONPath, 'utf8') : '{}'
const navContent = JSON.parse(navJSONContent)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MiniFSM",
  description: "A lightweight, type-safe TypeScript library for building finite state machines",
  appearance: false,
  base: '/minifsm/',
  head: [
    ['meta', { name: 'keywords', content: 'state machine, finite state machine, FSM, TypeScript, JavaScript, state management, library' }],
    ['meta', { name: 'author', content: 'Romain Bourjot' }],
    ['meta', { property: 'og:title', content: 'MiniFSM - Type-Safe State Machines for TypeScript' }],
    ['meta', { property: 'og:description', content: 'A lightweight, type-safe TypeScript library for building finite state machines with zero dependencies' }],
    ['meta', { property: 'og:type', content: 'website' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Quick Start', link: '/quick-start'},
      {text: 'API Reference', link: '/typedoc/'}
    ],

    sidebar: {
      '/typedoc/': navContent,
      '/': [
        {
          text: 'Guide',
          items: [
            {text: 'Quick Start', link: '/quick-start'}
          ]
        },
        {
          text: 'Reference',
          items: [
            {text: 'API Reference', link: '/typedoc/'}
          ]
        }
      ]
    },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/romain-bourjot/minifsm'}
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Romain Bourjot'
    }
  }
})
