// import { sortedInsert } from '@/utils/sortedInsert'
// import CATEGORIES from '@/consts/CATEGORIES'
import { type IPost } from '@/types'

// const BASE_URL = 'https://raw.githubusercontent.com/wndgur2/BlogDB/main/'
// const GITHUB_URL = 'https://github.com/wndgur2/BlogDB/tree/main/'

export async function getPosts (setPosts: React.Dispatch<React.SetStateAction<IPost[]>>) {
  try {
    const res = await fetch('/meta/posts.json')
    const posts: IPost[] = await res.json()
    // If you want one-by-one inserts (keep your animation), otherwise just set once
    // posts.forEach((p) => {
    //   setPosts((prev) => sortedInsert(prev, p))
    // })
    setPosts(posts)
  } catch (e) {
    console.error('Failed to load posts.json', e)
  }
}

export async function getProjects (setPosts: React.Dispatch<React.SetStateAction<IPost[]>>) {
  try {
    const res = await fetch('/meta/projects.json')
    const projects: IPost[] = await res.json()
    // projects.forEach((project) => {
    //   // project.content already inlined at build
    //   setPosts((prev) => sortedInsert(prev, project))
    // })
    setPosts(projects)
  } catch (e) {
    console.error('Failed to load projects.json', e)
  }
}

// const getPost = async (url: string) => {
//   if (!url) return null
//   try {
//     const response = await fetch(BASE_URL + url)
//     const data = await response.text()
//     return await parsePost(data, url)
//   } catch (err) {
//     console.error(err)
//   }
// }

// const parsePost = async (data: string, url: string): Promise<IPost | null> => {
//   const post: IPost = {
//     id: url,
//     category: CATEGORIES.OTHER,
//     title: 'No title found.',
//     content: 'No content found.',
//     tags: [],
//     date_started: 'No date found.',
//     github: 'https://github.com/wndgur2',
//     preview: 'No preview found.',
//   }

//   const header = data.match(/---\n([\s\S]+?)\n---/)
//   if (!header) return null

//   const headerData = header[1].split('\n')
//   headerData.forEach((line: string) => {
//     const [key, value] = line.split(': ')
//     if (key && value)
//       switch (key) {
//         case 'tags':
//           post.tags = value.replaceAll('"', '').replaceAll("'", '').split(', ').sort()
//           break
//         case 'date_started':
//           const dates = value.split('.').map((date) => (date.length === 1 ? `0${date}` : date))
//           post.date_started = dates.join('.')
//           break
//         default:
//           post[key] = value
//           break
//       }
//   })

//   const content = data.match(/---\n[\s\S]+?\n---\n([\s\S]*)/)
//   if (content) post.content = content[1]

//   post.github = GITHUB_URL + url

//   return post
// }

// const getPostUrls = async () => {
//   try {
//     const response = await fetch(BASE_URL + '/scripts/urls.json')
//     const data = await response.json()
//     return data
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const getProjects = async (
//   setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
// ): Promise<void> => {
//   try {
//     // 프로젝트 메타데이터 불러오기
//     const response = await fetch('/meta/projects.json')
//     const data = await response.json()

//     // Convert the metadata into posts
//     const projects: IPost[] = Object.values(data)

//     // Process each post
//     projects.map(async (project) => {
//       // Load content from the project's README
//       try {
//         const text = await fetchRawData(
//           `https://raw.githubusercontent.com/wndgur2/${project.title}/main/README.md`
//         )

//         project.content =
//           text === '' || text.startsWith('<!DOCTYPE html>')
//             ? 'This project is not available.'
//             : text

//         // Assign ID and construct thumbnail
//         project.id = project.title

//         const img = new Image()
//         img.src = `/images/${project.title.toLowerCase()}.jpeg`

//         project.thumbnail = img.src

//         setPosts((prevPosts) => sortedInsert(prevPosts, project))
//       } catch (error) {
//         console.error('Error fetching project content:', error)
//         return null
//       }
//     })
//   } catch (error) {
//     console.error('Error fetching projects:', error)
//   }
// }

// async function fetchRawData (url: string) {
//   try {
//     const response = await fetch(url)
//     const text = await response.text()
//     return text
//   } catch {
//     console.error('Failed to load markdown')
//     return ''
//   }
// }
