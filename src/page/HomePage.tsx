import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import {
  AdvancedNewsItem,
  AdvancedNewsType,
  NormalNewsItem,
  NormalNewsType,
  initNewsData,
} from '../components/News'
import { SearchBar } from '../components/SearchBar'
import { BottomTabs } from '../components/Tabs'
import {
  mapAQIToPollutionLevel,
  weatherData,
  weatherToDescriptionMap,
} from '../components/Weather/data'
import { usePageNavigation } from '../hooks/usePageNavigation'
import useStickyHeader from '../hooks/useStickyHeader'
import { NewsListProvider, useFetchNewsList, useNewsList } from '../components/News/NewsListContext'
import { useFocusEffect } from '@react-navigation/native'

export const HomePage = () => {
  return (
    <>
      <BottomTabs />
    </>
  )
}

function LogoContainer() {
  return (
    <View
      style={{
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 42,
          fontWeight: 'bold',
        }}
      >
        LOGO
      </Text>
    </View>
  )
}

export function HomeScreen({ navigation }) {
  const scrollY = React.useRef(new Animated.Value(0)).current
  const { StickyHeader } = useStickyHeader()
  return (
    <Animated.ScrollView
      style={{
        flex: 1,
      }}
      onScroll={Animated.event(
        [
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={1} // 调整滚动事件的触发频率
    >
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <WeatherForcast navigation={navigation} />
        <AddNewsIcon navigation={navigation} />
      </View>
      <StickyHeader stickyScrollY={scrollY}>
        <SearchBar />
      </StickyHeader>
      <LogoContainer />
      <NewsListProvider>
        <NewsList />
      </NewsListProvider>
    </Animated.ScrollView>
  )
}

function NewsList() {
  const newsList = useNewsList()
  const fetchNewsList = useFetchNewsList()
  useFocusEffect(React.useCallback(
    () => {
      fetchNewsList()
      .then((value) => console.log(value))
      .catch((error)=> console.error(error) )
    }
  ,[]))
  return (
    <FlatList
      style={{
        padding: 20,
      }}
      data={newsList}
      renderItem={({ item }) => {
        if (item.type === 'normal')
          return <NormalNewsItem {...(item as NormalNewsType)} />
        if (item.type === 'advanced')
          return <AdvancedNewsItem {...(item as AdvancedNewsType)} />
        return <Text>Error!!!</Text>
      }}
      keyExtractor={(item,index) => JSON.stringify(item)+index}
    />
  )
}

function AddNewsIcon({ navigation }) {
  const { goToNewsAddPage } = usePageNavigation()
  return (
    <View
      style={{
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon
        onPress={goToNewsAddPage}
        size={25}
        type="font-awesome"
        name="plus-circle"
        color="#333333"
      />
    </View>
  )
}

function WeatherForcast({ navigation }) {
  const { position, temperature, AQI, nowWeather } = weatherData
  const { goToWeatherPage } = usePageNavigation()
  return (
    <>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={goToWeatherPage}
      >
        <View
          style={{
            borderStyle: 'dashed',
            borderColor: '#999999',
            borderWidth: 1,
            width: 150,
            height: 50,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                fontSize: 32,
              }}
            >
              {temperature}°
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text>
                {position} {weatherToDescriptionMap(nowWeather)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text>
                {AQI} {mapAQIToPollutionLevel(AQI)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    transform: [{ translateY: 200 }],
    backgroundColor: 'yellow',
    zIndex: 100,
    position: 'absolute',
    // 其他样式属性
  },
})
