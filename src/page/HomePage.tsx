import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { NewsListProvider } from '../components/News/NewsListContext'
import { ForwardSearchBar } from '../components/SearchBar'
import { BottomTabs } from '../components/Tabs'
import {
  mapAQIToPollutionLevel,
  weatherData,
  weatherToDescriptionMap,
} from '../components/Weather/data'
import { usePageNavigation } from '../hooks/usePageNavigation'
import useStickyHeader from '../hooks/useStickyHeader'
const NewsList = React.lazy(() => import('../components/News/NewsList'))

export const HomePage = () => {
  return (
    <>
      <BottomTabs />
    </>
  )
}

function LogoContainer() {
  return (
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>LOGO</Text>
    </View>
  )
}

export function HomeScreen() {
  const scrollY = React.useRef(new Animated.Value(0)).current
  const { StickyHeader } = useStickyHeader()
  return (
    <Animated.ScrollView
      style={styles.scrollView}
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
      <View style={styles.weatherAndAddNewsContainer}>
        <WeatherForcast />
        <AddNewsIcon />
      </View>
      <StickyHeader stickyScrollY={scrollY}>
        <ForwardSearchBar />
      </StickyHeader>
      <LogoContainer />
      <NewsListProvider>
        <React.Suspense>
          <NewsList />
        </React.Suspense>
      </NewsListProvider>
    </Animated.ScrollView>
  )
}

function AddNewsIcon() {
  const { goToNewsAddPage } = usePageNavigation()
  return (
    <View style={styles.addNewsIconContainer}>
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

function WeatherForcast() {
  const { position, temperature, AQI, nowWeather } = weatherData
  const { goToWeatherPage } = usePageNavigation()
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={goToWeatherPage}
    >
      <View style={styles.weatherContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>{temperature}°</Text>
        </View>
        <View style={styles.weatherDescriptionContainer}>
          <Text style={styles.weatherDescriptionText}>
            {position} {weatherToDescriptionMap(nowWeather)}
          </Text>
          <Text style={styles.AQIText}>
            {AQI} {mapAQIToPollutionLevel(AQI)}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  weatherAndAddNewsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  addNewsIconContainer: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherContainer: {
    borderStyle: 'dashed',
    borderColor: '#999999',
    borderWidth: 1,
    width: 150,
    height: 50,
    flexDirection: 'row',
  },
  temperatureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureText: {
    fontWeight: '500',
    fontSize: 32,
  },
  weatherDescriptionContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  weatherDescriptionText: {
    flex: 1,
  },
  AQIText: {
    flex: 1,
  },
})
