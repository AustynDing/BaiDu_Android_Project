import { Avatar, Icon } from '@rneui/base'
import React from 'react'
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ForwardSearchBar } from '../components/SearchBar'
import { VideoItemType, data } from '../components/Vedio'
import { usePageNavigation } from '../hooks/usePageNavigation'
import { formatDuration } from '../utils/formatDuration'

export function VideoPreviewPage() {
  const renderItem = ({ item }: { item: VideoItemType }) => (
    <VideoPreviewItem {...item} />
  )

  return (
    <View style={styles.container}>
      {/* 搜索栏 */}
      <View style={{height:65}}>
      <ForwardSearchBar />
      </View>
      {/* 视频列表 */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}
function VideoPreviewItem(props: VideoItemType) {
  return (
    <View>
      {/* 视频预览容器 */}
      <VideoPreviewContainer {...props} />
      {/* 视频底部选项卡 */}
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
    <View style={styles.previewContainer}>
      {/* 视频封面图片 */}
      <Image
        style={styles.previewImage}
        resizeMode="cover"
        source={require('../asset/video_demo.png')}
      />
      {/* 视频标题和观看次数 */}
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.viewNumText}>{videoViewNum}万次播放</Text>
      </View>
      {/* 渐变蒙层 */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
        style={styles.linearGradient}
      />
      {/* 视频时长 */}
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{formatDuration(videoDuration)}</Text>
      </View>
      {/* 播放按钮 */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={goToVideoPlayPage}
        activeOpacity={1}
      >
        <Icon name="play" type="font-awesome" color="#fff" size={20} />
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
    <View style={styles.bottomTabContainer}>
      {/* 上传者头像和昵称 */}
      <View style={styles.uploaderContainer}>
        <Avatar rounded source={{ uri: uploaderAvatar }} />
        <Text style={styles.uploaderText}>{uploaderNickname}</Text>
      </View>
      {/* 底部选项卡内容 */}
      <View style={styles.bottomTabContent}>
        {/* 关注按钮 */}
        <Icon
          name={follow ? 'plus-square-o' : 'plus-square'}
          type="font-awesome"
          size={18}
          style={styles.followIcon}
          onPress={() => setFollow(!follow)}
        />
        <Text style={styles.followText}>{follow ? '取消关注' : '已关注'}</Text>
        {/* 评论图标和数量 */}
        <Icon
          name="comment-o"
          type="font-awesome"
          size={18}
          style={styles.commentIcon}
        />
        <Text style={styles.commentIcon}>{commentNum}</Text>
        {/* 点赞按钮 */}
        <Icon
          name={like ? 'thumbs-o-up' : 'thumbs-up'}
          type="font-awesome"
          size={18}
          style={styles.followIcon}
          onPress={() => setLike(!like)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    position: 'relative',
    marginTop: 10,
  },
  previewImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#fff',
  },
  viewNumText: {
    fontSize: 12,
    color: '#fff',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '40%',
    borderRadius: 20,
  },
  durationContainer: {
    position: 'absolute',
    right: 15,
    bottom: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  durationText: {
    color: '#fff',
    fontSize: 14,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }], // 因为无法使用百分比，只能使用固定数字实现居中
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
  uploaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: 150,
  },
  uploaderText: {
    marginLeft: 10,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
  },
  bottomTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 200,
  },
  followIcon: {
    width: 20,
  },
  followText: {
    lineHeight: 18,
    width: 60,
  },
  commentIcon: {
    lineHeight: 18,
  },
})
