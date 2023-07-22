import React from "react"
import { View, TextInput } from "react-native"
import { usePageNavigtation } from "../hooks/usePageNavigation"

export function SearchBar() {
    const [searchText, setSearchText] = React.useState('')
    const [isFocused, setIsFocused] = React.useState(false)
    const {goToSearchInputPage} = usePageNavigtation()
    return (
      <View
        style={{
          backgroundColor: '#F2F2F2',
          height: 65,
          paddingHorizontal:20,
          paddingVertical:10,
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
          onFocus={goToSearchInputPage}
          onBlur={() => setIsFocused(false)}
          onTextInput={() => setIsFocused(true)}
        />
      </View>
    )
  }