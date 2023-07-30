import { useNavigation } from '@react-navigation/native'
import { useScreens } from './useScreens'

export const usePageNavigation = () => {
  const navigation = useNavigation()
  const screens = useScreens()
  return {
    goToWeatherPage() {
      navigation.push(screens.Weather)
    },
    goToNewsAddPage() {
      navigation.push(screens.NewsAdd)
    },
    goToSearchInputPage() {
      navigation.push(screens.SearchInput)
    },
    goToVideoPlayPage() {
      navigation.push(screens.VedioPlay)
    },
    goToHomePage() {
      navigation.navigate(screens.Home)
    },
    goToNewsDetailPage(id: any) {
      navigation.push(screens.NewsDetail, {
        id,
      })
    },
    goBack() {
      navigation.goBack()
    },
  }
}
