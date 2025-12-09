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
    ['meta', { name: 'keywords', content: 'state machine, finite state machine, FSM, TypeScript, JavaScript, state management, library, XState alternative, lightweight FSM, type-safe state machine, immutable state machine' }],
    ['meta', { name: 'author', content: 'Romain Bourjot' }],
    ['meta', { property: 'og:title', content: 'MiniFSM - Lightweight TypeScript State Machine Library' }],
    ['meta', { property: 'og:description', content: 'A lightweight, type-safe TypeScript library for building finite state machines. Zero dependencies. XState alternative.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://romain-bourjot.github.io/minifsm/' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'MiniFSM - Lightweight TypeScript State Machine Library' }],
    ['meta', { name: 'twitter:description', content: 'A lightweight, type-safe TypeScript library for building finite state machines. Zero dependencies.' }],
    ['link', { rel: 'canonical', href: 'https://romain-bourjot.github.io/minifsm/' }]
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
