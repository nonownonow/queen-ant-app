import { identity } from 'fxjs2/Strict'
import React from 'react'

export default function BaseSelectValueBase ({
  ref,
  partial: p,
  label,
  data,
  dataProps,
  dataPicker,
  className,
  onChange,
  ...props
}: any) {
  return dataProps.map((dataProp: any) => {
    const { id: dataPropId, formatter = identity } = dataProp
    return (
      <div
        {...props}
        id={props.id}
        className={className}
        data-id={dataPropId}
        key={dataPropId}
      >
        <p.Label {...props}>{label}</p.Label>
        <p.Select ref={ref}>
          {data.map((doc: any) => {
            return (
              <p.Option
                {...props}
                key={doc.id}
                data={doc}
                dataProps={dataProp}
                data-id={doc.id}
                onChange={onChange}
              />
            )
          })}
        </p.Select>
      </div>
    )
  })
}
