import { Icon } from '@rneui/base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
import { HeaderTab } from '../components/HeaderTab'
import { SearchBar } from '../components/SearchBar'
import { usePageNavigation } from '../hooks/usePageNavigation'

export function SearchInputPage() {
  const HTML = `
  <!DOCTYPE html>\n
  <html>
    <head>
    </head>
  </html>
  `
  // 创建一个引用来获取 WebView 组件的引用
  const webViewRef = React.useRef<WebView | null>(null)
  const { goToHomePage } = usePageNavigation()
  // 处理用户提交的事件
  const handleSearchSubmit = (text: string) => {
    const escapedText = text.replace(/[']/g, "\\'").replace(/["]/g, '\\"') // 在单引号和双引号前添加转义符号
    // 使用 WebView 组件的 injectJavaScript 方法执行 JavaScript 代码，
    // 将窗口位置跳转到百度页面
    webViewRef.current?.injectJavaScript(
      `window.location.href = 'https://m.baidu.com/s?word=${escapedText}';`,
    )
  }

  // 导航的后退功能
  const handleGoBack = () => {
    // 使用 WebView 组件的 goBack 方法实现后退
    // 只支持 SearchBar 中搜索导致的百度页面的切换，不支持百度页面内部点击造成的页面切换
    webViewRef.current?.goBack()
  }

  // 导航的前进功能
  const handleGoForward = () => {
    // 使用 WebView 组件的 goForward 方法实现前进
    webViewRef.current?.goForward()
  }

  return (
    <View style={styles.container}>
      <HeaderTab>
        <SearchBar onSubmitEditing={handleSearchSubmit} />
      </HeaderTab>
      {/* WebView 组件 */}
      <WebView
        ref={webViewRef} // 将引用赋值给 WebView 组件
        style={styles.webView}
        javaScriptEnabled={true} // 允许在 WebView 中执行 JavaScript
        domStorageEnabled={true} // 允许在 WebView 中使用本地存储
        startInLoadingState={true} // 初始加载时显示加载状态
        source={{ html: HTML }} // source 不可少,否则会报类型转化错误
      ></WebView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: 40,
        }}
      >
        <Icon
          type="font-awesome"
          name="home"
          size={25}
          onPress={goToHomePage}
        />
        <Icon
          style={{
            width: 32,
          }}
          type="font-awesome"
          name="angle-left"
          size={32}
          onPress={handleGoBack}
        />
        <Icon
          style={{
            width: 32,
          }}
          type="font-awesome"
          name="angle-right"
          size={32}
          onPress={handleGoForward}
        />
        <Icon type="font-awesome" name="sticky-note-o" size={20} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
})
