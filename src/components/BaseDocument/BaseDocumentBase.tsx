import React, { useLayoutEffect } from 'react'
import { identity, isArray, isNil } from 'fxjs2/Strict'

export default function BaseDocumentBase (props: any) {
  const {
    data,
    dataProps,
    name,
    onChange,
    piece: p,
    isChecked,
    placeholder = '데이터가 없습니다.'
  } = props
  const isEmpty = data.id === ''
  useLayoutEffect(() => {
  }, [])
  return (
    <p.Document data-id={data.id}>
      {isEmpty ? (
        <p.Value colSpan={dataProps.length}> {placeholder} </p.Value>
      ) : (
        [
          /* <p.Value key="input">
            <p.Checkbox
              name={name}
              value={data.id}
              onChange={(e) => onChange(e, e.target.value)}
              checked={isChecked}
            />
          </p.Value>, */
          ...dataProps.map(
            ({ id, label, formatter = identity, ...dataProp }: any) => {
              const newFormatter = (data: any, props: any) =>
                !isNil(data) && formatter(data, props)
              const newId = isArray(id) ? id[1] : id
              const newValue = isArray(id) ? data[id[0]] : data[id]
              const Value = (
                <p.Value
                  {...dataProp}
                  key={newId}
                  data-id={newId}
                  data-value={newValue}
                >
                  {newFormatter(newValue, props)}
                </p.Value>
              )
              return p.Entry
                ? (
                  <p.Entry data-id={id} key={id}>
                    <p.Key>{label}</p.Key>
                    {Value}
                  </p.Entry>
                  )
                : (
                    Value
                  )
            }
          )
        ]
      )}
      {props.children}
    </p.Document>
  )
}
