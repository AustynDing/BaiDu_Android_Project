import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import {
  AdvancedNewsItem,
  AdvancedNewsType,
  Data,
  NormalNewsItem,
  NormalNewsType,
} from '../components/News'
import {
  mapAQIToPollutionLevel,
  weatherData,
  weatherToDescriptionMap,
} from '../components/Weather/data'
import { usePageNavigtation } from '../hooks/usePageNavigation'
import { useScreens } from '../hooks/useScreens'
import useStickyHeader from '../hooks/useStickyHeader'
import { NewsAddPage } from './NewsAddPage'
import { WeatherPage } from './WeatherPage'
import { SearchBar } from '../components/SearchBar'
import { SearchInputPage } from './SeachInputPage'
const Stack = createNativeStackNavigator()

export const HomePage = () => {
  const screens = useScreens()
  return (
    <>
      <Stack.Navigator initialRouteName={screens.Home}>
        <Stack.Screen
          name={screens.Home}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.Weather}
          component={WeatherPage}
          initialParams={{
            hostName: 'Austyn',
          }}
          options={{ headerShown:false }}
        />
        <Stack.Screen
          name={screens.NewsAdd}
          component={NewsAddPage}
          options={{ headerShown:false }}
        />
        <Stack.Screen
          name={screens.SearchInput}
          component={SearchInputPage}
          options={{ headerShown:false }}
        />
      </Stack.Navigator>
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

function HomeScreen({ navigation }) {
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
      <NewsList />
    </Animated.ScrollView>
  )
}

function NewsList() {
  return (
    <FlatList
      style={{
        padding: 20,
      }}
      data={Data}
      renderItem={({ item }) => {
        if (item.type === 'normal')
          return <NormalNewsItem {...(item as NormalNewsType)} />
        if (item.type === 'advanced')
          return <AdvancedNewsItem {...(item as AdvancedNewsType)} />
        return <Text>Error!!!</Text>
      }}
    />
  )
}

function AddNewsIcon({ navigation }) {
  const { goToNewsAddPage } = usePageNavigtation()
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
  const { goToWeatherPage } = usePageNavigtation()
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
