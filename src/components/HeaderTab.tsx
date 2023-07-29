import { Icon } from '@rneui/themed'
import React from 'react'
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native'
import { usePageNavigation } from '../hooks/usePageNavigation'

export function HeaderTab(props: {
  children?: React.ReactNode
  arrowColor?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}) {
  const { children, arrowColor = '#333333', onPress, style } = props
  const { goBack } = usePageNavigation()
  return (
    <View style={[styles.container, style]}>
      <Icon
        style={styles.icon}
        name="angle-left"
        type="font-awesome"
        color={arrowColor}
        size={30}
        onPress={onPress ? onPress : goBack}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,
  },
  icon: {
    width: 30,
    height: 30,
  },
})
