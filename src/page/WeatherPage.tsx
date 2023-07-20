import { Icon, Image } from '@rneui/themed'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { AQILinear } from '../components/Weather/AQILinear'
import { mapAQIToPollutionLevel, weatherData, WeatherHourType, weatherToDescriptionMap, weatherToImageMap } from '../components/Weather/data'
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
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: 250,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 28,
            color: defaultColor,
          }}
        >
          {position}
        </Text>
        <Text
          style={{
            color: defaultColor,
            fontSize: 60,
            textShadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色，使用rgba来指定透明度
            textShadowOffset: { width: 1, height: 2 }, // 阴影偏移量，分别控制水平和垂直方向的偏移
            textShadowRadius: 5, // 阴影模糊半径
          }}
        >
          {temperature}°
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: defaultColor,
          }}
        >
          最高{maxTemperature}° 最低{minTemperature}°
        </Text>
      </View>
      <AirQualityContainer AQI={AQI}/>
      <HourlyWeatherForcast weatherHourList={weatherHourList} />
    </View>
  )
}
function AirQualityContainer(props:{AQI: number}){
    const {AQI} = props
    return (
        <Wrapper height={180}>
        <View
        style={{
            marginLeft:15,
            marginTop:5,
        }}
        >
         <View
            style = {{
                flexDirection:'row',
                alignItems:'center',
            }}
         >
            <Icon name="modx" size={16} type="font-awesome" color="#7EB8FF" />
         <Text style={{ color: '#7EB8FF',marginLeft:5 }}>
            空气质量
          </Text>
         </View>
          <View>
          <Text
            style={{ color: defaultColor, fontSize: 18, fontWeight: 'bold' }}
          >
            {AQI} - {mapAQIToPollutionLevel(AQI)}
          </Text>
            <View
            style ={{
                marginTop:10,
                marginBottom:10
            }}>
            <Text style={{ color: defaultColor }}>当前AQI(CN)为{AQI}。</Text>
            </View>
          </View>
        </View>
        <AQILinear />
      </Wrapper>
    )
}

function HourlyWeatherForcast(props:{weatherHourList: WeatherHourType[]}){
    return (
        <Wrapper height={150}>
        <View
        style={{
            marginTop:5,
        }}
        >
         <View
            style = {{
                marginLeft:15,
                flexDirection:'row',
                alignItems:'center',
            }}
         >
            <Icon name="clock-o" size={16} type="font-awesome" color="#7EB8FF" />
         <Text style={{ color: '#7EB8FF',marginLeft:5 }}>
            每小时天气预报
          </Text>
         </View>
        <View>
            <FlatList
                data = {props.weatherHourList}
                renderItem = {renderItem}
                keyExtractor={item => item.time + item.weatherType}
                horizontal={true}
            />
        </View>
        </View>
      </Wrapper>
    )
}

function renderItem(props: {item: WeatherHourType}){
    const {item} = props
    const {time,weatherType} = item
    return (
        <View
        style={{
            width:70,
            marginTop:10,
            height:100,
            alignItems:'center',
            justifyContent:'space-around'
        }}
        >
            <View>
            <Text style={{fontSize:16,color:defaultColor,fontWeight:'bold'}}>{time}时</Text>
            </View>
            <Image  
            style={{
                height:40,
                width:40
            }}
            source={weatherToImageMap[weatherType]}/>
            <Text style={{fontSize:16,color:defaultColor,fontWeight:'bold'}}>{weatherToDescriptionMap(weatherType)}</Text>

        </View>
    )
}

function Wrapper(props: { height: number; children?: any; style?:any }) {
  const { height, children,style } = props
  return (
    <View
      style={[
        {
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          backgroundColor: '#4177BF',
          borderRadius: 10,
          height: height,
        },
        style
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})
