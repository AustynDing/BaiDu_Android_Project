import { Icon } from '@rneui/themed'
import { Text, View, TouchableOpacity } from 'react-native'
import { NormalNewsType } from '.'

export function NormalNewsItem(props: NormalNewsType) {
  const { title, medium, top = false, newsUrl } = props
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        display: 'flex',
        flex: 1,
        height: 55,
      }}
    >
      <View>
        <Text style={{ fontSize: 20, color: 'black' }}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {top ? (
          <Icon
            style={{ paddingRight: 8 }}
            size={12}
            name="arrow-up"
            type="font-awesome"
            color="#EB4345"
          />
        ) : null}
        {top ? (
          <Text style={{ paddingRight: 8, color: '#EB4345' }}>置顶</Text>
        ) : null}
        <Text style={{ color: '#9E9E9E' }}>{medium}</Text>
      </View>
    </TouchableOpacity>
  )
}
