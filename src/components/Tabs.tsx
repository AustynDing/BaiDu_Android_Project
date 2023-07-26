import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import React from 'react'
import { HomeScreen, ProfilePage, TabPage, VideoPreviewPage } from '../page'
const Tab = createBottomTabNavigator()

export const BottomTabs = () => {
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
        component={HomeScreen}
        options={{
          tabBarLabel: TabPage.HOME_PAGE,
          tabBarIcon: ({ color, size }) => (
            <Icon type="font-awesome" name="home" color={color} size={size} />
          ),
          headerShown: false,
          unmountOnBlur:true, // 一个不太机智的办法：切换tab页时取消navigation自带的缓存，这样newsList就不会使用旧数据了
        }}
      />
      <Tab.Screen
        name={TabPage.VIDEO_PREVIEW_PAGE}
        component={VideoPreviewPage}
        options={{
          tabBarLabel: TabPage.VIDEO_PREVIEW_PAGE,
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="font-awesome"
              name="play-circle"
              color={color}
              size={size}
            />
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
