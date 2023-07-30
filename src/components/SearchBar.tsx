import { useRoute } from '@react-navigation/native'
import React from 'react'
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native'
import { usePageNavigation } from '../hooks/usePageNavigation'
import { useScreens } from '../hooks/useScreens'

export interface SearchBarRef {
  goBackHistory: () => void
  goForwardHistory: () => void
}
interface SearchBarProps {
  onSubmitEditing?: (text: string) => void
}

export const ForwardSearchBar = React.forwardRef<SearchBarRef, SearchBarProps>(
  function SearchBar(props, ref) {
    const [searchText, setSearchText] = React.useState('')
    const [searchHistoryStack, setSearchHistoryStack] = React.useState<
      string[]
    >([''])
    const historyPointer = React.useRef(0)
    const [isFocused, setIsFocused] = React.useState(false)
    const { goToSearchInputPage } = usePageNavigation()
    const route = useRoute()
    const screens = useScreens()
    const isSearchInputPage = route.name === screens.SearchInput

    const goForwardSearchHistoryStack = React.useCallback(() => {
      if (historyPointer.current < searchHistoryStack.length - 1) {
        historyPointer.current++
        setSearchText(searchHistoryStack[historyPointer.current])
      }
    }, [searchHistoryStack])
    const goBackSearchHistoryStack = React.useCallback(() => {
      if (historyPointer.current > 0) {
        historyPointer.current--
        setSearchText(searchHistoryStack[historyPointer.current])
      }
    }, [searchHistoryStack])
    const pushStack = React.useCallback(
      (text: string) => {
        setSearchHistoryStack(prev => [
          ...prev.slice(0, historyPointer.current + 1),
          text,
        ])
        historyPointer.current++
      },
      [searchHistoryStack],
    )
    React.useImperativeHandle(
      ref,
      () => {
        return {
          goForwardHistory: goForwardSearchHistoryStack,
          goBackHistory: goBackSearchHistoryStack,
        }
      },
      [goBackSearchHistoryStack, goForwardSearchHistoryStack],
    )
    const handleOnSubmitEditing = (
      event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => {
      // 当用户提交输入时调用此函数
      const submittedText = event.nativeEvent.text
      props.onSubmitEditing?.(submittedText)
      pushStack(submittedText)
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.textInput,
            {
              borderColor: isFocused ? 'black' : 'gray',
            },
          ]}
          placeholder="搜索或输入网址"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={
            isSearchInputPage ? () => setIsFocused(true) : goToSearchInputPage
          }
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleOnSubmitEditing}
        />
      </View>
    )
  },
)
ForwardSearchBar.displayName = 'SearchBar'
// 在开发者工具中查看组件层次结构时，会显示 SearchBar 而不是默认的匿名组件名称，
// 这有助于更好地理解和调试的应用程序
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    height: 65,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
  },
})
