import { Icon } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'
import { usePageNavigation } from '../hooks/usePageNavigation'

export function HeaderTab(props: {
  children?: React.ReactNode
  arrowColor?: string
  onPress?: () => void
}) {
  const { children, arrowColor = '#333333', onPress } = props
  const { goBack } = usePageNavigation()
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 65,
        width: '100%',
        alignItems: 'center',
        zIndex: 99,
        paddingHorizontal: 10,
      }}
    >
      <Icon
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
