import { mapL, go, takeAll } from 'fxjs2'
export function pivot (coll) {
  return go(
    coll,
    mapL((obj) => new Map(Object.entries(obj))),
    takeAll
  )
}
