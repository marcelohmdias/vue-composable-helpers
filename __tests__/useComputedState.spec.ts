import { isRef, isReadonly } from 'vue'

import { useComputedState } from '../src'

describe('useComputedState', () => {
  it('should have an initial value.', () => {
    const [getter] = useComputedState<number>(1)
    expect(getter.value).toBe(1)
  })

  it('should be a function.', () => {
    // eslint-disable-next-line no-unused-vars
    const [_, setter] = useComputedState<number>(1)
    expect(typeof setter).toBe('function')
  })

  it('should change the initial value.', () => {
    const [getter, setter] = useComputedState<number>()

    expect(getter.value).toBeUndefined()

    setter(1)

    expect(getter.value).toBe(1)
  })

  it('should be a reactive ref value.', () => {
    const [getter] = useComputedState<number>(1)

    expect(isRef(getter)).toBeTruthy()
  })

  it('should be a readonly value.', () => {
    const [getter] = useComputedState<number>(1)

    expect(isReadonly(getter)).toBeTruthy()
  })
})
