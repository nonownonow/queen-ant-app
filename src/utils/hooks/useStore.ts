import { useLayoutEffect, useMemo, useState } from 'react'
import { Store } from 'store/Store'

export function useStore (Store: any, initStore?: any) {
  const [store, setStore] = useState(new Store())
  useMemo(() => store.init(setStore, initStore), [setStore])
  return store
}
