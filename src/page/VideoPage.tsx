import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Avatar, Icon } from '@rneui/base'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SearchBar } from '../components/SearchBar'
import { VideoItemType, data } from '../components/Vedio'
import { useScreens } from '../hooks/useScreens'
import { formatDuration } from '../utils/formatDuration'
import { SearchInputPage } from './SeachInputPage'

const Stack = createNativeStackNavigator()
const screens = useScreens()

export function VideoPage() {
  return (
    <>
      <Stack.Navigator initialRouteName={screens.Vedio}>
        <Stack.Screen
          name={screens.Vedio}
          component={VideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.SearchInput}
          component={SearchInputPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}

export function VideoScreen() {
  const renderItem = ({ item }) => <VideoItem {...item} />

  return (
    <View style={{ flex: 1 }}>
      <SearchBar />
      <FlatList data={data} renderItem={renderItem} />
    </View>
  )
}

function VideoItem(props: VideoItemType) {
  return (
    <View>
      <VideoContainer {...props} />
      <VideoBottomTab {...props} />
    </View>
  )
}

function VideoContainer(
  props: Pick<
    VideoItemType,
    'title' | 'videoViewNum' | 'videoImage' | 'videoDuration'
  >,
) {
  const { title, videoViewNum, videoImage, videoDuration } = props //videoImage为备用的云图片url
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
    </View>
  )
}

function VideoBottomTab(
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
