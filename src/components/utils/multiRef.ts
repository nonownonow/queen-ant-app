export function multiRef (refs: any) {
  return function (el: any) {
    refs.forEach((ref: any) => ref && (ref.current = el))
  }
}
