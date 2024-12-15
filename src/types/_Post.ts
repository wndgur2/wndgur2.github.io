export default interface _Post {
  [index: string]: number | string | string[] | undefined
  id: string
  category: string
  title: string
  content: string
  tags: string[]
  date_started: string
  github: string
}
