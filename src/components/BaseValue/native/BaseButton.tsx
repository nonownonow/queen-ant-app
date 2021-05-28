export default {
  Box: (p: any) => p.children,
  Label: null,
  Input: ({ children, ref, ...p }: any) => (
    <>
      <input ref={ref} {...p} />
      {children}
    </>
  )
}
