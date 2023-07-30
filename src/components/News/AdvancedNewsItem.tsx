import { Image, Text, TouchableOpacity, View } from 'react-native'
import { AdvancedNewsType } from '.'
import { usePageNavigation } from '../../hooks/usePageNavigation'
export function AdvancedNewsItem(props: AdvancedNewsType) {
  const { hotSpot, title, imageUrl, commentNum: commnetNum, medium, id } = props
  const { goToNewsDetailPage } = usePageNavigation()
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        height: 100,
        flexDirection: 'row',
        marginTop: 5,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: 'black',
      }}
      onPress={() => goToNewsDetailPage(id)}
    >
      <View
        style={{
          flex: 2,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 20, color: 'black' }}>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {hotSpot ? (
            <Text style={{ paddingRight: 8, color: '#EB4345' }}>热点</Text>
          ) : null}
          <Text style={{ color: '#9E9E9E', paddingRight: 8 }}>{medium}</Text>
          {commnetNum ? (
            <Text style={{ color: '#9E9E9E' }}>{commnetNum}评论</Text>
          ) : null}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            padding: 10,
          }}
          source={{
            uri: imageUrl,
          }}
          // todo: 这里的soure要替换掉
        />
      </View>
    </TouchableOpacity>
  )
}
