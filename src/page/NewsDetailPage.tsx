import {
  View,
  Text,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native'
import { HeaderTab } from '../components/HeaderTab'
import { Avatar } from '@rneui/themed'
import { Image } from '@rneui/base'
import React from 'react'

const data = {
  title: 'VR内容从何而来？别忽视了地图全景这座富矿',
  abstract: '简要介绍新闻摘要',
  content: `预计“卡努”将以每小时15公里左右的速度向北偏西方向移动，强度逐渐增强。“卡努”的名字来自泰国气象部门，意思是热带水果菠萝蜜。
    “卡努”与“杜苏芮”之间是否会有相互影响？对此，中央气象台台风与海洋气象预报中心高级工程师聂高臻表示，目前从两者距离及路径上看，可能不会出现明显的双台风互旋作用，但“卡努”北侧的偏东风未来可能会为“杜苏芮”减弱后的低压环流提供充沛水汽，有助于“杜苏芮”残余环流的维持和陆地上降水的增加。
    预计“卡努”将以每小时15公里左右的速度向北偏西方向移动，强度逐渐增强。“卡努”的名字来自泰国气象部门，意思是热带水果菠萝蜜。
“卡努”与“杜苏芮”之间是否会有相互影响？对此，中央气象台台风与海洋气象预报中心高级工程师聂高臻表示，目前从两者距离及路径上看，可能不会出现明显的双台风互旋作用，但“卡努”北侧的偏东风未来可能会为“杜苏芮”减弱后的低压环流提供充沛水汽，有助于“杜苏芮”残余环流的维持和陆地上降水的增加。
预计“卡努”将以每小时15公里左右的速度向北偏西方向移动，强度逐渐增强。“卡努”的名字来自泰国气象部门，意思是热带水果菠萝蜜。
“卡努”与“杜苏芮”之间是否会有相互影响？对此，中央气象台台风与海洋气象预报中心高级工程师聂高臻表示，目前从两者距离及路径上看，可能不会出现明显的双台风互旋作用，但“卡努”北侧的偏东风未来可能会为“杜苏芮”减弱后的低压环流提供充沛水汽，有助于“杜苏芮”残余环流的维持和陆地上降水的增加。
    `,
  medium: '北京日报客户端',
  followed: 3400,
  type: '百家号',
  imageUrl: '../asset/weather_windy_bg.jpg',
}

export function NewsDetailPage() {
  const targetRef = React.useRef<View | null>(null)
  const [show, setShow] = React.useState(false)
  const [scrollViewY, setScrollViewY] = React.useState(0) // 滚动容器的顶端距离屏幕的距离
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // pageY:距离屏幕顶部的y轴距离（因此可以为负数） height：组件自身的高度
      const viewBottom = pageY + height // 组件底部距离屏幕的垂直距离
      // Check if the view's bottom is within the container's visible area
      if (viewBottom <= scrollViewY) {
        // 在滚动容器之外 -- 不可见
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setScrollViewY(event.nativeEvent.layout.y)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HeaderTab>{show && <AuthorBar />}</HeaderTab>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 10 }}
        onScroll={handleScroll}
        onLayout={handleLayout}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          {data.title}
        </Text>
        <AuthorBar ref={targetRef} />
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>{data.content}</Text>
          <Image
            style={{ width: '100%', aspectRatio: 16 / 9 }}
            source={require('../asset/weather_windy_bg.jpg')}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </View>
  )
}

const AuthorBar = React.forwardRef<View, any>((props, ref) => {
  return (
    <View
      ref={ref}
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
      }}
      onLayout={() => {}} // 必须要有定义，measure中的参数才会有值
    >
      <Avatar source={require('../asset/avatar.jpg')} rounded size={40} />
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.medium}</Text>
        <Text style={{ color: '#999999', fontSize: 14 }}>
          {data.type} {data.followed} 关注
        </Text>
      </View>
    </View>
  )
})
