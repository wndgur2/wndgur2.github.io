import { sortedInsert } from '@/utils/sortedInsert'
import CATEGORIES from '@/consts/CATEGORIES'
import _Post from '@/types/_Post'

const BASE_URL = 'https://raw.githubusercontent.com/wndgur2/BlogDB/main/'
const BLOG_URL = 'https://wndgur2.github.io/BlogDB/tree/main/'

export const getPosts = async (
  setPosts: React.Dispatch<React.SetStateAction<_Post[]>>
): Promise<void> => {
  getPostUrls()
    .then((urls) => {
      urls.forEach(async (url: string) => {
        if (!url) return
        getPost(url).then((post) => {
          setPosts((prevPosts) => sortedInsert(prevPosts, post as _Post))
        })
      })
    })
    .catch((err) => console.log(err))
}

const getPost = async (url: string) => {
  if (!url) return null
  try {
    const response = await fetch(BASE_URL + url)
    const data = await response.text()
    return await parsePost(data, url)
  } catch (err) {
    console.error(err)
  }
}

const parsePost = async (data: string, url: string): Promise<_Post | null> => {
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
  if (!header) return null

  const headerData = header[1].split('\n')
  headerData.forEach((line: string) => {
    let [key, value] = line.split(': ')
    if (key && value)
      switch (key) {
        case 'tags':
          post.tags = value.replaceAll('"', '').replaceAll("'", '').split(', ').sort()
          break
        case 'date_started':
          let dates = value.split('.')
          dates = dates.map((date) => (date.length === 1 ? `0${date}` : date))
          value = dates.join('.')
          post.date_started = value
          break
        default:
          post[key] = value
          break
      }
  })

  const content = data.match(/---\n[\s\S]+?\n---\n([\s\S]*)/)
  if (content) post.content = content[1]

  post.github = BLOG_URL + url

  if (post.category.toLowerCase() !== CATEGORIES.ALGORITHM) return post

  // Get code
  const codePath = url.split('/')
  codePath.pop()

  // Set language based on tags
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
    if (post.site === 'SWEA') filename = 'Solution'
    else if (post.site === 'BOJ' || post.site === '백준') filename = 'Main'
  }

  codePath.push(`${filename}.${post.language}`)

  const codeURL = BASE_URL + codePath.join('/')
  post.code = await getCode(codeURL)
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

const getPostUrls = async () => {
  try {
    const response = await fetch(BASE_URL + '/scripts/urls.json')
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getProjects = async (
  setPosts: React.Dispatch<React.SetStateAction<_Post[]>>
): Promise<void> => {
  try {
    // 프로젝트 메타데이터 불러오기
    const response = await fetch('/meta/projects.json')
    const data = await response.json()

    // Convert the metadata into posts
    const projects: _Post[] = Object.values(data)

    // Process each post
    projects.map(async (project) => {
      // Load content from the project's README
      try {
        const text = await fetchRawData(
          `https://raw.githubusercontent.com/wndgur2/${project.title}/main/README.md`
        )

        project.content =
          text === '' || text.startsWith('<!DOCTYPE html>')
            ? 'This project is not available.'
            : text

        // Assign ID and construct thumbnail
        project.id = project.title

        const img = new Image()
        img.src = `/images/${project.title.toLowerCase()}.jpeg`

        project.thumbnail = `<img src="${img.src}" alt="${project.title}" />`

        setPosts((prevPosts) => sortedInsert(prevPosts, project))
      } catch (error) {
        console.error('Error fetching project content:', error)
        return null
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

async function fetchRawData(url: string) {
  try {
    let response = await fetch(url)
    const text = await response.text()
    return text
  } catch {
    console.error('Failed to load markdown')
    return ''
  }
}
