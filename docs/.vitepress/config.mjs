import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'zxwdb',
  description: 'Visual Database Designer for MySQL/MariaDB - Modern, Fast, and Intuitive',
  lang: 'en-US',
  
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'google-site-verification', content: 'VV1ThTp6jU9h20vgN8FjjJkbG-Z-agU_n1u2NwQyBP0' }],
    // Google Analytics
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-N9K6DKLRYX' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N9K6DKLRYX');
    `],
    ['meta', { name: 'theme-color', content: '#4ec9b0' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'zxwdb Documentation' }],
    ['meta', { name: 'og:image', content: 'https://zxwdb.fiqihbadrian.my.id/og-image.png' }],
    ['meta', { name: 'og:url', content: 'https://zxwdb.fiqihbadrian.my.id' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://zxwdb.fiqihbadrian.my.id/og-image.png' }],
    ['meta', { name: 'keywords', content: 'mysql, mariadb, database designer, visual database, erd, entity relationship diagram, database tool, mysql workbench alternative' }],
    ['meta', { name: 'author', content: 'Fiqih Badrian' }],
    ['link', { rel: 'canonical', href: 'https://zxwdb.fiqihbadrian.my.id' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Features', link: '/features/visual-designer' },
      { text: 'API', link: '/api/cli' },
      { text: 'Examples', link: '/examples/basic-schema' },
      { 
        text: 'v1.0.12', 
        items: [
          { text: 'Changelog', link: '/changelog' },
          { text: 'NPM Package', link: 'https://www.npmjs.com/package/@fiqihbadrian/zxwdb' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is zxwdb?', link: '/guide/what-is-zxwdb' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Theme System', link: '/guide/theme-system' },
            { text: 'Auto-Save', link: '/guide/auto-save' }
          ]
        }
      ],
      '/features/': [
        {
          text: 'Features',
          items: [
            { text: 'Visual Designer', link: '/features/visual-designer' },
            { text: 'Data Management', link: '/features/data-management' },
            { text: 'Relationships', link: '/features/relationships' },
            { text: 'SQL Editor', link: '/features/sql-editor' },
            { text: 'Keyboard Shortcuts', link: '/features/keyboard-shortcuts' },
            { text: 'Import/Export', link: '/features/import-export' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'CLI Commands', link: '/api/cli' },
            { text: 'REST API', link: '/api/rest-api' },
            { text: 'Configuration', link: '/api/configuration' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Schema', link: '/examples/basic-schema' },
            { text: 'E-Commerce', link: '/examples/e-commerce' },
            { text: 'Blog System', link: '/examples/blog-system' },
            { text: 'Advanced Features', link: '/examples/advanced-features' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fiqihbadrian/zxwdb' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@fiqihbadrian/zxwdb' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Fiqih Badrian'
    },

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search docs...',
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          },
          modal: {
            noResultsText: 'No results found',
            resetButtonTitle: 'Clear search',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/fiqihbadrian/zxwdb/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  },

  sitemap: {
    hostname: 'https://zxwdb.fiqihbadrian.my.id'
  },

  cleanUrls: true,
  
  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
