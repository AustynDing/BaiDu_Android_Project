import React from 'react'
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
  payload: string
}

function UserReducer(state: UserType, action: Action): UserType {
  switch (action.type) {
    case 'UPDATE_AVATAR':
      console.log(action.payload)
      return {
        ...state,
        avatarUrl: action.payload,
      }
    case 'UPDATE_NICKNAME':
      return {
        ...state,
        nickname: action.payload,
      }
    default:
      return state
  }
}

export const UserInfoProvider = ({ children }: { children: any }) => {
  const [initData, dispatch] = React.useReducer(UserReducer, initUserData)
  return (
    <UserInfoContext.Provider value={{ initData, dispatch }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => React.useContext(UserInfoContext).initData
export const useUserDispatch = () => React.useContext(UserInfoContext).dispatch
