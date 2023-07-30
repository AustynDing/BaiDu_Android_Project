import OSS from 'ali-oss'
import { v4 as uuidv4 } from 'uuid'
const OSS_CONFIG = {
  region: 'oss-cn-hangzhou',
  accessKeyId: 'XXXXXXXXXXXXXX',
  accessKeySecret: 'XXXXXXXXXXXXXXXXXXXXXXX',
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
  // 获取最后一个点号的位置
  const lastDotIndex = filePath.lastIndexOf('.')

  // 如果找不到点号或者点号在文件名的起始位置，则返回空字符串表示没有后缀
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return ''
  }

  // 截取点号后面的部分即为文件后缀
  const fileExtension = filePath.substring(lastDotIndex)

  return fileExtension
}
// 生成随机字符串-32位
function generateRandomString() {
  return uuidv4()
}

function normalizePath(filePath) {
  const isAbsolute = filePath.startsWith('/')
  const parts = filePath.split('/')

  const normalizedParts = []
  for (const part of parts) {
    if (part === '..') {
      normalizedParts.pop()
    } else if (part !== '.' && part !== '') {
      normalizedParts.push(part)
    }
  }

  const normalizedPath = normalizedParts.join('/')

  // Handle absolute paths by adding a leading '/'
  return isAbsolute ? `/${normalizedPath}` : normalizedPath
}

export async function uploadImage(
  localFilePath = 'D:\\Android_Learn\\AwesomeProject\\src\\asset\\avatar.jpg',
) {
  try {
    // 生成随机图片名，保留后缀一致
    const randomImageName = generateRandomString()
    const fileExtension = getFileExtension(localFilePath)
    const randomImageKey = `${randomImageName}${fileExtension}`
    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(
      randomImageKey,
      normalizePath(localFilePath),
    )
    const url = await generateSignedUrl(result.name, 3600 * 24 * 14)
    console.log(url, 'testOk')
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
    console.log(signedUrl)
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
