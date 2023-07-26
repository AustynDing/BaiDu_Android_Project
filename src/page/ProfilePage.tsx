import { Icon } from '@rneui/themed'
import React from 'react'
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import * as ImagePicker from 'react-native-image-picker'
import {
  UserInfoProvider,
  useUserDispatch,
  useUserInfo,
} from '../components/User/UserInfoContext'

export const ProfilePageContainer = () => {
  return (
    <UserInfoProvider>
      <ProfilePage />
    </UserInfoProvider>
  )
}

export const ProfilePage = () => {
  const initData = useUserInfo()
  const dispatch = useUserDispatch()
  const [modalVisible, setModalVisible] = React.useState(false)
  const [text, setText] = React.useState('')
  return (
    <View style={{ flex: 1, backgroundColor: '#F1F1F1' }}>
      <View
        style={{
          flexDirection: 'row',
          height: 150,
          width: '100%',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <View
          style={{
            marginHorizontal: 15,
          }}
        >
          <UploadPhotoContainer />
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
              {initData.nickname}
            </Text>
            <Icon
              style={{ paddingHorizontal: 5 }}
              type="font-awesome"
              name="angle-right"
              size={25}
              color="#9B9696"
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>用户名：{initData.username}</Text>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.')
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>修改昵称</Text>
                <TextInput
                  style={{
                    backgroundColor: '#FAFAFA',
                    width: '100%',
                    borderRadius: 20,
                  }}
                  placeholder="输入新昵称"
                  onChangeText={val => setText(val)}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    dispatch({
                      type: 'UPDATE_NICKNAME',
                      payload: text,
                    })
                  }}
                >
                  <Text style={styles.textStyle}>确认</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ ...styles.openButton, backgroundColor: '#FAFAFA' }}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <Text
                    style={{ ...styles.textStyle, color: 'rgb(89, 89, 89)' }}
                  >
                    取消
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  )
}

function UploadPhotoContainer() {
  const [response, setResponse] =
    React.useState<ImagePicker.ImagePickerResponse>()
  const dispatch = useUserDispatch()
  const initAvatar = useUserInfo().avatarUrl
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
            type: 'UPDATE_AVATAR',
            payload: response.assets[0].uri,
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
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          uploadPhoto('library', {
            mediaType: 'photo',
            quality: 0.5,
            selectionLimit: 1, // 默认也只能上传一张照片
          })
        }}
      >
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={{
            width: 100,
            height: 100,
            borderRadius: 999,
          }}
          source={{
            uri:
              response && response.assets ? response.assets[0].uri : initAvatar,
          }}
        />
      </TouchableOpacity>
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
  image: {
    width: 200,
    height: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    justifyContent: 'space-around',
    height: 250,
    width: 280,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    elevation: 2,
    height: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
