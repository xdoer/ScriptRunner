import { access, constants } from 'fs'

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

export async function promiseAccess(path: string) {
  return new Promise((resolve, reject) => {
    access(path, constants.F_OK | constants.W_OK, (err) => {
      if (err) reject(`${path} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`)
      resolve(path)
    })
  })
}
