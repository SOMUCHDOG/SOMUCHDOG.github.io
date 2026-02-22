import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Casey Tech Notes',
  description: 'Portfolio and blog about technology, product thinking, and software craft.',
  lang: 'en-US',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    githubUsername: 'SOMUCHDOG',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Portfolio', link: '/portfolio/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'About', link: '/about' }
    ],
    sidebar: {
      '/portfolio/': [
        {
          text: 'Portfolio',
          items: [
            { text: 'Overview', link: '/portfolio/' },
            { text: 'Developer Tooling Dashboard', link: '/portfolio/dev-tooling-dashboard' },
            { text: 'Realtime Notes App', link: '/portfolio/realtime-notes-app' }
          ]
        }
      ],
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'All Posts', link: '/blog/' },
            { text: 'How I Scope Side Projects', link: '/blog/posts/how-i-scope-side-projects' },
            { text: 'Why Developer Experience Matters', link: '/blog/posts/why-dx-matters' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/SOMUCHDOG' }
    ],
    footer: {
      message: 'Built with VitePress.',
      copyright: 'Copyright © 2026 Casey'
    }
  }
})
