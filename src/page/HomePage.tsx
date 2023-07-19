import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { Avatar } from '@rneui/base'

const Stack = createNativeStackNavigator()

export const HomePage = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => <Button title="Update count" />,
            title: 'Overview',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          initialParams={{
            hostName: 'Austyn',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params?.name ?? 'Not defined',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: 'black',
            },
          })}
        />
      </Stack.Navigator>
    </>
  )
}

function HomeScreen({ route, navigation }) {
  const hostName = 'Austyn'
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Update count"
          onPress={() => {
            setCount(c => c + 1)
          }}
        />
      ),
    })
  }, [navigation])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Details', {
            itemId: 100,
            otherParam: 'anything you want here',
            name: 'Custom header',
          })
        }
      />
      <Text>
        This is {hostName}'s house,Count:{count}
      </Text>
      <Avatar
        size={32}
        rounded
        icon={{ name: 'pencil', type: 'font-awesome' }}
        containerStyle={{ backgroundColor: '#9700b9' }}
      />
      <Avatar
        size={32}
        icon={{ name: 'pencil', type: 'font-awesome' }}
        containerStyle={{ backgroundColor: '#9700b9' }}
      />
    </View>
  )
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push('Details', {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="set params"
        onPress={() =>
          navigation.setParams({
            itemId: itemId + 10,
          })
        }
      />
    </View>
  )
}
