import { Avatar } from '@rneui/themed'
import { Text, View } from 'react-native'

export const ProfilePage = () => {
  return (
    <View>
      <Avatar size={32} rounded source={require('../asset/avatar.jpg')} />
      <Text>This is profile page</Text>
    </View>
  )
}
