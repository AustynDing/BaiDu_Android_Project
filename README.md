
# Final Project

## 准备工作

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1: Start the Metro Server
```bash
# using npm
npm start
# OR using Yarn
yarn start
```
### Step 2: Start your Application
```bash
# using npm
npm run android
# OR using Yarn
yarn android
```

## 功能介绍

### 天气页`WeatherPage`

- 主页面的天气框和天气页使用了统一的假数据`weatherData`
- 完成了横向滑动的每小时天气预报
- 实现了反映空气质量指数的动态线形条，可以修改`weatherData`中的数据来测试
- 此处的`loading`效果迁移到了`newslist`新闻列表的渲染上

#### 改善点

- 使用天气预报的相关API动态的获取数据
- 根据白天/晚上+不同天气的排列组合，动态的给出天气的背景图和改变`Container` 的背景颜色

### 新闻添加页`NewsAddPage`

- 使用`useContext`和`uesReducer`完成了对表格数据的整体管理
- 实现了对空数据的检查和`Toast`的提示
- 实现了数据的持久化，和主页面的`NewsList`使用了同一数据表
- 实现了图片的上传和删除

#### 改善点
- 对`form`的处理不够抽象，无法抽象出一个`Form`组件进行统一的管理
- 对数据输入的限制可以增强，例如对特殊符号、特殊字段、字数等进行限制
- 对业务的处理不够完善，新闻列表中应该有多种新闻「有略缩图和无略缩图的」+「置顶/热点/普通」。事实上需要更加运营情况+流量反映+舆情处理等多方面对新闻进行排序、展示，而不是通过普通的选择进行


### 主页面`HomePage`

- 实现了搜索框的吸顶效果 **（需要人为添加多篇新闻后才可以实现）**
- 实现了首屏渲染时的骨架屏页面展示（需要人为添加多篇新闻后，重新加载后可以看到效果）
- 实现了`NewsList`和`NewsDetailPage`的数据持久化-新闻详情页中可以展示出新闻列表的具体信息，是统一的
  
#### 改善点
- 对列表的数据处理没有进行分页请求，会导致一次性请求数据过多，耗时过长
- 对列表可以进行虚拟滚动渲染，防止数据渲染过多造成卡顿现象
  
### 新闻详情页`NewsDetailPage`
- 实现了长新闻浏览时的吸顶效果 **（因此在新闻添加的时候需要使用长文本进行添加）**
- 实现了摘要内容的展示

### 短视频预览页`VideoPreviewPage`
- 实现了搜索框的吸顶效果
- 实现了点赞、关注的icon的变化

#### 改善点
- 和新闻列表页的改善点一致
- 实现数据持久化，和短视频播放页的顺序一致
- 实现滚动时的按需加载 + 下拉刷新

### 短视频播放页`VideoPlayPage`
- 实现了视频加载的提示
- 实现了短视频的全屏播放
- 实现了流畅的滚动播放功能（刷过的视频会被强制暂停）
- 实现了收藏icon的变化
- 实现了顶部和底部蒙层的效果

#### 改善点
- 信息流的持久化（例如收藏、评论）
- 业务上的链路完善（上传视频 - 浏览视频 - 收藏/评论/分享视频 - 受到启发继续上传）

### 搜索页`SearchInputPage`
- 实现了历史搜索的记录（上限展示9个） **（需要在顶部搜索框而非百度页面内的搜索框进行搜索）**
- 实现了页面的前进后退功能 **（需要在顶部搜索框而非百度页面内的搜索框进行搜索）**
- 实现了搜索框内容和前进后退同步的功能 **（需要在顶部搜索框而非百度页面内的搜索框进行搜索）**
- 实现了回退主页的功能


### 个人页`ProfilePage`

- 实现了个人信息的持久化（此处初始化了个人信息）
- 可以修改头像和昵称

#### 改善点
- 通过完善注册、登录功能对头像和用户名和昵称进行初始化

## 依赖
```json
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.19.1",  // 用于实现搜索历史记录的缓存
    "@react-navigation/bottom-tabs": "^6.5.8", // 用于实现导航功能
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "@rneui/base": "^4.0.0-rc.7", // 使用一些基本的ui组件
    "@rneui/themed": "^4.0.0-rc.7",
    "ali-oss": "^6.17.1", // 使用阿里云oss存储，保存图片资源
    "expo": "^49.0.3",
    "prettier": "^3.0.0", // 代码的规范化
    "react": "18.2.0",
    "react-native": "0.72.3",
    "react-native-image-picker": "^5.6.0", // 用于图片的选择
    "react-native-linear-gradient": "^2.7.3", // 用于蒙层的实现
    "react-native-safe-area-context": "^4.7.1",
    "react-native-screens": "^3.22.1",
    "react-native-sqlite-storage": "^6.0.1", // 提供更为强大的数据持久化功能
    "react-native-vector-icons": "^10.0.0", // 基本的icon库
    "react-native-video": "^5.2.1", // 用于视频流的实现
    "react-native-webview": "^13.3.0", // 实现网络页面的跳转和交互
    "uuid": "^9.0.0"
  },
```
