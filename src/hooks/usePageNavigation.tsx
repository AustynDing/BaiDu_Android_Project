import { useNavigation } from '@react-navigation/native'
import { useScreens } from './useScreens'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
const screens = useScreens()
type ScreenValues = (typeof screens)[keyof typeof screens]
type RootStackParamList = Record<ScreenValues, object | undefined>
type Props = NativeStackScreenProps<RootStackParamList, ScreenValues>
type ScreenNavigationProp = Props['navigation']
export const usePageNavigation = () => {
  const navigation = useNavigation<ScreenNavigationProp>()
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
      navigation.push('NewsDetail', {
        id,
      })
    },
    goBack() {
      navigation.goBack()
    },
  }
}
