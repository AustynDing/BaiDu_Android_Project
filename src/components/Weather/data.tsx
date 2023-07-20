type weather = 'cloudy' | 'sunny' | 'rain' | 'lightrain'
interface WeatherHourType {
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
}

export const weatherToImageMap: Record<weather, any> = {
  cloudy: require('../../asset/weather_cloudy.png'),
  sunny: require('../../asset/weather_sunny.png'),
  rain: require('../../asset/weather_rain.png'),
  lightrain: require('../../asset/weather_lightrain.png'),
}
export const weatherData: WeatherDataType = {
  position: '海淀区',
  maxTemperature: 35,
  minTemperature: 23,
  temperature: 31,
  AQI: 50,
  weatherHourList: [
    {
      time: 10,
      weatherType: 'cloudy',
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
  ],
}
