/**
 * 
 * @param seconds 
 * @returns 格式化的时间字符串:x:xx:xx: 01:22 00:45 16:23 1:46:01
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const hoursStr = hours > 0 ? `${hours}:` : ''
  const minutesStr = minutes > 10 ? `${minutes}:` : `0${minutes}:`
  const secondsStr =
    remainingSeconds > 10 ? `${remainingSeconds}` : `0${remainingSeconds}`

  return hoursStr + minutesStr + secondsStr
}
