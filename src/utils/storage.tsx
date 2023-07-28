import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function storeString(
  key: string,
  value: string,
): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<any | null> {
  try {
    const data = await AsyncStorage.getItem(key)
    if (!data) {
      throw new Error('No data found')
    }
    return JSON.parse(data)
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function store(key: string, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.log('Error storing data:', error)
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('Error storing data:', error)
  }
}
/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log('Error clearing data:', error)
  }
}
export async function exist(key: string): Promise<boolean> {
  try {
    const item = await AsyncStorage.getItem(key)
    return !!item
  } catch (error) {
    console.log(error)
    return false
  }
}
