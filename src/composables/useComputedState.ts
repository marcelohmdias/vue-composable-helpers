import { computed, ComputedRef, ref, UnwrapRef } from 'vue'

type ComposableGetter<T> = ComputedRef<UnwrapRef<T | undefined>>
type ComposableSetter<T> = (value: T | undefined) => void
type ComposableState<T> = [ComposableGetter<T>, ComposableSetter<T>]

export function useComputedState<T>(initial: T | undefined = undefined): ComposableState<T> {
  const data = ref<T | undefined>(initial)

  const getter = computed(() => data.value)

  function setter(value: T | undefined) {
    data.value = <UnwrapRef<T>>value
  }

  return [getter, setter]
}
