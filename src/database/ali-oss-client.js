const OSS = require('ali-oss')
const path = require('path')
const crypto = require('crypto')
const OSS_CONFIG = {
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAI5tD5kdnqnWeH7dtogvE5',
  accessKeySecret: 'beIU5Zmb02yGcPFbLGLtw2Cxav3ehY',
  bucket: 'android-demo0',
}

const client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: OSS_CONFIG.region,
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: OSS_CONFIG.accessKeyId,
  accessKeySecret: OSS_CONFIG.accessKeySecret,
  bucket: OSS_CONFIG.bucket,
})

// 获取文件后缀名
function getFileExtension(filePath) {
  return path.extname(filePath)
}

// 生成随机字符串
function generateRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}
export async function uploadImage(
  localFilePath = 'D:\\Android_Learn\\AwesomeProject\\src\\asset\\weather_sunny_bg.jpg',
) {
  try {
    // 生成随机图片名，保留后缀一致
    const randomImageName = generateRandomString(32)
    const fileExtension = getFileExtension(localFilePath)
    const randomImageKey = `${randomImageName}${fileExtension}`
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(
      randomImageKey,
      path.normalize(localFilePath),
    )
    const url = generateSignedUrl(result.name, 3600 * 24 * 14)
    console.log(url)
    return url
  } catch (e) {
    console.log(e)
  }
}

async function generateSignedUrl(ossObjectName, expirationInSeconds) {
  try {
    // 生成带签名的URL
    const signedUrl = client.signatureUrl(ossObjectName, {
      expires: expirationInSeconds, // 过期时间，单位：秒
      method: 'GET', // 请求方法，可以是 'GET'、'PUT'、'POST'、'DELETE' 等
    })

    return signedUrl
  } catch (error) {
    console.error('生成URL失败:', error)
    return null
  }
}

// async function listBuckets() {
//   try {
//     // 列举当前账号所有地域下的存储空间。
//     const result = await client.listBuckets()
//     console.log(result)
//   } catch (err) {
//     console.log(err)
//   }
// }

//   listBuckets(); //  You are forbidden to list buckets.
