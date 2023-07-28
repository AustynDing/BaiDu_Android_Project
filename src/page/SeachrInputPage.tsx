import { Icon } from '@rneui/base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import { HeaderTab } from '../components/HeaderTab'
import { SearchBar } from '../components/SearchBar'
import { usePageNavigation } from '../hooks/usePageNavigation'
import { load, store } from '../utils/storage'

export function SearchInputPage() {
  const [searchHistory, setSearchHistory] = React.useState<string[]>()
  const webViewRef = React.useRef<WebView | null>(null)

  React.useEffect(() => {
    load('searchHistory')
      .then(loadData => {
        if (loadData) {
          setSearchHistory(loadData)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const [isVisible, toggleVisibility] = React.useState(true)
// 只有在自己写的搜索框中搜索的才会放入搜索历史中
  const addSearchHistory = React.useCallback(
    (searchText: string) => {
      store(
        'searchHistory',
        searchHistory ? [...searchHistory, searchText] : [searchText],
      )
        .then(res =>
          setSearchHistory(prev =>
            prev ? [...prev, searchText] : [searchText],
          ),
        )
        .catch(err => console.log(err))
    },
    [searchHistory],
  )


  const handleSearchSubmit = (text: string) => {
    const escapedText = text.replace(/[']/g, "\\'").replace(/["]/g, '\\"')
    addSearchHistory(text)
    webViewRef.current?.injectJavaScript(
      `window.location.href = 'https://m.baidu.com/s?word=${escapedText}';`,
    )
  }

  return (
    <View style={styles.container}>
      <HeaderTab>
        <SearchBar onSubmitEditing={handleSearchSubmit} />
      </HeaderTab>
      {isVisible && <SearchHistoryContainer searchHistory={searchHistory} />}
      <WebView
        ref={webViewRef}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        source={{ html: WebViewConfig.HTML }}
        onNavigationStateChange={navState => {
          if (navState.url === WebViewConfig.INIT_URL) {
            toggleVisibility(true)
          } else {
            toggleVisibility(false)
          }
        }}
      />
      <BottomTab webViewRef={webViewRef} />
    </View>
  )
}

function SearchHistoryContainer({
  searchHistory,
}: {
  searchHistory: string[] | undefined
}) {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.boldText}>历史搜索</Text>
      <View style={styles.historyRow}>
        <View style={styles.historyColumn}>
          {searchHistory?.map((value, index) => {
            if (index % 2 === 0 && index === 9) {
              return <Text style={styles.historyText}>查看更多历史</Text>
            }
            if (index % 2 === 0 && index < 9) {
              return <Text style={styles.historyText}>{value}</Text>
            }
          })}
        </View>
        <View style={styles.historyColumn}>
          {searchHistory?.map((value, index) => {
            if (index % 2 === 1 && index === 9) {
              return <Text style={styles.historyText}>查看更多历史</Text>
            }
            if (index % 2 === 1 && index < 9) {
              return <Text style={styles.historyText}>{value}</Text>
            }
          })}
        </View>
      </View>
    </View>
  )
}

function BottomTab({
  webViewRef,
}: {
  webViewRef: React.MutableRefObject<WebView<{}> | null>
}) {
  const { goToHomePage } = usePageNavigation()
  const handleGoBack = () => {
    webViewRef.current?.goBack()
  }
  const handleGoForward = () => {
    webViewRef.current?.goForward()
  }

  return (
    <View style={styles.bottomTabContainer}>
      <Icon type="font-awesome" name="home" size={25} onPress={goToHomePage} />
      <Icon
        style={styles.icon}
        type="font-awesome"
        name="angle-left"
        size={32}
        onPress={handleGoBack}
      />
      <Icon
        style={styles.icon}
        type="font-awesome"
        name="angle-right"
        size={32}
        onPress={handleGoForward}
      />
      <Icon type="font-awesome" name="sticky-note-o" size={20} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
  },
  icon: {
    width: 32,
  },
  webView: {
    flex: 1,
  },
  historyContainer: {
    marginHorizontal: 10,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  historyRow: {
    flexDirection: 'row',
  },
  historyColumn: {
    flex: 1,
  },
  historyText: {
    fontSize: 15,
    marginTop: 5,
  },
})

const WebViewConfig = {
  HTML:`
  <!DOCTYPE html>\n
  <html>
    <head>
    </head>
  </html>
  `,
  INIT_URL:'about:blank'
}