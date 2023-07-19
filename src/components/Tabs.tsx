import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import React from 'react'
import { HomePage, ProfilePage, TabPage, VideoPage } from '../page'
const Tab = createBottomTabNavigator()

export const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#333333',
        tabBarInactiveTintColor: '#B0B1B3',
        
      }}
    >
      <Tab.Screen
        name={TabPage.HOME_PAGE}
        component={HomePage}
        options={{
          tabBarLabel: TabPage.HOME_PAGE,
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome" name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TabPage.VIDEO_PAGE}
        component={VideoPage}
        options={{
          tabBarLabel: TabPage.VIDEO_PAGE,
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome" name="play-circle" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={TabPage.PROFILE_PAGE}
        component={ProfilePage}
        options={{
          tabBarLabel: TabPage.PROFILE_PAGE,
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome" name="user" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}
