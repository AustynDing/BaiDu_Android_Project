type weather = 'cloudy' | 'sunny' | 'rain' | 'lightrain'
type weatherDescription = '多云' | '晴天' | '雨' | '小雨'
type PollutionDescription =
  | '优级'
  | '良好'
  | '轻度污染'
  | '中度污染'
  | '重度污染'
  | '严重污染'

const weatherDescriptionMap = new Map<weather, weatherDescription>([
  ['cloudy', '多云'],
  ['sunny', '晴天'],
  ['rain', '雨'],
  ['lightrain', '小雨'],
])

export const weatherToDescriptionMap = (value: weather) =>
  weatherDescriptionMap.get(value)
export interface WeatherHourType {
  time: number
  weatherType: weather
}
export interface WeatherDataType {
  position: string
  temperature: number
  maxTemperature: number
  minTemperature: number
  AQI: number
  weatherHourList: WeatherHourType[]
  nowWeather: weather
}

export const weatherToImageMap: Record<weather, any> = {
  cloudy: require('../../asset/weather_cloudy.png'),
  sunny: require('../../asset/weather_sunny.png'),
  rain: require('../../asset/weather_rain.png'),
  lightrain: require('../../asset/weather_lightrain.png'),
}

const airPollutionLevelsMap = [
  { maxIndex: 50, description: '优级' },
  { maxIndex: 100, description: '良好' },
  { maxIndex: 150, description: '轻度污染' },
  { maxIndex: 200, description: '中度污染' },
  { maxIndex: 300, description: '重度污染' },
  { maxIndex: Number.MAX_SAFE_INTEGER, description: '严重污染' },
]
export const mapAQIToPollutionLevel = (index: number): PollutionDescription => {
  const levelInfo = airPollutionLevelsMap.find(level => index <= level.maxIndex)
  return levelInfo
    ? (levelInfo.description as PollutionDescription)
    : '严重污染'
}
export const weatherData: WeatherDataType = {
  position: '北京',
  maxTemperature: 35,
  minTemperature: 23,
  temperature: 31,
  AQI: 100,
  nowWeather: 'sunny',
  weatherHourList: [
    {
      time: 10,
      weatherType: 'sunny',
    },
    {
      time: 11,
      weatherType: 'cloudy',
    },
    {
      time: 12,
      weatherType: 'lightrain',
    },
    {
      time: 13,
      weatherType: 'rain',
    },
    {
      time: 14,
      weatherType: 'sunny',
    },
    {
      time: 15,
      weatherType: 'rain',
    },
    {
      time: 16,
      weatherType: 'cloudy',
    },
    {
      time: 17,
      weatherType: 'lightrain',
    },
  ],
}
