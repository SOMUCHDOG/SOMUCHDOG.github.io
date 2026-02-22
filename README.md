# SOMUCHDOG.github.io

Personal blog and portfolio site built with VitePress.

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run local dev server:

   ```bash
   npm run docs:dev
   ```

3. Build static site:

   ```bash
   npm run docs:build
   ```

4. Preview production build:

   ```bash
   npm run docs:preview
   ```

## GitHub Projects Feed

Set your GitHub username in `/.vitepress/config.mts`:

```ts
themeConfig: {
  githubUsername: 'SOMUCHDOG'
}
```

The portfolio page will then auto-load your recent public repositories.

## Content Structure

- `index.md`: Homepage
- `about.md`: About page
- `portfolio/`: Portfolio overview + case studies
- `blog/`: Blog index + posts
- `.vitepress/`: Site config and theme customization
