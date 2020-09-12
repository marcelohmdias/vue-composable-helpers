import toMq from 'json2mq'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useComputedState } from './useComputedState'

export function useMatchMedia(query: any, initial = false) {
  const mq = toMq(query)

  const mql = ref<MediaQueryList>()

  const [matches, setMatches] = useComputedState<boolean>(initial)
  const [media, setMedia] = useComputedState<string>('')
  const [error, setError] = useComputedState<boolean>(false)

  function mqlHandle(evt: MediaQueryListEvent) {
    setMatches(evt.matches)
    setMedia(evt.media)
  }

  function initMql() {
    mql.value = window.matchMedia(mq)

    setMatches(mql.value.matches)
    setMedia(mql.value.media)

    if (!mql.value) return setError(true)

    if (mql.value.addEventListener) {
      mql.value.addEventListener('change', mqlHandle)
    } else {
      mql.value.addListener(mqlHandle)
    }
  }

  function endMql() {
    if (!mql.value) return

    if (mql.value.removeEventListener) {
      mql.value.removeEventListener('change', mqlHandle)
    } else {
      mql.value.removeListener(mqlHandle)
    }
  }

  onMounted(initMql)

  onBeforeUnmount(endMql)

  return { error, matches, media }
}
