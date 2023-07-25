import React from 'react'
import { useDB } from '../../database/DBContext'
import { addNewsItem } from '../../database/db-service-news'
import { AdvancedNewsType, newsType } from './index'
type NewsAddContextType = {
    formData: AdvancedNewsType
    dispatch: React.Dispatch<Action>
}
// export type NewsAddInputType = keyof Pick<
//   AdvancedNewsType,
//   'abstract' | 'content' | 'medium' | 'title' | 'imageUrl'
// >

const initialFormData: AdvancedNewsType = {
    id: '',
    title: '',
    medium: '',
    type: 'normal',
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
        console.log(value)
        throw new Error('Function not implemented.')
    },
})
// 定义Action类型
type Action =
    | {
        type: 'UPDATE_FIELD'
        field: keyof AdvancedNewsType
        value: string | boolean | newsType
    }
    | { type: 'SUBMIT' }
    | { type: 'CLEAN' }

function newsReducer(state: AdvancedNewsType, action: Action) {
    const db = useDB()
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, [action.field]: action.value }
        case 'SUBMIT':
            // 在这里执行提交逻辑
            const addNews = React.useCallback(async (news: AdvancedNewsType) => {
                await addNewsItem(db, news)
            }, [db])
            addNews(state)
            console.log('提交的数据:', state)
            // 在这里可以调用API将数据提交到后端或进行其他处理
            return initialFormData
        case 'CLEAN':
            return initialFormData
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
