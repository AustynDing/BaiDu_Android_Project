import React from 'react'
import { NewsType } from '.'
import { getNewsItems } from '../../database/db-service-news'
import { initNewsData } from './data'

interface NewsListContextType {
  newsList: NewsType[]
  addNewsInList: (news: NewsType) => void
  fetchNewsList: () => Promise<void>
}

export const NewsListContext = React.createContext<NewsListContextType>({
  newsList: initNewsData,
  addNewsInList: (news: NewsType) => {},
  fetchNewsList: () => Promise.resolve(),
})

export function NewsListProvider({ children }: { children: any }) {
  const [newsList, addNewsList] = React.useState<NewsType[]>(initNewsData)
  const addNewsInList = React.useCallback(
    (news: NewsType) => {
      addNewsList(prev => [...prev, news])
    },
    [addNewsList],
  )
  const fetchNewsList = React.useCallback(async () => {
    try {
      const results = await getNewsItems()
      if (results.length) {
        results
          .filter(result => {
            return !newsList.some(news => news.id === result.id)
          })
          .forEach(value => {
            addNewsInList(value)
            // bug newsList的更新是异步的，导致多次调用的addNewsInList
            // 使用的都是相同的旧newsList值，因此可能会导致更新不及时或者覆盖的问题
            // --- tab页的缓存导致newList和渲染出的无法一致，newList中的数据落后于已经渲染的从数据库中加载的数据
            // 因此无法实现filter
          })
      }
    } catch (error) {
      console.error(error)
    }
  }, [addNewsInList, newsList])
  return (
    <NewsListContext.Provider
      value={{ newsList, addNewsInList, fetchNewsList }}
    >
      {children}
    </NewsListContext.Provider>
  )
}

export const useFetchNewsList = () =>
  React.useContext(NewsListContext).fetchNewsList
export const useNewsList = () => React.useContext(NewsListContext).newsList
export const useAddNewsInList = () =>
  React.useContext(NewsListContext).addNewsInList
/**
 * 如果A和B组件在不同的组件树中，它们无法直接访问和修改对方组件树中的Context数据。
 * 此时，如果希望A组件的修改能够影响到B组件，需要使用其他机制来进行跨组件通信
 * A组件和B组件分别位于ParentAComponent和ParentBComponent的组件树中，
 * 使用了不同的MyContext.Provider来提供各自独立的Context数据。
 * 虽然都用的是MyContext.Provider，但是对应的context是不同的了
 */
