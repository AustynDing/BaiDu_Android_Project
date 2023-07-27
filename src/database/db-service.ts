import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage'
// import { ToDoItem } from '../models';

export type ToDoItem = {
  id: number
  value: string
}

export const TABLE_NAME = {
  NEWS_TABLE: 'newsData',
  USER_TABLE: 'userData',
}

const tableName = 'todoData'

enablePromise(true)

// 使用IIFE+闭包缓存数据库连接
export const getDBConnection = (() => {
  let dbConnection: SQLiteDatabase
  return async () => {
    if (!dbConnection) {
      dbConnection = await openDatabase({
        name: 'androidDemo.db',
        location: 'default',
      })
    }
    return dbConnection
  }
})()

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`

  await db.executeSql(query)
}
