import { Icon } from '@rneui/base'
import { Avatar, Dialog } from '@rneui/themed'
import React from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Video from 'react-native-video'
import { HeaderTab } from '../components/HeaderTab'
import { VideoItemType, data } from '../components/Vedio'

const ItemContext = React.createContext({})

export function VideoPlayPage({ navigation }) {
  const [currentItem, setCurrentItem] = React.useState(0)
  const screenHeight = Dimensions.get('window').height
  // 当用户滚动列表时，从不可见的列表项切换到可见的列表项时触发。
  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    // 可以理解为，只要不是当前再页面上的item 它的状态就应该暂停
    // 只有100%呈现再页面上的item（只会有一个）它的播放器是播放状态
    if (viewableItems.length === 1) {
      setCurrentItem(viewableItems[0].index)
    }
  })
  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 80, // item滑动80%部分才会到下一个
  })
  const renderItem = ({
    item,
    index,
  }: {
    item: VideoItemType
    index: number
  }) => <VideoPlayItem {...item} index={index} paused={index !== currentItem} />

  return (
    <FlatList
      data={data}
      pagingEnabled={true}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        Object.prototype.toString.call(item) + index
      }
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewConfigRef.current}
      getItemLayout={(data, index) => ({
        length: screenHeight,
        offset: screenHeight * index,
        index,
      })}
      // length（长度）：表示每个列表项的长度（高度）
      // offset（偏移量）：表示每个列表项的起始位置相对于列表的起始位置的偏移量
      // 预先知道每个列表项布局信息的方法，从而优化滚动性能，使得列表在滚动时更加平滑
    />
  )
}

VideoPlayPage.navigationOptions = {
  tabBarVisible: false,
}
const airColors = [
  '#73BB4D',
  '#EBB541',
  '#FC9B56',
  '#F17751',
  '#A94057',
  '#7B1F3C',
]
export function VideoPlayItem(
  props: VideoItemType & { index: number; paused: boolean },
) {
  const screenHeight = Dimensions.get('window').height
  const { uploaderAvatar, commentNum, title, star } = props

  const [visible, toggleDialog] = React.useState(false)
  const [paused, setPaused] = React.useState(props.paused)
  React.useEffect(() => {
    setPaused(props.paused)
  }, [props.paused])
  return (
    <ItemContext.Provider value={{ commentNum, uploaderAvatar, title, star }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          backgroundColor: airColors[props.index],
          height: screenHeight,
        }}
      >
        <HeaderTab arrowColor="#fff" />
        <Video
          resizeMode="cover"
          style={{
            flex: 1,
            position: 'relative',
          }}
          paused={paused}
          source={require('../asset/video.mp4')}
          onLoadStart={() => toggleDialog(true)}
          onLoad={() => toggleDialog(false)}
          onError={error => console.log('视频加载出错', error)}
          // onProgress={(data) => console.log('当前播放进度')}
        />
        {paused ? <StopIcon /> : null}
        <LinearGradient // 实现蒙层效果
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0)']}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5%',
          }}
        />
        <RightBar />
        <Dialog isVisible={visible}>
          <Dialog.Loading />
        </Dialog>
      </TouchableOpacity>
    </ItemContext.Provider>
  )
}
function StopIcon() {
  return (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -20 }, { translateY: -20 }], // 无法使用百分比，只能根据width和height调整
        backgroundColor: 'rgba(0,0,0,0.5)', // 通过透明度调整背景颜色
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
      }}
    >
      <Icon name="play" type="font-awesome" color="#fff" size={20} />
    </View>
  )
}

function RightBar() {
  const { title, commentNum, star, uploaderAvatar } =
    React.useContext(ItemContext)
  return (
    <View
      style={{
        height: 250,
        width: 50,
        backgroundColor: 'pink',
        position: 'absolute',
        right: 5,
        bottom: 30,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Avatar
          rounded
          source={require('../asset/avatar.jpg')}
          size={45}
          onPress={() => console.log('click')}
        />
      </View>
      <View>
        <Icon name="star" type="font-awesome" size={40} color="#fff" />
        <Text style={styles.RightBarText}>{star}</Text>
      </View>
      <View>
        <Icon name="comment-o" type="font-awesome" size={40} color="#fff" />
        <Text style={styles.RightBarText}>{commentNum}</Text>
      </View>
      <Icon name="share" type="font-awesome" size={40} color="#fff" />
      <Text style={styles.RightBarText}>分享</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  RightBarText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
})
