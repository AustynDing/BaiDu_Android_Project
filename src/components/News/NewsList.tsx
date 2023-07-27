import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
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
    <SkeletonPage num={15} columns={2} />
  ) : (
    // />
    <View
      style={{
        padding: 20
      }}
    >
      {newsList.map((item, index) => {
        if (item.type === 'normal') {
          return <NormalNewsItem key={JSON.stringify(item) + index} {...(item as NormalNewsType)} />
        }
        if (item.type === 'advanced') {
          return <AdvancedNewsItem key={JSON.stringify(item) + index} {...(item as AdvancedNewsType)} />
        }
        return <Text>Error!!</Text>
      })}
    </View>
  )
}
