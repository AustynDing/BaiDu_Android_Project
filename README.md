This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# dependencies
```json
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.19.1",  // 用于实现搜索历史记录的缓存
    "@react-navigation/bottom-tabs": "^6.5.8", // 用于实现导航功能
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "@rneui/base": "^4.0.0-rc.7", // 使用一些基本的ui组件
    "@rneui/themed": "^4.0.0-rc.7",
    "ali-oss": "^6.17.1", // 使用阿里云oss存储，保存图片资源
    "expo": "^49.0.3",
    "prettier": "^3.0.0", // 代码的规范化
    "react": "18.2.0",
    "react-native": "0.72.3",
    "react-native-image-picker": "^5.6.0", // 用于图片的选择
    "react-native-linear-gradient": "^2.7.3", // 用于蒙层的实现
    "react-native-safe-area-context": "^4.7.1",
    "react-native-screens": "^3.22.1",
    "react-native-sqlite-storage": "^6.0.1", // 提供更为强大的数据持久化功能
    "react-native-vector-icons": "^10.0.0", // 基本的icon库
    "react-native-video": "^5.2.1", // 用于视频流的实现
    "react-native-webview": "^13.3.0", // 实现网络页面的跳转和交互
    "uuid": "^9.0.0"
  },
```
# FinalProject

#### 介绍
大作业

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx
