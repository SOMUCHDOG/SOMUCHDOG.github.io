<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string | null
  fork: boolean
  updated_at: string
}

const { theme } = useData()

const loading = ref(true)
const error = ref('')
const repos = ref<Repo[]>([])

const username = computed(() => {
  const explicit = (theme.value as Record<string, unknown>).githubUsername

  if (typeof explicit === 'string' && explicit.trim()) {
    return explicit.trim()
  }

  const links = (theme.value as Record<string, unknown>).socialLinks

  if (Array.isArray(links)) {
    const githubLink = links.find((item) => {
      if (!item || typeof item !== 'object') {
        return false
      }

      const link = (item as Record<string, unknown>).link
      return typeof link === 'string' && link.includes('github.com/')
    }) as Record<string, unknown> | undefined

    const rawLink = githubLink?.link
    if (typeof rawLink === 'string') {
      const match = rawLink.match(/github\.com\/([^/?#]+)/)
      if (match?.[1]) {
        return match[1]
      }
    }
  }

  return ''
})

const visibleRepos = computed(() => repos.value.filter((repo) => !repo.fork).slice(0, 12))

onMounted(async () => {
  if (!username.value) {
    error.value = 'GitHub username is not configured yet.'
    loading.value = false
    return
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username.value}/repos?per_page=100&sort=updated`)

    if (!response.ok) {
      throw new Error(`GitHub request failed (${response.status})`)
    }

    const data = (await response.json()) as Repo[]
    repos.value = data.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
  } catch {
    error.value = 'Unable to load repositories right now.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h2>Public GitHub Projects</h2>
    <p v-if="username">
      Showing recent public repositories from
      <a :href="`https://github.com/${username}`" target="_blank" rel="noreferrer">@{{ username }}</a>.
    </p>

    <p v-if="loading">Loading repositories...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="visibleRepos.length === 0">No public repositories found.</p>

    <div v-else class="repo-grid">
      <article v-for="repo in visibleRepos" :key="repo.id" class="repo-card">
        <h3>
          <a :href="repo.html_url" target="_blank" rel="noreferrer">{{ repo.name }}</a>
        </h3>
        <p>{{ repo.description || 'No description provided.' }}</p>
        <div class="repo-meta">
          <span v-if="repo.language">{{ repo.language }}</span>
          <span>★ {{ repo.stargazers_count }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
