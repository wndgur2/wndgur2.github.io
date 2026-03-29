function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required env: ${name}`)
  }
  return value
}

export const config = {
  github: {
    token: process.env.GH_PAT || process.env.GITHUB_TOKEN || null,
  },

  blog: {
    repo: required('BLOG_DB_REPO', 'wndgur2/BlogDB'),
    ref: process.env.BLOG_DB_REF ?? 'main',
    postsDir: process.env.POSTS_DIR ?? 'posts',
  },

  projects: {
    owner: process.env.PROJECTS_OWNER ?? 'wndgur2',
  },

  algorithms: {
    repo: required('ALGO_REPO', 'wndgur2/algorithm-problem-solves'),
    ref: process.env.ALGO_REF ?? 'main',
  },

  concurrency: {
    limit: Number(process.env.CONCURRENCY_LIMIT ?? 20),
  },
}
