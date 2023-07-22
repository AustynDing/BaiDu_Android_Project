import { useRoute } from "@react-navigation/native"
import React from "react"
import { TextInput, View } from "react-native"
import { usePageNavigation } from "../hooks/usePageNavigation"
import { useScreens } from "../hooks/useScreens"

export function SearchBar() {
  const [searchText, setSearchText] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  const { goToSearchInputPage } = usePageNavigation()
  const route = useRoute()
  const screens = useScreens()
  const isSearchInputPage = route.name === screens.SearchInput
  return (
    <View
      style={{
        backgroundColor: '#F2F2F2',
        height: 65,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderColor: isFocused ? 'black' : 'gray',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 15,
        }}
        placeholder="搜索或输入网址"
        value={searchText}
        onChangeText={setSearchText}
        onFocus={isSearchInputPage ? () => setIsFocused(true) : goToSearchInputPage}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  )
}