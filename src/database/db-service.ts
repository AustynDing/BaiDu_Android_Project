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

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`

  await db.executeSql(query)
}

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = []
    const results = await db.executeSql(
      `SELECT rowid as id,value FROM ${tableName}`,
    )
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    })
    return todoItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get todoItems !!!')
  }
}

export const saveTodoItems = async (
  db: SQLiteDatabase,
  todoItems: ToDoItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',')

  return db.executeSql(insertQuery)
}

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`
  await db.executeSql(deleteQuery)
}

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`

  await db.executeSql(query)
}
