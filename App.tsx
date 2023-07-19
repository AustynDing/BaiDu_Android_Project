/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image
} from 'react-native';
import { Avatar } from '@rneui/themed'
import { ModalDemo, RefereshControlDemo, MyTabs } from './src/components'
import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// <SafeAreaView style={backgroundStyle}>
//   <StatusBar
//     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//     backgroundColor={backgroundStyle.backgroundColor}
//   />
//   <ScrollView
//     contentInsetAdjustmentBehavior="automatic"
//     style={backgroundStyle}>
//     <Header />
//     <View
//       style={{
//         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//       }}>
//       <YourApp />
//     </View>
//     <RefereshControlDemo/>
//     {/* <ModalDemo/> */}
//   </ScrollView>
// </SafeAreaView>

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
      }}
    >
      <Text
        style={{
          fontSize: 30
        }}
      >Try to edit me! 🎉</Text>
      <Cafe />
      <TextInput
        style={{
          color: 'red',
          height: 40,
          maxWidth: 400,
          minWidth: 50, // placeholder也会撑开一定的空间，会导致minWitdth效果展示不出来
          borderWidth: 1,
          borderColor: 'green'
        }}
        placeholder='have a try to type in me'
      />
      <PizzaTranslator />
    </View>
  )
}

const Cat = (props: { name: string }) => {
  const [isHungry, setIsHungry] = React.useState(true)
  return (
    <View>
      <Text>My name is {props.name}, and I am {isHungry ? 'hungry' : 'full'} </Text>
      <Button
        disabled={!isHungry}
        title={isHungry ? 'pour me some milk,please' : 'thank you!'}
        onPress={() => setIsHungry(false)}
      />
    </View>
  )
}
const Cafe = () => {
  return (
    <View>
      <Cat name='miki' />
      <Cat name='cindy' />
    </View>
  )
}

const PizzaTranslator = () => {
  const [text, setText] = React.useState('')
  return (
    <View>
      <TextInput
        style={{
          height: 40,
          marginTop: 20,
          borderColor: 'blue',
          borderWidth: 2
        }}
        placeholder='have a try'
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text
        style={{
          padding: 10,
          fontSize: 42
        }}
      >
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
      <FlatListBasics />
    </View>
  )
}

const FlatListBasics = () => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        data={[
          { key: 'Devin' },
          { key: 'Dan' },
          { key: 'Dominic' },
          { key: 'Jackson' },
          { key: 'James' },
          { key: 'Joel' },
          { key: 'John' },
          { key: 'Jillian' },
          { key: 'Jimmy' },
          { key: 'Julie' },
        ]}
        renderItem={({ item }) => {
          return (
            <Text style={styles.flatListItem}>
              {item.key}
            </Text>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flatListContainer: {
    flex: 1,
    paddingTop: 22
  },
  flatListItem: {
    padding: 10,
    fontSize: 18,
    height: Platform.OS === 'ios' ? 40 : 50,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green'
      }
    })
  },
});

export default App;
