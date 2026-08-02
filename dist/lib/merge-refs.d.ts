import type { Ref } from 'react';
/**
 * Combine several refs into one callback ref, so a component can keep its own
 * internal ref on an element while still forwarding a consumer's `ref` to it.
 *
 * Returns a cleanup function, which React 19 calls on unmount — object refs are
 * reset to `null` and callback refs get their own cleanup honoured.
 */
export declare function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): (node: T) => () => void;
