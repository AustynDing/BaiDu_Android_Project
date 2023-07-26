export type newsType = 'normal' | 'advanced'
export type NormalNewsType = {
  title: string // 新闻标题
  top?: boolean // 是否置顶
  medium: string // 新闻媒体
  type: newsType // 新闻类型
  abstract: string // 摘要
  content: string // 内容
}
export type AdvancedNewsType = {
  hotSpot: boolean // 是否是热点
  imageUrl: string // 略缩图url
  commentNum?: number // 评论数-设置1-1000的随机默认值，因为没有实现评论的需求
} & NormalNewsType

export type NewsType = NormalNewsType | AdvancedNewsType 
export * from './AdvancedNewsItem'
export * from './NormalNewsItem'
export * from './data'
