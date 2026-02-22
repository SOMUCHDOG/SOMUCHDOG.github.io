# SOMUCHDOG.github.io Replatform

## Executive Summary

I replaced a legacy static/Jekyll-style personal website with a VitePress-based portfolio and blog, then set up automated GitHub Pages deployment via GitHub Actions.

The replatform had three goals:

1. Move to a content-first workflow where writing and project updates are fast.
2. Improve site maintainability by consolidating build tooling.
3. Ensure deployments are deterministic and repeatable from `main`.

## Context and Constraints

### Starting Point

The repository contained an older, template-based site with many static HTML pages, legacy assets, and front-end build remnants. It also had GitHub Pages behavior that could fall back to Jekyll rendering.

### Constraints

- Domain and hosting remained on `SOMUCHDOG.github.io` (GitHub Pages).
- Migration needed to avoid long downtime.
- The new site had to support both portfolio case studies and blog posts.
- Existing repository state included legacy files that could conflict with Pages behavior.

## Architecture Decisions

### Why VitePress

- Markdown-native authoring for fast content updates.
- Built-in documentation-style navigation and sidebar primitives.
- Simple, low-maintenance static output suitable for Pages.
- Theme customization without introducing a full custom app framework.

### Content Structure

I standardized on:

- `index.md`: home
- `about.md`: personal background
- `portfolio/`: project case studies
- `blog/`: posts
- `.vitepress/`: config, theme, and custom components
- `public/`: static assets (logo)

This gives a predictable model where every new case study is one markdown file and optional assets.

### Deployment Model

I chose GitHub Actions Pages deployment over branch-based static publishing:

- Build is defined in code (`.github/workflows/deploy.yml`).
- Artifact is generated from `npm ci` + `npm run docs:build`.
- Deployment target is controlled by workflow permissions and Pages environment.
- This avoids ambiguity around Jekyll/branch auto-processing.

## Implementation Walkthrough

### 1. Scaffolding and Theming

I created a VitePress site with:

- Custom nav and sidebars in `.vitepress/config.mts`
- Home hero + feature blocks
- Portfolio and blog sections
- Theme overrides in `.vitepress/theme/custom.css`

A key improvement was making theme colors mode-aware (light/dark) with CSS variables instead of hardcoded light-only backgrounds.

### 2. Portfolio Enhancement: GitHub Repo Feed

I added a Vue component (`.vitepress/theme/components/GitHubRepos.vue`) that:

- Reads `themeConfig.githubUsername`
- Fetches public repos from GitHub API on mount
- Filters forks
- Sorts by `updated_at`
- Renders recent repos as cards

This keeps portfolio content partially self-updating while preserving curated case studies above it.

### 3. Repository Transition to Primary Site

To make VitePress the primary website, I migrated from `docs/` to repository root and updated build paths:

- Scripts changed to `vitepress dev .`, `vitepress build .`, `vitepress preview .`
- Deploy artifact changed to `.vitepress/dist`
- Ignore rules updated for root cache/dist directories

Legacy static files were removed from tracking so `main` clearly represents a single source of truth.

### 4. GitHub Pages Workflow

I implemented `.github/workflows/deploy.yml` with two jobs:

- `build`: checkout, setup Node 20, install with `npm ci`, build VitePress, upload Pages artifact
- `deploy`: deploy artifact to Pages environment

This made deployments reproducible and tied to repository history.

## Debugging and Production Issues

### Issue 1: Wrong Repository Context

Initially, local git commands were affected by a parent repository context. To avoid accidental pushes, I initialized and targeted a dedicated repo in the project directory and explicitly pushed to:

- `https://github.com/SOMUCHDOG/SOMUCHDOG.github.io`

### Issue 2: Non-fast-forward Push

Remote `main` already had commits, so I rebased local work onto `origin/main`, resolved conflicts, then pushed.

### Issue 3: Live Site Did Not Match Local VitePress

The deployed site looked like markdown rendered by Jekyll (not VitePress).

Root cause:

- GitHub Pages source was still effectively branch/Jekyll based, not workflow artifact based.

Resolution:

- Confirmed/required Pages source to be GitHub Actions.
- Re-ran deployment workflow.
- Verified generated output now reflects VitePress layout.

### Issue 4: URL Compatibility

`cleanUrls: true` can create route edge cases on Pages. I set:

- `cleanUrls: false`

This improved direct-load behavior for generated pages.

## Quality and Verification

Validation performed during migration:

- Built site locally after structural moves (`npm run docs:build`).
- Confirmed artifact generation under `.vitepress/dist`.
- Verified workflow triggers on `main` push.
- Confirmed deployed output source by inspecting live HTML.

## Results

### Technical Outcomes

- Single modern static-site pipeline using VitePress.
- Automated CI/CD deployment to Pages.
- Reduced maintenance burden from legacy assets and templates.
- Improved clarity of repository purpose and structure.

### Content Outcomes

- Faster publishing loop for blog posts and case studies.
- Stronger project storytelling through dedicated markdown pages.
- Dynamic repository visibility via GitHub API integration.

## Tradeoffs and Future Improvements

### Current Tradeoffs

- GitHub API rate limits can affect anonymous repo-feed requests.
- Dynamic client-side fetch means repo cards load after initial page render.

### Next Iterations

1. Add selective pinning or weighting for flagship repos.
2. Add tags and taxonomy for portfolio case studies.
3. Add structured metadata for posts/projects (date, role, impact, stack).
4. Add visual regression checks for theme changes.
5. Add custom domain and SEO/social preview metadata.

## Key Lessons

- Replatforming is as much about deployment source-of-truth as framework choice.
- For GitHub Pages, explicit workflow-based deploys are more reliable than implicit branch/Jekyll behavior when using modern static generators.
- Cleaning repository history and structure pays off immediately in maintainability.
