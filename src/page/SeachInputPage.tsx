import { Text, View } from 'react-native'
import { HeaderTab } from '../components/HeaderTab'
import { SearchBar } from '../components/SearchBar'

export function SearchInputPage() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <HeaderTab>
        <SearchBar />
      </HeaderTab>
      <Text>This is SearchInputPage</Text>
    </View>
  )
}
