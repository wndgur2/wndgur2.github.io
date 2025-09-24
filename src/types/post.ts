import TIER_COLOR from '@/consts/TIER_COLOR'

export interface IPost {
  [index: string]: number | string | string[] | undefined
  id: string
  category: string
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
