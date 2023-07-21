import { useNavigation } from '@react-navigation/native'
import { useScreens } from './useScreens'

export const usePageNavigtation = () => {
  const navigation = useNavigation()
  const screens = useScreens()
  return {
    goToWeatherPage() {
      navigation.push(screens.Weather)
    },
    goToNewsAddPage() {
      navigation.push(screens.NewsAdd)
    },
  }
}
