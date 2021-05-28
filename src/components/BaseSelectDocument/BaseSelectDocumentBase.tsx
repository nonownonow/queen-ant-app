import { go, isArray, map, object, pick } from 'fxjs2/Strict'
import React, { useState } from 'react'
import BaseDocument from 'components/BaseDocument/BaseDocument'

export default function BaseSelectDocumentBase ({
  data,
  dataProps,
  onChange,
  piece: p,
  baseRef,
  ...props
}: any) {
  const headerPiece = { ...p }
  headerPiece.Value = headerPiece.HeaderValue
  delete headerPiece.HeaderValue
  const [selected, setSelected] = useState<string[]>([])

  // useEffect(() => onChange(selected), [selected]);
  function checkSelected (id: string) {
    return selected.indexOf(id) !== -1
  }

  function handleClickAll (event) {
    if (selected.length === data.length) {
      setSelected([])
    } else {
      setSelected(data.map((v: any) => v.id))
    }
  }

  function handleClick (event: any, id: string) {
    const idIndex = selected.indexOf(id)
    let newSelected: string[] = []
    if (idIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (idIndex === 0) {
      newSelected = selected.slice(1)
    } else if (idIndex === selected.length - 1) {
      newSelected = selected.slice(0, -1)
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, idIndex),
        selected.slice(idIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const tableHeadData = [
    go(
      dataProps,
      map((v: any) => {
        const key = isArray(v.id) ? v.id[1] : v.id
        return [key, v.label]
      }),
      object
    )
  ]

  const tableHeadDataProps = dataProps.map((v: any) => {
    const doc = pick(['id'], v)
    if (isArray(doc.id)) {
      doc.id = doc.id[1]
    }
    return doc
  })
  return (
    <p.Collection
      piece={p}
      header={
        p.Header
          ? (
            <p.Header>
              <BaseDocument
                data={tableHeadData}
                dataProps={tableHeadDataProps}
                piece={headerPiece}
                isChecked={data.length > 0 && selected.length === data.length}
                onChange={handleClickAll}
              />
            </p.Header>
            )
          : null
      }
      baseRef={baseRef}
      {...props}
    >
      {data.map((document: any) => (
        <BaseDocument
          key={document.id}
          piece={p}
          data={document}
          dataProps={dataProps}
          isChecked={checkSelected(document.id)}
          onChange={handleClick}
          {...props}
        />
      ))}
      {props.children}
    </p.Collection>
  )
}
