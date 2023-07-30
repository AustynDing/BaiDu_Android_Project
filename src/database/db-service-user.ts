import { enablePromise } from 'react-native-sqlite-storage'
import { UserType } from '../components/User/data'
import { getDBConnection, TABLE_NAME } from './db-service'

enablePromise(true)

export const createUserTable = async () => {
  const db = await getDBConnection()
  const query = `
      CREATE TABLE IF NOT EXISTS ${TABLE_NAME.USER_TABLE}(
        avatarUrl TEXT,
        nickname TEXT,
        username TEXT
      )
    `
  await db.executeSql(query)
}
// 插入用户信息 --- 注册使用 + 初始化使用
export const insertUserInfo = async (userInfo: UserType) => {
  try {
    // 确保用户表已经存在，如果不存在则创建
    await createUserTable()

    // 获取数据库连接
    const db = await getDBConnection()

    // 插入用户信息
    const query = `
        INSERT INTO ${TABLE_NAME.USER_TABLE} (avatarUrl, nickname, username)
        VALUES (?, ?, ?)
      `
    const { avatarUrl, nickname, username } = userInfo
    const params = [avatarUrl, nickname, username]
    const results = await db.executeSql(query, params)

    if (results[0].insertId) {
      console.log('用户信息插入成功！')
    } else {
      console.log('用户信息插入失败！')
    }
    return results
  } catch (error) {
    console.error('插入用户信息失败:', error)
  }
}
// 通用的更新函数
const updateField = async (
  fieldName: keyof UserType,
  value: string,
  username: string,
) => {
  await createUserTable()
  const db = await getDBConnection()
  const query = `
      UPDATE ${TABLE_NAME.USER_TABLE}
      SET ${fieldName} = ?
      WHERE username = ?
    `

  try {
    const results = await db.executeSql(query, [value, username])
    if (results[0].rowsAffected > 0) {
      console.log(`成功更新 ${fieldName},${value}!`)
    } else {
      console.log('未更新任何数据，可能没有匹配的记录。')
    }
    return results
  } catch (error) {
    console.error(`更新 ${fieldName} 失败:`, error)
  }
}

// 更新 avatarUrl
export const updateAvatarUrl = async (avatarUrl: string, username: string) => {
  return await updateField('avatarUrl', avatarUrl, username)
}

// 更新 nickname
export const updateNickname = async (nickname: string, username: string) => {
  console.log(nickname)
  return await updateField('nickname', nickname, username)
}

// getUserInfo 函数，通过 username 查找用户信息
export const getUserInfo = async (
  username: string,
): Promise<UserType | null> => {
  try {
    // 确保用户表已经存在，如果不存在则创建
    await createUserTable()

    // 获取数据库连接
    const db = await getDBConnection()

    // 查询用户信息
    const query = `
        SELECT avatarUrl, nickname, username
        FROM ${TABLE_NAME.USER_TABLE}
        WHERE username = ?
      `
    const results = await db.executeSql(query, [username])

    if (results[0].rows.length > 0) {
      // 如果找到匹配的用户信息，返回第一个匹配的用户信息
      const userRow = results[0].rows.item(0)
      const userInfo: UserType = {
        avatarUrl: userRow.avatarUrl,
        nickname: userRow.nickname,
        username: userRow.username,
      }
      return userInfo
    } else {
      // 没有找到匹配的用户信息，返回 null
      return null
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return null
  }
}
