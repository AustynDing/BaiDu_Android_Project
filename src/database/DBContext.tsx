import React, { createContext } from 'react'
import {
  ResultSet,
  SQLiteDatabase,
  StatementCallback,
  StatementErrorCallback,
  Transaction,
  TransactionCallback,
  TransactionErrorCallback,
} from 'react-native-sqlite-storage'
import { getDBConnection } from './db-service'

const initialDB = {
  dbName: '',
  transaction: (
    scope: (tx: Transaction) => void,
    error?: TransactionErrorCallback | undefined,
    success?: TransactionCallback | undefined,
  ) => {
    return Promise.resolve({} as Transaction)
  },
  readTransaction: () => {
    return Promise.resolve({} as Transaction)
  },
  close: () => {
    return Promise.resolve()
  },
  executeSql: (
    statement: string,
    params?: any[],
    success?: StatementCallback,
    error?: StatementErrorCallback,
  ) => {
    return Promise.resolve([{}] as [ResultSet])
  },
  attach: (nameToAttach: string, alias: string) => Promise.resolve(),
  detach: (alias: string) => Promise.resolve(),
} as SQLiteDatabase

const DBContext = createContext({ db: initialDB, isDBReady: false })

export function DBProvider({ children }: { children: any }) {
  const [db, setDB] = React.useState<SQLiteDatabase>(initialDB)
  const [isDBReady, setIsDBReady] = React.useState(false)
  React.useEffect(() => {
    try {
      const initializeDB = async () => {
        const connection = await getDBConnection()
        setDB(connection)
        setTimeout(() => {
          setIsDBReady(true) // 模拟加载数据库的情况
        }, 1000)
      }
      initializeDB()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <DBContext.Provider value={{ db, isDBReady }}>
      {children}
    </DBContext.Provider>
  )
}

export const useDB = () => React.useContext(DBContext).db

export const useDBLoadingState = () => React.useContext(DBContext).isDBReady
