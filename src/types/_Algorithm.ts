import _Post from './_Post'
import TIER_COLOR from '@/consts/TIER_COLOR'

export default interface _Algorithm extends _Post {
  site: string
  level: keyof typeof TIER_COLOR
  number: number
  code: string
}
