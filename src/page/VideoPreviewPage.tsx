import { Avatar, Icon } from '@rneui/base'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SearchBar } from '../components/SearchBar'
import { VideoItemType, data } from '../components/Vedio'
import { usePageNavigation } from '../hooks/usePageNavigation'
import { formatDuration } from '../utils/formatDuration'

export function VideoPreviewPage() {
  const renderItem = ({ item } : {item: VideoItemType}) => <VideoPreviewItem {...item} />

  return (
    <View style={{ flex: 1 }}>
      <SearchBar />
      <FlatList 
      showsVerticalScrollIndicator={false}
      data={data} 
      renderItem={renderItem} />
    </View>
  )
}

function VideoPreviewItem(props: VideoItemType) {
  return (
    <View>
      <VideoPreviewContainer {...props} />
      <VideoPreviewBottomTab {...props} />
    </View>
  )
}

function VideoPreviewContainer(
  props: Pick<
    VideoItemType,
    'title' | 'videoViewNum' | 'videoImage' | 'videoDuration'
  >,
) {
  const { title, videoViewNum, videoImage, videoDuration } = props //videoImage为备用的云图片url
  const { goToVideoPlayPage } = usePageNavigation()
  return (
    <View
      style={{
        width: '100%',
        height: 200,
        borderRadius: 20,
        position: 'relative',
        marginTop: 10,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          borderRadius: 20,
        }}
        resizeMode="cover"
        source={require('../asset/video_demo.png')}
      />
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 10,
        }}
      >
        <Text style={{ fontSize: 16, color: '#fff' }}>{title}</Text>
        <Text style={{ fontSize: 12, color: '#fff' }}>
          {videoViewNum}万次播放
        </Text>
      </View>
      <LinearGradient // 实现蒙层效果
        colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '40%',
          borderRadius: 20,
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 15,
          bottom: 10,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          height: 30,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 14 }}>
          {formatDuration(videoDuration)}
        </Text>
      </View>
      <TouchableOpacity // 代替view，触发点击事件
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
        onPress={goToVideoPlayPage}
        activeOpacity={1}
      >
        <Icon
          name="play"
          type="font-awesome"
          color="#fff"
          size={20}
        />
      </TouchableOpacity>
    </View>
  )
}

function VideoPreviewBottomTab(
  props: Pick<
    VideoItemType,
    | 'uploaderAvatar'
    | 'uploaderNickname'
    | 'commentNum'
    | 'isFollowed'
    | 'isLiked'
  >,
) {
  const { uploaderAvatar, uploaderNickname, commentNum, isFollowed, isLiked } =
    props
  const [follow, setFollow] = React.useState(isFollowed)
  const [like, setLike] = React.useState(isLiked)
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 45,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 10,
          width: 150,
        }}
      >
        <Avatar rounded source={require('../asset/avatar.jpg')} />
        <Text style={{ marginLeft: 10 }}>{uploaderNickname}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: 200,
        }}
      >
        <Icon
          name={follow ? 'plus-square-o' : 'plus-square'}
          type="font-awesome"
          size={18}
          style={{
            width: 20,
          }}
          onPress={() => setFollow(!follow)}
        />
        <Text style={{ lineHeight: 18, width: 60 }}>
          {follow ? '取消关注' : '已关注'}
        </Text>
        <Icon name="comment-o" type="font-awesome" size={18} />
        <Text style={{ lineHeight: 18 }}>{commentNum}</Text>
        <Icon
          name={like ? 'thumbs-o-up' : 'thumbs-up'}
          type="font-awesome"
          size={18}
          style={{
            width: 20,
          }}
          onPress={() => setLike(!like)}
        />
      </View>
    </View>
  )
}
