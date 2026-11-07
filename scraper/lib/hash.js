import crypto from 'crypto'

export function generateContentId(obj) {
  const json = JSON.stringify(obj)
  return crypto.createHash('sha256').update(json).digest('hex')
}

/**
 * slug는 글을 수정해도 바뀌지 않는 URL용 id로 사용한다.
 * legacy_id는 내용 해시 기반이던 기존 URL을 새 URL로 넘겨주기 위해 유지한다.
 */
export function getPostWithId({ slug, ...post }) {
  return {
    id: slug,
    legacy_id: generateContentId(post),
    ...post,
  }
}
