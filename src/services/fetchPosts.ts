import { sortedInsert } from '@/utils/sortedInsert'
import CATEGORIES from '../consts/CATEGORIES'
import { _Post } from '../types/_Post'
import fetchPostUrls from './fetchPostsUrls'

const fetchPosts = async (
  setPosts: React.Dispatch<React.SetStateAction<_Post[]>>
): Promise<void> => {
  let urls = await fetchPostUrls()

  if (Object.prototype.toString.call(urls) === '[object Object]') urls = urls.urls

  urls.pop()

  urls.forEach(async (url: string) => {
    try {
      const post = await fetchPost(url)
      if (!post) return
      setPosts((prevPosts) => sortedInsert(prevPosts, post))
    } catch (err) {
      console.error(err)
      return null
    }
  })
}

const fetchPost = async (url: string) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/wndgur2/BlogDB/main/' + url)
    const data = await response.text()
    return await getPost(data, url)
  } catch (err) {
    console.error(err)
  }
}

const getPost = async (data: string, url: string): Promise<_Post | null> => {
  const post: _Post = {
    id: url,
    category: CATEGORIES.OTHER,
    title: 'No title found.',
    content: 'No content found.',
    tags: [],
    date_started: 'No date found.',
    github: 'https://github.com/wndgur2',
    preview: 'No preview found.',
  }

  const header = data.match(/---\n([\s\S]+?)\n---/)
  if (header) {
    const headerData = header[1].split('\n')
    headerData.forEach((line: string) => {
      let [key, value] = line.split(': ')
      if (key === 'category') value = value.toLowerCase()
      if (key && value)
        switch (key) {
          case 'category':
            post.category = value.toLowerCase() as CATEGORIES
            break
          case 'title':
            post.title = value
            break
          case 'tags':
            post.tags = value.replaceAll('"', '').replaceAll("'", '').split(', ').sort()
            break
          case 'date_started':
            let dates = value.split('.')
            dates = dates.map((date) => (date.length === 1 ? '0' + date : date))
            value = dates.join('.')
            post.date_started = value
            break
          case 'preview':
            post.preview = value
            break
          default:
            post[key] = value
            break
        }
    })
  } else {
    return null
  }

  const content = data.match(/---\n[\s\S]+?\n---\n([\s\S]*)/)
  if (content) post.content = content[1]

  post.github = 'https://github.com/wndgur2/BlogDB/tree/main/' + url

  if (post.category !== CATEGORIES.ALGORITHM) return post

  const codePath = url.split('/')
  codePath.pop()
  post.tags.forEach((tag: string) => {
    switch (tag.toLowerCase()) {
      case 'c++':
        post.language = 'cpp'
        break
      case 'java':
        post.language = 'java'
        break
      case 'python':
        post.language = 'py'
        break
      case 'javascript':
        post.language = 'js'
        break
      case 'c':
        post.language = 'c'
        break
      default:
        break
    }
  })
  if (!post.language) return post

  let filename = codePath[codePath.length - 1].replaceAll(' ', '')
  if (post.language === 'java') {
    if (post.site === 'SWEA') {
      filename = 'Solution'
    } else if (post.site === 'BOJ' || post.site === '백준') {
      filename = 'Main'
    }
  }
  codePath.push(filename + '.' + post.language)

  post.code = await getCode(
    'https://raw.githubusercontent.com/wndgur2/BlogDB/main/' + codePath.join('/')
  )
  return post
}

const getCode = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url)
    return await response.text()
  } catch (err) {
    console.error(err)
    return ''
  }
}

export default fetchPosts
