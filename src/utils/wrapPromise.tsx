export function wrapPromise(promise: Promise<any>) {
  let status = 'pending'
  let result: any
  let suspender = promise.then(
    r => {
      status = 'success'
      result = r
    },
    e => {
      status = 'error'
      result = 'have bug'
    },
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    },
  }
}
//todo 有bug
