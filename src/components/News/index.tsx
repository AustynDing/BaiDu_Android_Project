export type newsType = 'normal' | 'advanced'
export type NormalNewsType = {
  title: string
  top?: boolean
  medium: string
  newsUrl: string
  type: newsType
}
export type AdvancedNewsType = {
  hotSpot: boolean
  imageUrl: string
  commnetNum?: number
} & NormalNewsType

export * from './data'
export * from './NormalNewsItem'
export * from './AdvancedNewsItem'
