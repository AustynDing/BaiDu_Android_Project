import React from 'react'
import {
  getUserInfo,
  insertUserInfo,
  updateAvatarUrl,
  updateNickname,
} from '../../database/db-service-user'
import { UserType, initUserData } from './data'
type UserInfoContextType = {
  initData: UserType
  dispatch: React.Dispatch<Action>
}
const UserInfoContext = React.createContext<UserInfoContextType>({
  initData: initUserData,
  dispatch: function (value: Action): void {
    throw new Error('Function not implemented.')
  },
})

type Action = {
  type: 'UPDATE_AVATAR' | 'UPDATE_NICKNAME'
  payload: {
    value: string
    username: string
  }
}

function UserReducer(state: UserType, action: Action): UserType {
  const { value, username } = action.payload
  switch (action.type) {
    case 'UPDATE_AVATAR':
      updateAvatarUrl(value, username)
        .then(() => {
          // 异步函数的 then 方法返回的值并不会被直接作为 UserReducer 函数的返回值，
          // 因此 UserReducer 实际上没有返回任何值，所以数据没有更新。
          //   return {
          //     ...state,
          //     avatarUrl: value,
          //   }
        })
        .catch(error => console.log(error))
      return {
        ...state,
        avatarUrl: value,
      }
    // 乐观更新
    case 'UPDATE_NICKNAME':
      updateNickname(value, username)
        .then(() => console.log(value))
        .catch(error => console.log(error))
      return {
        ...state,
        nickname: value,
      }
    default:
      return state
  }
}

export const UserInfoProvider = ({ children }: { children: any }) => {
  const [initData, dispatch] = React.useReducer(UserReducer, initUserData)
  React.useEffect(() => {
    insertUserInfo(initData)
    // 在组件挂载后获取用户信息并更新 initData
    const fetchUserInfo = async () => {
      const usernameToFetch = initData.username // 你要获取用户信息的用户名
      const userInfo = await getUserInfo(usernameToFetch)
      if (userInfo) {
        dispatch({
          type: 'UPDATE_AVATAR',
          payload: {
            value: userInfo.avatarUrl,
            username: userInfo.username,
          },
        })
        dispatch({
          type: 'UPDATE_NICKNAME',
          payload: {
            value: userInfo.nickname,
            username: userInfo.username,
          },
        })
      }
    }
    fetchUserInfo()
  }, [])
  return (
    <UserInfoContext.Provider value={{ initData, dispatch }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => React.useContext(UserInfoContext).initData
export const useUserDispatch = () => React.useContext(UserInfoContext).dispatch
