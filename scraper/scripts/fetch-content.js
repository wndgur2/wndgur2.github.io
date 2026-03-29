import 'dotenv/config'

import { fetchAlgorithms } from '../features/algorithms.js'
import { fetchPosts } from '../features/posts.js'
import { fetchProjects } from '../features/projects.js'
import { ensureDirs } from '../lib/fs.js'

async function main() {
  await ensureDirs()

  await Promise.all([fetchProjects(), fetchPosts(), fetchAlgorithms()])

  console.log('✅ Static content generated under public/meta')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
