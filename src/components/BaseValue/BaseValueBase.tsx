import { multiRef } from 'components/utils/multiRef'
import React, { useRef } from 'react'
import { identity } from 'fxjs2/Strict'

export default function BaseValueBase ({ ref, ...props }: any) {
  // remove not native props in props
  const {
    data,
    dataProps,
    dataPicker,
    partial: p,
    children,
    className,
    id: cssId
  }: any = props
  return data.map((doc: any) => {
    return dataProps.map(
      ({ label, id, formatter = identity, ...dataProp }: any) => {
        const inputRef = useRef<any>()

        function handleClick (e: any) {
          props.onClick(e)
          dataProp.type === 'file' && inputRef.current.click()
        }

        const inputValue = doc[id]
        const inputId = `${id}${inputValue}`
        return (
          <p.Box key={id} id={cssId} className={className} data-id={inputValue}>
            <p.Input
              id={inputId}
              children={children}
              className={props.className}
              {...dataProp}
              onClick={handleClick}
              ref={ref}
              data-id={id}
              data-value={inputValue}
            />
            {label
              ? (
                <p.Label htmlFor={inputId}>{label}</p.Label>
                )
              : p.Label
                ? (
                  <p.Label htmlFor={inputId}>{formatter(inputValue)}</p.Label>
                  )
                : null}
            {dataProp.type === 'file'
              ? (
                <p.Input
                  {...dataProp}
                  style={{ display: 'none' }}
                  ref={multiRef([inputRef, ref])}
                />
                )
              : null}
          </p.Box>
        )
      }
    )
  })
}
