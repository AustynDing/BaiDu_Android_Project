import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Animated,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native'
import useStickyHeader from '../hooks/useStickyHeader'
import {
  Data,
  NormalNewsItem,
  AdvancedNewsItem,
  NormalNewsType,
  AdvancedNewsType,
} from '../components/News'
const Stack = createNativeStackNavigator()

export const HomePage = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Header">
        <Stack.Screen
          name="Header"
          component={Header}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{
            hostName: 'Austyn',
          }}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params?.name ?? 'Not defined',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: 'black',
            },
          })}
        />
      </Stack.Navigator>
    </>
  )
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <MainContainer />
    </View>
  )
}

function DetailsScreen({ navigation }) {
  // const { itemId, otherParam } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(0)}</Text>
      <Text>otherParam: {JSON.stringify(0)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="set params"
        onPress={() =>
          navigation.setParams({
            itemId: itemId + 10,
          })
        }
      />
    </View>
  )
}

function MainContainer() {
  return (
    <View style={{ flex: 1 }}>
      <LogoContainer />
      <SearchContainer />
    </View>
  )
}

function SearchContainer() {
  const [searchText, setSearchText] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  return (
    <View
      style={{
        backgroundColor: '#F2F2F2',
      }}
    >
      <TextInput
        style={{
          flex: 1,
          borderColor: isFocused ? 'black' : 'gray',
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 15,
          height: 40,
          margin: 20,
        }}
        placeholder="搜索或输入网址"
        value={searchText}
        onChangeText={setSearchText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
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

function Header({ navigation }) {
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
        <AddNews navigation={navigation} />
      </View>
      <StickyHeader stickyScrollY={scrollY}>
        <SearchContainer />
      </StickyHeader>
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
    </Animated.ScrollView>
  )
}

function AddNews({ navigation }) {
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
        onPress={() => navigation.push('Home')}
        size={25}
        type="font-awesome"
        name="plus-circle"
        color="#333333"
      />
    </View>
  )
}

type AirQuality = '优' | '良'
type Weather = '晴' | '雨'
interface WeatherInfo {
  temperature: number
  weather: Weather
  position: string
  airQualityIndex: number
  airQuality: AirQuality
}
function WeatherForcast({ navigation }) {
  const [weatherInfo, setWeatherInfo] = React.useState<WeatherInfo>({
    temperature: 18,
    weather: '晴',
    position: '北京',
    airQualityIndex: 88,
    airQuality: '优',
  })
  return (
    <>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => navigation.push('Details')}
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
              {weatherInfo.temperature}°
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
                {weatherInfo.position} {weatherInfo.weather}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text>
                {weatherInfo.airQualityIndex} {weatherInfo.airQuality}
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
