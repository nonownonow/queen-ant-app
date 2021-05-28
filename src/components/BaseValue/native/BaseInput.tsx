export default {
  Box: (p: any) => <div {...p}>{p.children}</div>,
  Label: (p: any) => <label {...p}>{p.children}</label>,
  Input: ({ children, ref, ...p }: any) => (
    <>
      <input ref={ref} {...p} />
      {children}
    </>
  )
}
