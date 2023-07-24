export interface VideoItemType {
  title: string
  videoImage: string
  videoViewNum: number //以万为单位
  videoDuration: number // 以秒为但会
  uploaderAvatar: string
  uploaderNickname: string
  commentNum: number
  star:number // 收藏
  isFollowed: boolean // 关注
  isLiked: boolean // 点赞
}

export const data: VideoItemType[] = [
  {
    title: '如何在家做美味披萨',
    videoImage: 'https://example.com/path/to/video1.jpg',
    videoViewNum: 1.5,
    videoDuration: 3600,
    uploaderAvatar: 'https://example.com/path/to/avatar1.jpg',
    uploaderNickname: 'FoodLover123',
    commentNum: 800,
    isFollowed: true,
    isLiked: false,
    star:2014,
  },
  {
    title: '旅行日记：探索神秘的亚马逊雨林',
    videoImage: 'https://example.com/path/to/video2.jpg',
    videoViewNum: 1.2,
    videoDuration: 180,
    uploaderAvatar: 'https://example.com/path/to/avatar2.jpg',
    uploaderNickname: 'AdventureSeeker',
    commentNum: 500,
    isFollowed: false,
    isLiked: true,
    star:2014,

  },
  {
    title: '如何快速学会弹奏吉他',
    videoImage: 'https://example.com/path/to/video3.jpg',
    videoViewNum: 1.8,
    videoDuration: 300,
    uploaderAvatar: 'https://example.com/path/to/avatar3.jpg',
    uploaderNickname: 'GuitarPro',
    commentNum: 1200,
    isFollowed: true,
    isLiked: true,
    star:2014,

  },
  {
    title: '美妆达人分享妆容技巧',
    videoImage: 'https://example.com/path/to/video4.jpg',
    videoViewNum: 1.1,
    videoDuration: 120,
    uploaderAvatar: 'https://example.com/path/to/avatar4.jpg',
    uploaderNickname: 'BeautyGuru',
    commentNum: 300,
    isFollowed: false,
    isLiked: false,
    star:2014,

  },
  {
    title: '早晨瑜伽：焕发一天的活力',
    videoImage: 'https://example.com/path/to/video5.jpg',
    videoViewNum: 1.6,
    videoDuration: 150,
    uploaderAvatar: 'https://example.com/path/to/avatar5.jpg',
    uploaderNickname: 'YogaLover',
    commentNum: 600,
    isFollowed: true,
    isLiked: true,
    star:2014,
  },
]
