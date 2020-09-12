import { isReadonly, isRef } from 'vue'

import { usePromise } from '../src'

const promise = (timer: number, success: boolean): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(true)
      } else {
        reject(new Error('Fail'))
      }
    }, timer)
  })
}

describe('usePromise', () => {
  it('should be a readonly value.', () => {
    const { data, error, isError, isPending, isSuccess } = usePromise<boolean>(promise(0, true))

    expect(isReadonly(data)).toBeTruthy()
    expect(isReadonly(error)).toBeTruthy()
    expect(isReadonly(isError)).toBeTruthy()
    expect(isReadonly(isPending)).toBeTruthy()
    expect(isReadonly(isSuccess)).toBeTruthy()
  })

  it('should be a reactive ref value.', () => {
    const { data, error, isError, isPending, isSuccess } = usePromise<boolean>(promise(0, true))

    expect(isRef(data)).toBeTruthy()
    expect(isRef(error)).toBeTruthy()
    expect(isRef(isError)).toBeTruthy()
    expect(isRef(isPending)).toBeTruthy()
    expect(isRef(isSuccess)).toBeTruthy()
  })

  it('should have a truthy pending value.', () => {
    const { isPending } = usePromise<boolean>(promise(100, true))

    expect(isPending.value).toBeTruthy()

    setTimeout(() => expect(isPending.value).toBeFalsy())
  })

  it('should have a success promise value.', () => {
    const { data, isSuccess } = usePromise<boolean>(promise(0, true))

    setTimeout(() => {
      expect(data.value).toBeTruthy()
      expect(isSuccess.value).toBeTruthy()
    })
  })

  it('should have an error promise value.', () => {
    const { error, isError } = usePromise<boolean>(promise(0, true))

    setTimeout(() => {
      expect(error.value).toBeTruthy()
      expect(isError.value).toThrowError()
    })
  })
})
