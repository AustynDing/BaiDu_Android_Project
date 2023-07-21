export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursStr = hours > 0 ? `${hours}时` : '';
    const minutesStr = minutes > 0 ? `${minutes}分` : '';
    const secondsStr = remainingSeconds > 0 ? `${remainingSeconds}秒` : '';

    return hoursStr + minutesStr + secondsStr;
}