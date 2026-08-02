import type { Ref } from 'react'

/**
 * Combine several refs into one callback ref, so a component can keep its own
 * internal ref on an element while still forwarding a consumer's `ref` to it.
 *
 * Returns a cleanup function, which React 19 calls on unmount — object refs are
 * reset to `null` and callback refs get their own cleanup honoured.
 */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === 'function') return ref(node)
      if (ref) ref.current = node
      return undefined
    })

    return () => {
      cleanups.forEach((cleanup, i) => {
        if (typeof cleanup === 'function') {
          cleanup()
          return
        }
        const ref = refs[i]
        if (typeof ref === 'function') ref(null as T)
        else if (ref) ref.current = null
      })
    }
  }
}
