import { Octokit } from '@octokit/rest'

export const octokit = new Octokit({
  auth: process.env.GH_PAT || process.env.GITHUB_TOKEN || undefined,
})

export async function listTreeRecursive(owner, repo, ref) {
  const { data } = await octokit.git.getTree({
    owner,
    repo,
    tree_sha: ref,
    recursive: 'true',
  })
  return data.tree
}

export async function getFileText(owner, repo, path, ref) {
  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref,
  })
  if (Array.isArray(data)) return null
  return Buffer.from(data.content, 'base64').toString('utf8')
}

export function rawFileUrl(owner, repo, ref, filePath) {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${encoded}`
}

export async function getRawFile(owner, repo, ref, filePath) {
  const res = await fetch(rawFileUrl(owner, repo, ref, filePath))
  if (!res.ok) return null
  return await res.text()
}

export function safeBlobUrl({ owner, repo, ref, path }) {
  const encoded = path.split('/').map(encodeURIComponent).join('/')
  return `https://github.com/${owner}/${repo}/blob/${ref}/${encoded}`
}
