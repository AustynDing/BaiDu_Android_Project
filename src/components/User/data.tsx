export interface UserType {
  avatarUrl: string
  nickname: string // 昵称，可修改
  username: string // 用户名，不可修改，唯一性
}

export const initUserData: UserType = {
  avatarUrl:
    'http://android-demo0.oss-cn-hangzhou.aliyuncs.com/2e00f1b210dda2bd9aa3fadeac7ef1f5.jpg?OSSAccessKeyId=LTAI5tD5kdnqnWeH7dtogvE5&Expires=1691584340&Signature=s3AT%2BAQg1cJOgG6UDwr22pjuVSM%3D',
  nickname: '小蓝鲸',
  username: '是只小蓝鲸呀',
}
