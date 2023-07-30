const SCREENS = {
  Home: 'HomeScreen',
  Weather: 'WeatherScreen',
  NewsAdd: 'NewsAddScreen',
  SearchInput: 'SearchInputScreen',
  VedioPreview: 'VedioPreviewScreen',
  VedioPlay: 'VedioPlayScreen',
  Profile: 'ProfileScreen',
  NewsDetail: 'NewsDetail',
  // 添加其他屏幕的名称...
} as const
export const useScreens = () => SCREENS
