export function promiseAny<T>(promises: Promise<any>[]): Promise<T> {
  const rejectList: any = []
  let promisesLength = promises.length

  if (!promisesLength) return Promise.reject([])

  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve).catch(e => {
        rejectList.push(e)
        promisesLength--
        if (!promisesLength) reject(rejectList)
      })
    })
  })
}
