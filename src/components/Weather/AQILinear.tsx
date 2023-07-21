import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { weatherData } from './data'

export function AQILinear() {
  const airColors = [
    '#73BB4D',
    '#EBB541',
    '#FC9B56',
    '#F17751',
    '#A94057',
    '#7B1F3C',
  ]
  const thresholds = [50, 100, 150, 200, 250]
  const [marginLeftValue, setMarginLeftValue] = React.useState(0)
  const [layout, setLayout] = React.useState({ width: 0, height: 0 })
  const onLayoutHandler = event => {
    const { width, height } = event.nativeEvent.layout // 获取布局信息
    setLayout({ width, height })
  }
  React.useEffect(() => {
    setMarginLeftValue(weatherData.AQI)
  }, [weatherData.AQI])

  const valueToOffset = React.useMemo(() => {
    return Math.min(
      Math.floor(layout.width * airColors.length),
      Math.floor((marginLeftValue / 50) * layout.width), // 50 - 每一格对应值50
    )
  }, [marginLeftValue, layout.width]) // 需要监听layout.width-因为一开始默认为0，布局后才会改变

  const handleIndicatorColor = React.useCallback((value: number) => {
    const index = thresholds.findIndex(threshold => value <= threshold)
    return index === -1 ? airColors[5] : airColors[index]
  }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.indicatorContainer]}>
        <Text style={styles.text}>0</Text>
        {thresholds.map((value, index) => (
          <Text key={index} style={styles.text} onLayout={onLayoutHandler}>
            {value}
          </Text>
        ))}
      </View>
      <View style={styles.indicatorContainer}>
        {airColors.map((color, index) => (
          <View
            key={index}
            style={[styles.indicator, { backgroundColor: color }]}
          />
        ))}
      </View>
      <View style={styles.currentIndicator}>
        <Image
          source={require('../../asset/water.png')}
          style={[
            styles.indicatorImage,
            {
              tintColor: handleIndicatorColor(marginLeftValue), // 可以修改图片填充颜色
              marginLeft: valueToOffset,
            },
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  indicator: {
    flex: 1,
    height: 10,
  },
  currentIndicator: {
    height: 10,
  },
  text: {
    fontSize: 15,
    color: 'white',
    flex: 1,
    backgroundColor: 'transparent',
  },
  indicatorImage: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  indicatorText: {
    fontSize: 13,
    color: 'white',
    backgroundColor: 'transparent',
    marginTop: 8,
  },
  detailColumnContainer: {
    flexDirection: 'column',
    marginTop: 30,
  },
  detailRowContainer: {
    flexDirection: 'row',
  },
})
/**
 * 参考 https://github.com/nickming/ReactWeather/
 */
