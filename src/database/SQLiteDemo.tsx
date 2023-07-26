/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useDB, useDBLoadingState } from './DBContext'
import { ToDoItem, ToDoItemComponent } from './ToDoItem'
import {
  createTable,
  deleteTodoItem,
  getTodoItems,
  saveTodoItems,
} from './db-service'
import { SkeletonPage } from '../page'
export const SQLiteDemo = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([])
  const [newTodo, setNewTodo] = useState('')
  const db = useDB()
  const isDBReady = useDBLoadingState()
  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [
        { id: 0, value: 'go to shop' },
        { id: 1, value: 'eat at least a one healthy foods' },
        { id: 2, value: 'Do some exercises' },
      ]
      if (!db) throw new Error('Failed to establish a database connection.')
      await createTable(db)
      const storedTodoItems = await getTodoItems(db)
      if (storedTodoItems.length) {
        setTodos(storedTodoItems)
      } else {
        await saveTodoItems(db, initTodos)
        setTodos(initTodos)
      }
    } catch (error) {
      console.error(error)
    }
  }, [db]) // 对db进行监听，db：建立连接-连接成功需要时间，所以db会出现为null的情况
  React.useEffect(() => {
    loadDataCallback()
  }, [loadDataCallback])
  const addTodo = async () => {
    if (!newTodo.trim()) return
    try {
      const newTodos = [
        ...todos,
        {
          id: todos.length
            ? todos.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur
                return acc
              }).id + 1
            : 0,
          value: newTodo,
        },
      ]
      setTodos(newTodos)
      if (!db) throw new Error('Failed to establish a database connection.')
      await saveTodoItems(db, newTodos)
      setNewTodo('')
    } catch (error) {
      console.error(error)
    }
  }
  const deleteItem = async (id: number) => {
    try {
      // const db = await getDBConnection();
      if (!db) throw new Error('Failed to establish a database connection.')
      await deleteTodoItem(db, id)
      setTodos(todos.filter((value, index) => index !== id))
    } catch (error) {
      console.error(error)
    }
  }
  return isDBReady ? (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> ToDo Application </Text>
        </View>
        <View>
          {todos.map(todo => (
            <ToDoItemComponent
              key={todo.id}
              todo={todo}
              deleteItem={deleteItem}
            />
          ))}
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
          />
          <Button
            onPress={addTodo}
            title="Add ToDo"
            color="#841584"
            accessibilityLabel="add todo item"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <SkeletonPage />
  )
}
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    margin: 10,
    backgroundColor: 'pink',
  },
})
