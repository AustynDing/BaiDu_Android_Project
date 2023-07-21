import { Icon, Avatar } from '@rneui/base'
import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'

export interface VideoItemType {
  title:string,
  videoImage: string,
  videoViewNum:number, //以万为单位
  videoDuration:number, // 以秒为但会
  uploaderAvatar:string,
  uploaderNickname:string,
  commentNum:number,
  isFollowed:boolean, // 关注
  isLiked:boolean, // 点赞
}

export const data:VideoItemType[]=[
  {
    title: '如何在家做美味披萨',
    videoImage: 'https://example.com/path/to/video1.jpg',
    videoViewNum: 1.5,
    videoDuration: 240,
    uploaderAvatar: 'https://example.com/path/to/avatar1.jpg',
    uploaderNickname: 'FoodLover123',
    commentNum: 800,
    isFollowed: true,
    isLiked: false,
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
  },
]

export function VideoPage(){
  const renderItem = ({item}) => (
    <VideoItem {...item}/>
  )
  return (
    <View
      style={{flex : 1}}
    >
    <FlatList
      data={data}
      renderItem={renderItem}
    />
    </View>
  )
}


function VideoContainer(props:Pick<VideoItemType,'title' | 'videoViewNum' |'videoImage' | 'videoDuration'>){
  const {title,videoViewNum,videoImage,videoDuration} = props
  return (
    <View
      style={{
        width:'100%',
        height:200,
        borderRadius:20,
        backgroundColor:'pink',
        position:'relative',
        marginTop:10
      }}
    >
    <Image
      style={{
        flex:1,
        width:'100%',
        height:'100%',
        borderRadius:20,

      }}
      resizeMode='cover'
      source={require('../asset/video_demo.png')}
    />
    <View
      style={{
        position:'absolute',
        top:10,
        left:10
      }}
    >
      <Text style={{fontSize:16,color:'#fff'}}>{title}</Text>
      <Text style={{fontSize:12,color:'#fff'}}>{videoViewNum}万次播放</Text>
    </View>
    <View
      style={{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:[{translateX:-16},{translateY:-16}]
      }}
    >
    <Icon
      name='play-circle-o'
      type='font-awesome'
      color='#fff'
      size={32}
    />
    </View>
    </View>
  )
}

function VideoBottomTab(props:Pick<VideoItemType,'uploaderAvatar' | 'uploaderNickname' | 'commentNum' | 'isFollowed' | 'isLiked'>){
 const {uploaderAvatar,uploaderNickname,commentNum,isFollowed,isLiked} = props
 const [follow,setFollow] = React.useState(isFollowed)
 const [like,setLike] = React.useState(isLiked) 
 return (
  <View
    style={{
      flexDirection:'row',
      justifyContent:'space-between',
      height:45
    }}
  >
    <View
      style={{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        width:150,
      }}
    >
      <Avatar
        rounded
        source={require('../asset/avatar.jpg')}
      />
      <Text style={{marginLeft:10}}>{uploaderNickname}</Text>
    </View>
    <View
      style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        width:200,
      }}
    >
        <Icon
          name={follow ? 'plus-square-o' : 'plus-square'}
          type='font-awesome'
          size={18}
          style={{
            width:20,
          }}
          onPress={() => setFollow(!follow)}
        />
      <Text style={{lineHeight:18,width:60}}>{follow ? '取消关注' :'已关注'}</Text>
      <Icon
        name='comment-o'
        type='font-awesome'
        size={18}
      />
      <Text style={{lineHeight:18}}>{commentNum}</Text>
      <Icon
        name={like ? 'thumbs-o-up' : 'thumbs-up'}
        type='font-awesome'
        size={18}
        style={{
          width:20
        }}
        onPress={() => setLike(!like)}
      />
    </View>
  </View>
 )
}

function VideoItem(props:VideoItemType){

  return (
    <View>
      <VideoContainer {...props} />
      <VideoBottomTab {...props}/>
    </View>
  )
}
