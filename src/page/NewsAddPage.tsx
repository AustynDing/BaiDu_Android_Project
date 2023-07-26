import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as ImagePicker from 'react-native-image-picker'
import { HeaderTab } from '../components/HeaderTab'
import { AdvancedNewsType } from '../components/News'
import {
  NewsAddProvider,
  useNewsAddDispatch,
  useNewsAddFormData,
} from '../components/News/NewsAddContext'
import { NewsListProvider } from '../components/News/NewsListContext'

export function NewsAddPageContainer() {
  return (
    <NewsListProvider>
      <NewsAddProvider>
        <NewsAddPage />
      </NewsAddProvider>
    </NewsListProvider>
  )
}

export function NewsAddPage() {
  const dispatch = useNewsAddDispatch()
  return (
    <View style={styles.container}>
      <HeaderTab>
        <Text style={{ fontSize: 20, color: '#000', marginLeft: 10 }}>
          添加新闻条目
        </Text>
      </HeaderTab>
      <ItemContainer
        title="标题"
        placeholder="请输入新闻标题"
        height={50}
        numberOfLines={1}
        field="title"
      />
      <ItemContainer
        title="新闻媒体"
        height={50}
        placeholder="请输入新闻媒体"
        field="medium"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <UploadPhotoContainer title="略缩图" />
        {/* <UploadPhotoContainer title="头图" /> */}
        {/* UI图中给的头图的需求不明确，作用不大，所以删除了 */}
      </View>
      <ItemContainer
        title="摘要"
        placeholder="请输入新闻摘要"
        height={100}
        field="abstract"
      />
      <ItemContainer
        title="正文"
        placeholder="请输入新闻内容"
        height={250}
        numberOfLines={25}
        field="content"
      />
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          marginRight: 5,
        }}
      >
        <Button
          onPress={() => dispatch({ type: 'SUBMIT' })}
          title="添加新闻条目"
        />
      </View>
    </View>
  )
}

function UploadPhotoContainer(props: { title: string }) {
  const [response, setResponse] = React.useState<any>(null)
  const { title } = props
  const deletePhoto = React.useCallback(() => {
    setResponse(null)
  }, [])
  const dispatch = useNewsAddDispatch()
  const responseCallback = React.useCallback(
    (response: ImagePicker.ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode || response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else if (response.assets) {
        setResponse(response)
        if (response.assets[0].uri) {
          dispatch({
            value: response.assets[0].uri,
            type: 'UPDATE_FIELD',
            field: 'imageUrl',
          })
        } else {
          console.log(response.assets)
        }
      }
    },
    [],
  )

  const uploadPhoto = React.useCallback(
    (
      type: any,
      options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
    ) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, responseCallback)
      } else if (type === 'library') {
        ImagePicker.launchImageLibrary(options, responseCallback)
      }
    },
    [],
  )
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      }}
    >
      <View
        style={{
          width: 150,
          flexDirection: 'row',
        }}
      >
        <Text
          style={{
            marginTop: 5,
            fontSize: 16,
            flex: 1,
          }}
        >
          {title}
        </Text>
        {response ? (
          response.assets &&
          response.assets.map(({ uri }: { uri: string }) => (
            <View key={uri} style={styles.imageContainer}>
              <View>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 20,
                  }}
                  source={{ uri: uri }}
                />
              </View>
              <TouchableOpacity onPress={deletePhoto} style={{ marginTop: 5 }}>
                <Text>删除照片</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#D8D8D8',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}
            onPress={() =>
              uploadPhoto('library', {
                mediaType: 'photo',
                quality: 0.5,
                selectionLimit: 1, // 默认也只能上传一张照片
              })
            }
          >
            <Icon name="upload" size={60} color="#9B9696" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

function ItemContainer(props: {
  title: string
  placeholder: string
  height: number
  numberOfLines?: number
  field: keyof AdvancedNewsType
}) {
  const { title, placeholder, height, numberOfLines, field } = props
  const dispatch = useNewsAddDispatch()
  const value = useNewsAddFormData()[field]
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
          height: height,
        },
      ]}
    >
      <Text
        style={{
          marginTop: 5,
          fontSize: 16,
          flex: 1,
        }}
      >
        {title}
      </Text>
      <TextInput
        multiline={numberOfLines === 1 ? false : true}
        scrollEnabled={true}
        numberOfLines={numberOfLines ?? 10}
        placeholder={placeholder}
        value={value as string}
        onChangeText={val =>
          dispatch({ type: 'UPDATE_FIELD', field, value: val })
        }
        style={{
          borderStyle: 'solid',
          borderColor: '#888686',
          borderWidth: 1,
          borderRadius: 20,
          flex: 3,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
})
