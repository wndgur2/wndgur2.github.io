import type CATEGORIES from '@/consts/CATEGORIES'

export interface IPost {
  [index: string]: number | string | string[] | undefined
  id: string
  category: (typeof CATEGORIES)[keyof typeof CATEGORIES]
  title: string
  content: string
  tags: string[]
  date_started: string
  github: string
  thumbnail?: string
  description?: string
  date_finished?: string
}

export interface IAlgorithm extends IPost {
  url: string
  code: string
}

export type PostTypes = IPost | IAlgorithm

export type PostSortAttributeTypes = 'date_started' | 'title'
