import { FlatList, ScrollView, Text, View, Dimensions } from 'react-native'
import Video from 'react-native-video'
import { VideoItemType, data } from '../components/Vedio'
import React from 'react'
export function VideoPlayPage({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    })
  }, [])
  const renderItem = ({ item }: { item: VideoItemType }) => (
    <VideoPlayItem {...item} />
  )
  return (
    <FlatList
      data={data}
      pagingEnabled={true}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        Object.prototype.toString.call(item) + index
      }
    />
  )
}

VideoPlayPage.navigationOptions = {
  tabBarVisible: false,
}

export function VideoPlayItem(props: VideoItemType) {
  const screenHeight = Dimensions.get('window').height
  const { height } = Dimensions.get('screen')
  console.log(screenHeight, height)
  const { uploaderAvatar, commentNum, title } = props
  return (
    <View
      style={{
        height: screenHeight,
        backgroundColor: 'green',
      }}
    >
      <Text>{title}</Text>
      {/* <Video
      resizeMode='cover'
        style={{
          flex:1,
        }}
        controls={true}
        source={require('../asset/video.mp4')}
        onLoad={(data) => console.log('视频加载完成', data)}
        onError={(error) => console.log('视频加载出错', error)}
        // onProgress={(data) => console.log('当前播放进度')}
      /> */}
    </View>
  )
}
