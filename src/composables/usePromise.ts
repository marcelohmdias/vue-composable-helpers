import { useComputedState } from './useComputedState'

export function usePromise<T>(promisable: Promise<T>) {
  const [isError, setIsError] = useComputedState<boolean>(false)
  const [isPending, setIsPending] = useComputedState<boolean>(true)
  const [isSuccess, setIsSuccess] = useComputedState<boolean>(false)

  const [data, setData] = useComputedState<T | null>(null)
  const [error, setError] = useComputedState<unknown | null>(null)

  promisable.then((data: T) => {
    setData(data)
    setIsSuccess(true)
  })

  promisable.catch((error: unknown) => {
    setError(error)
    setIsError(true)
  })

  promisable.finally(() => {
    setIsPending(false)
  })

  return {
    data,
    error,
    isError,
    isPending,
    isSuccess
  }
}
