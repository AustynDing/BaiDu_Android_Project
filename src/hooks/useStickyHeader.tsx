import React from 'react'
import { Animated, StyleSheet } from 'react-native'

interface StickyHeaderProps {
  stickyScrollY: any // 已经滑动的距离
  stickyHeaderY?: number // 滑动stickyHeaderY后固定-sticky
  children?: any
  forwardedRef?: any
  onLayout?: any
  style?: any
  otherProps?: any
}
function StickyHeader(props: StickyHeaderProps) {
  const {
    stickyHeaderY = -1,
    stickyScrollY,
    children,
    forwardedRef,
    onLayout,
    style,
    ...otherProps
  } = props

  const [stickyLayoutY, setStickyLayoutY] = React.useState(0)

  const _onLayout = React.useCallback(
    event => {
      if (event && event.nativeEvent) {
        setStickyLayoutY(event.nativeEvent.layout.y)
      }
      onLayout && onLayout(event)
    },
    [onLayout],
  )

  const translateY = React.useMemo(() => {
    const y = stickyHeaderY !== -1 ? stickyHeaderY : stickyLayoutY
    console.log(y)
    return stickyScrollY.interpolate({
      inputRange: [-1, 0, y, y + 1],
      outputRange: [0, 0, 0, 1],
    })
  }, [stickyHeaderY, stickyLayoutY, stickyScrollY])
  /**
   * 当位于(0,y],translateY 的值会被映射到 outputRange 中的0,这意味着元素会渐渐向上移动，直到完全吸附在顶部。
   * 当滚动位置处于 (y, y + 1] 范围内时，translateY 的值会被映射到 outputRange 中的最后一个值，即 1。
   * 通过这样的设置，可以实现一个平滑的过渡效果，使元素始终在顶部下方1像素处
   */
  return (
    <Animated.View
      ref={forwardedRef}
      onLayout={_onLayout}
      style={[style, styles.container, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
})
const MemoStickyHeader = React.memo(StickyHeader)

const ForwardStickyHeader = React.forwardRef(
  (props: StickyHeaderProps, ref) => (
    <MemoStickyHeader forwardedRef={ref} {...props} />
  ),
)

ForwardStickyHeader.displayName = 'StickyHeader'
// 将 ForwardStickyHeader 组件的显示名称设置为 'StickyHeader'
export default function useStickyHeader() {
  return { StickyHeader }
}
/**
 * 参考:https://github.com/jiasongs/react-native-stickyheader
 */
