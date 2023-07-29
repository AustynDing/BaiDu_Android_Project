import { Icon, Image } from '@rneui/themed'
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { HeaderTab } from '../components/HeaderTab'
import {
  AQILinear,
  WeatherHourType,
  mapAQIToPollutionLevel,
  weatherData,
  weatherToDescriptionMap,
  weatherToImageMap,
} from '../components/Weather/'

const defaultColor = '#ffffff'

export function WeatherPage() {
  const {
    position,
    temperature,
    maxTemperature,
    minTemperature,
    AQI,
    weatherHourList,
  } = weatherData

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require('../asset/weather_sunny_bg.jpg')}
        style={styles.backgroundImage}
      >
        <HeaderTab arrowColor="white" />
        <View style={styles.headerTabContainer}>
          <Text style={styles.locationText}>{position}</Text>
          <Text style={styles.temperatureText}>{temperature}°</Text>
          <Text style={styles.temperatureMinMaxText}>
            最高{maxTemperature}° 最低{minTemperature}°
          </Text>
        </View>
        <AirQualityContainer AQI={AQI} />
        <HourlyWeatherForcast weatherHourList={weatherHourList} />
      </ImageBackground>
    </View>
  )
}

function AirQualityContainer(props: { AQI: number }) {
  const { AQI } = props

  return (
    <Wrapper height={180} style={styles.AQILinearContainer}>
      <View style={styles.airQualityWrapper}>
        <View style={styles.airQualityIconContainer}>
          <Icon
            name="modx"
            size={16}
            type="font-awesome"
            color="#7EB8FF"
            style={styles.airQualityIcon}
          />
          <Text style={styles.airQualityText}>空气质量</Text>
        </View>
        <View>
          <Text style={styles.airQualityValue}>
            {AQI} - {mapAQIToPollutionLevel(AQI)}
          </Text>
          <View style={styles.airQualityDescription}>
            <Text style={styles.airQualityText}>当前AQI(CN)为{AQI}。</Text>
          </View>
        </View>
      </View>
      <AQILinear />
    </Wrapper>
  )
}

function HourlyWeatherForcast(props: { weatherHourList: WeatherHourType[] }) {
  return (
    <Wrapper height={150} style={styles.hourlyWeatherWrapper}>
      <View>
        <View style={styles.hourlyWeatherIconContainer}>
          <Icon
            name="clock-o"
            size={16}
            type="font-awesome"
            color="#7EB8FF"
            style={styles.hourlyWeatherIcon}
          />
          <Text style={styles.hourlyWeatherText}>每小时天气预报</Text>
        </View>
        <View>
          <FlatList
            data={props.weatherHourList}
            renderItem={renderItem}
            keyExtractor={item => item.time + item.weatherType}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </Wrapper>
  )
}

function renderItem(props: { item: WeatherHourType }) {
  const { item } = props
  const { time, weatherType } = item

  return (
    <View style={styles.weatherItemContainer}>
      <View>
        <Text style={styles.weatherTimeText}>{time}时</Text>
      </View>
      <Image
        style={styles.weatherImage}
        source={weatherToImageMap[weatherType]}
      />
      <Text style={styles.weatherDescriptionText}>
        {weatherToDescriptionMap(weatherType)}
      </Text>
    </View>
  )
}

function Wrapper(props: { height: number; children?: any; style?: any }) {
  const { height, children, style } = props

  return (
    <View style={[styles.wrapperContainer, { height }, style]}>{children}</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  headerTabContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 28,
    color: defaultColor,
  },
  temperatureText: {
    color: defaultColor,
    fontSize: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色，使用rgba来指定透明度
    textShadowOffset: { width: 1, height: 2 }, // 阴影偏移量，分别控制水平和垂直方向的偏移
    textShadowRadius: 5, // 阴影模糊半径
  },
  temperatureMinMaxText: {
    fontSize: 20,
    color: defaultColor,
  },
  airQualityWrapper: {
    marginLeft: 15,
    marginTop: 5,
  },
  airQualityIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  airQualityIcon: {
    marginRight: 5,
  },
  airQualityText: {
    color: '#7EB8FF',
  },
  airQualityValue: {
    color: defaultColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  airQualityDescription: {
    marginTop: 10,
    marginBottom: 10,
    color: defaultColor,
  },
  AQILinearContainer: {
    height: 180,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#4177BF',
    borderRadius: 10,
  },
  hourlyWeatherWrapper: {
    marginTop: 5,
  },
  hourlyWeatherIconContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hourlyWeatherIcon: {
    marginRight: 5,
  },
  hourlyWeatherText: {
    color: '#7EB8FF',
  },
  weatherItemContainer: {
    width: 70,
    marginTop: 10,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  weatherTimeText: {
    fontSize: 16,
    color: defaultColor,
    fontWeight: 'bold',
  },
  weatherImage: {
    height: 40,
    width: 40,
  },
  weatherDescriptionText: {
    fontSize: 16,
    color: defaultColor,
    fontWeight: 'bold',
  },
  wrapperContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#4177BF',
    borderRadius: 10,
  },
})
