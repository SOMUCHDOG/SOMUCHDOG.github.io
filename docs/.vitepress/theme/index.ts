import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import GitHubRepos from './components/GitHubRepos.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GitHubRepos', GitHubRepos)
  }
} satisfies Theme
