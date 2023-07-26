/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useScreens } from './src/hooks/useScreens';
import { HomePage, NewsAddPage, NewsAddPageContainer, SearchInputPage, VideoPlayPage, VideoPreviewPage, WeatherPage } from './src/page';
import { DBProvider } from './src/database/DBContext';
import { SQLiteDemo } from './src/database/SQLiteDemo';
import { Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {SkeletonPage} from './src/page'
const Stack = createNativeStackNavigator()
const screens = useScreens()

function App(): JSX.Element {

  return (
    <SafeAreaProvider>
      <DBProvider>
        {/* <SQLiteDemo/> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName={screens.Home}>
          <Stack.Group>
            <Stack.Screen
              name={screens.Home}
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screens.Weather}
              component={WeatherPage}
              initialParams={{
                hostName: 'Austyn',
              }}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screens.NewsAdd}
              component={NewsAddPageContainer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screens.SearchInput}
              component={SearchInputPage}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name={screens.VedioPreview}
              component={VideoPreviewPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={screens.VedioPlay}
              component={VideoPlayPage}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      </DBProvider>
    </SafeAreaProvider>
  );
}

export default App;
