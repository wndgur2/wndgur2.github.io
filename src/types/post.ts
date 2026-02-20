import TIER_COLOR from '@/consts/TIER_COLOR'

export interface IPost {
  [index: string]: number | string | string[] | undefined
  id: string
  category: TCategory
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
  site: string
  level: keyof typeof TIER_COLOR
  number: number
  code: string
}

export interface ITag {
  label: string
  count: number
}

export const CATEGORIES = {
  PROJECT: 'PROJECT',
  ALGORITHM: 'ALGORITHM',
  STUDY: 'STUDY',
  LIFE: 'LIFE',
  OTHER: 'OTHER',
} as const

export type TCategory = keyof typeof CATEGORIES
