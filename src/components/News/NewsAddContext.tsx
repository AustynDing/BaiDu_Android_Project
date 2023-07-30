import React from 'react'
import { addNewsItem } from '../../database/db-service-news'
import { AdvancedNewsType, newsType } from './index'

type NewsAddContextType = {
  formData: AdvancedNewsType
  dispatch: React.Dispatch<Action>
}

const initialFormData: AdvancedNewsType = {
  id: 0,
  title: '',
  medium: '',
  type: 'advanced',
  abstract: '',
  content: '',
  top: false,
  hotSpot: false,
  imageUrl: '',
  commentNum: Math.floor(Math.random() * 1000) + 1,
}
const NewsAddContext = React.createContext<NewsAddContextType>({
  formData: initialFormData,
  dispatch: function (value: Action): void {
    throw new Error('Function not implemented.')
  },
})
// 定义Action类型
type Action = {
  type: 'UPDATE_FIELD'
  field: keyof AdvancedNewsType
  value: string | boolean | newsType
}

function newsReducer(state: AdvancedNewsType, action: Action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    default:
      return state
  }
}

export function NewsAddProvider({ children }: { children: any }) {
  // 使用useReducer定义state和dispatch
  const [formData, dispatch] = React.useReducer(newsReducer, initialFormData)
  return (
    <NewsAddContext.Provider value={{ formData, dispatch }}>
      {children}
    </NewsAddContext.Provider>
  )
}

export const useNewsAddDispatch = () =>
  React.useContext(NewsAddContext).dispatch
export const useNewsAddFormData = () =>
  React.useContext(NewsAddContext).formData
