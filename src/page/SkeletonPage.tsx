import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Skeleton } from '@rneui/themed'

export const SkeletonPage = () => {
  // 创建一个假数据数组，用于在FlatList中展示Skeleton元素
  const data = Array.from({ length: 15 })
  // 渲染Skeleton元素的函数
  const renderSkeletonItem = ({ item, index }) => {
    return (
      <View style={styles.skeletonItem}>
        <Skeleton
          animation="wave"
          height={60}
          circle={index % 2 === 0 ? false : true}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderSkeletonItem}
        keyExtractor={(item, index) => `skeleton-${index}`}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 10,
  },
  skeletonItem: {
    flex: 1,
    margin: 5,
    marginVertical: 15,
  },
})

export default SkeletonPage
