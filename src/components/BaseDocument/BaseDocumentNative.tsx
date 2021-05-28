import BaseDocumentBase from 'components/BaseDocument/BaseDocumentBase'
import BaseValue from 'components/BaseValue/BaseValue'
import React from 'react'

export default function BaseDocumentNative ({ data, ...props }: any) {
  const piece = {
    Document: (p: any) => (
      <dl id={p.id} className={p.className}>
        {p.children}
      </dl>
    ),
    Entry: (p: any) => <div className={p.className}>{p.children}</div>,
    Key: (p: any) => <dt>{p.children}</dt>,
    Value: (p: any) => <dd>{p.children}</dd>,
    Checkbox: p => <BaseValue type={'checkbox'} {...p} />
  }
  return (
    <BaseDocumentBase
      data={data[0]}
      {...props}
      piece={{ ...piece, ...props.piece }}
    />
  )
}
