import { compact, go, head, identity, indexBy, isArray, isEmpty, isObject, keys, map } from 'fxjs2/Strict'
import { Store } from 'store/Store'

const defaultDataProps: any = []

export function resolveData (data: any = [], dataProps = defaultDataProps) {
  // first of all
  if (!isArray(data)) {
    data = [data]
  }

  if (data[0] === undefined) {
    // dataProps[0].value can be  undefined
    data = dataProps[0] ? [{ id: dataProps[0].value || '' }] : [{ id: '' }]
  }
  if (isObject(dataProps)) {
    dataProps = [dataProps]
  }

  if (isEmpty(dataProps)) {
    dataProps = [{}]
  }
  //  if (typeof dataProps === 'object' && !Array.isArray(dataProps)) {
  // test - only short data
  const isStore = head(data) instanceof Store
  if (!isObject(head(data)) && !isStore) {
    const key = dataProps[0]?.id || 'value'
    data = data.map((v: any) => ({ id: v, [key]: v }))
  }
  return data
}

export function resolveDataProps (data: any, dataProps: any = [], props = {}) {
  if (!isObject(dataProps) && isEmpty(dataProps)) {
    return go(
      resolveData(data, dataProps),
      head,
      keys,
      map((key: any) => ({ id: key, ...props }))
    )
  }

  if (isObject(dataProps)) {
    return [dataProps]
  }

  return dataProps
}

//  except the key that is not including in dataProps
export function resolveProps ({
  data,
  dataProps = [],
  dataPicker,
  id,
  className,
  formatter,
  children,
  baseRef,
  ...props
}: any) {
  const _dataProps = resolveDataProps(data, dataProps, props)
  const _data = resolveData(data, _dataProps)
  return [_data, _dataProps]
}

export function getNewProps (props: any) {
  const [data, dataProps] = resolveProps(props)
  return {
    ...props,
    data,
    dataProps: pickDataProps(dataProps, props.dataPicker),
    dataPicker: undefined
  }
}

export function pickDataProps (dataProps: any, dataPicker: any) {
  const indexDataProps = indexBy((v: any) => {
    if (isArray(v.id)) {
      return v.id[1]
    }
    return v.id
  }, dataProps)
  if (dataPicker) {
    return go(
      dataPicker,
      map((newDataProps: any) => {
        if (isObject(newDataProps)) {
          const orgDataProps = indexDataProps[newDataProps.id]
          const { formatter: orgFormatter = identity } = orgDataProps
          const { formatter: newFormatter = identity } = newDataProps
          const formatter = (v: any, props: any) => newFormatter(v, props)
          return { ...orgDataProps, ...newDataProps, formatter }
        }
        // newDataProps is string
        return indexDataProps[newDataProps]
      }),
      compact
    )
  }
  return dataProps
}
