import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { FlatList, Text } from 'react-native'
import { AdvancedNewsType, NormalNewsType } from '.'
import { SkeletonPage } from '../../page'
import { AdvancedNewsItem } from './AdvancedNewsItem'
import { useFetchNewsList, useNewsList } from './NewsListContext'
import { NormalNewsItem } from './NormalNewsItem'

export default function NewsList() {
  const newsList = useNewsList()
  const fetchNewsList = useFetchNewsList()
  const [isLoading, setIsLoading] = React.useState(true) //todo: 使用suspense的特性来加载骨架屏
  useFocusEffect(
    React.useCallback(() => {
      fetchNewsList().then(() => setIsLoading(false))
      // wrapPromise(fetchNewsList()).read()
    }, [isLoading]),
  )
  return isLoading ? (
    <SkeletonPage />
  ) : (
    <FlatList
      style={{
        padding: 20,
      }}
      data={newsList}
      renderItem={({ item }) => {
        if (item.type === 'normal')
          return <NormalNewsItem {...(item as NormalNewsType)} />
        if (item.type === 'advanced')
          return <AdvancedNewsItem {...(item as AdvancedNewsType)} />
        return <Text>Error!!!</Text>
      }}
      keyExtractor={(item, index) => JSON.stringify(item) + index}
    />
  )
}
