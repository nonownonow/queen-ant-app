import { getNewProps } from 'components/utils/resolveProps'
import { defaults, identity } from 'fxjs2/Strict'
import React from 'react'

export default function Base (Comp: any) {
  return function BaseComp (props: any) {
    const _props = defaults({}, props, {
      id: null,
      label: null,
      className: null,
      onChange: identity,
      onClick: identity
    })
    const dataTypeProps = getNewProps(_props)
    return <Comp {..._props} {...dataTypeProps} />
  }
}
