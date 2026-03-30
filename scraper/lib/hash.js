import crypto from 'crypto'

export function generateContentId(obj) {
  const json = JSON.stringify(obj)
  return crypto.createHash('sha256').update(json).digest('hex')
}

export function getPostWithId(post) {
  return {
    id: generateContentId(post),
    ...post,
  }
}
