import { enablePromise } from 'react-native-sqlite-storage'
import { AdvancedNewsType } from '../components/News'
import { getDBConnection, TABLE_NAME } from './db-service'

enablePromise(true)

export const createNewsTable = async () => {
  const db = await getDBConnection()
  const query = `
        CREATE TABLE IF NOT EXISTS ${TABLE_NAME.NEWS_TABLE} (
        title TEXT,
        medium TEXT,
        type TEXT,
        top INTEGER,
        abstract TEXT,
        content TEXT,
        hotSpot INTEGER,
        imageUrl TEXT,
        commentNum INTEGER
      )
    `
  await db.executeSql(query)
  // 使用 INTEGER 存储 0（false）或 1（true）
}

export const getNewsItems = async (): Promise<AdvancedNewsType[]> => {
  try {
    const newsItems: AdvancedNewsType[] = []
    const db = await getDBConnection()
    await createNewsTable()
    const results = await db.executeSql(
      `SELECT rowid as id,title,medium,type,top,abstract,content,hotSpot,imageUrl,commentNum FROM ${TABLE_NAME.NEWS_TABLE}`,
    )
    /**
     * 在SQL语句中使用了多条语句（比如使用分号;分隔的多个SQL查询），
     * 或者执行了批量查询（比如同时执行多个INSERT或UPDATE操作），
     * 那么可能会得到多个ResultSet，因此返回的是数组
     */
    if (Object.keys(results[0]).length === 0) return newsItems // 避免results是[{}]
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        newsItems.push(result.rows.item(index))
        //  raws()：返回查询结果集中所有行的原始数据，通常是一个数组。
      }
    })
    return newsItems
  } catch (error) {
    console.error(error)
    throw Error('Failed to get newsItems !!!')
  }
}

export const getNewsItem = async (id: number) => {
  try {
    const db = await getDBConnection()
    await createNewsTable()
    const results = await db.executeSql(
      `SELECT rowid as id,title,medium,type,top,abstract,content,hotSpot,imageUrl,commentNum FROM ${TABLE_NAME.NEWS_TABLE} 
       WHERE rowid = ?
      `,
      [id],
    )
    // Check if any rows were returned
    if (results[0].rows.length > 0) {
      const newsItem = results[0].rows.item(0)
      return newsItem
    } else {
      // If no rows are found with the given id, return null or throw an error
      // depending on your use case
      throw new Error('没有找到新闻')
    }
  } catch (error) {
    console.error('加载新闻失败', error)
    return null
  }
}

export const addNewsItem = async (item: AdvancedNewsType) => {
  try {
    // 确保新闻表已经存在，如果不存在则创建
    await createNewsTable()

    // 获取数据库连接
    const db = await getDBConnection()

    // 执行插入操作
    const insertQuery = `
    INSERT INTO ${TABLE_NAME.NEWS_TABLE}
    (title, top, medium, type, abstract, content, hotSpot, imageUrl, commentNum)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const params = [
      item.title,
      item.top || 0,
      item.medium,
      item.type,
      item.abstract,
      item.content,
      item.hotSpot || 1,
      item.imageUrl,
      item.commentNum,
    ]
    // const insertQuery =
    //   `INSERT OR REPLACE INTO ${TABLE_NAME.NEWS_TABLE}(title,medium,type,top,abstract,content,hotSpot,imageUrl,commentNum) values` +
    //   `(${"'" + item.title + "'"},${"'" + item.medium + "'"},${"'" + item.type + "'"
    //   },${item.top ? 1 : 0},${"'" + item.abstract + "'"},${"'" + item.content + "'"
    //   },${item.hotSpot ? 1 : 0},${"'" + item.imageUrl + "'"},${item.commentNum})`
    // bug: 模板字符串解析的时候，反斜杠会导致普通字符变成转义字符
    const results = await db.executeSql(insertQuery, params)
    if (results[0].insertId) {
      return results
    } else {
      return null
    }
  } catch (error) {
    console.log('插入新闻失败:', error)
    return null
  }
}
