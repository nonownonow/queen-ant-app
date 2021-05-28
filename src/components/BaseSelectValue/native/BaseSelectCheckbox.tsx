import React from 'react'
import BaseValue from 'components/BaseValue/BaseValue'

export default {
  Select: (p: any) => <div {...p}>{p.children}</div>,
  Label: (p: any) => <label {...p}>{p.children}</label>,
  Option: (p: any) => <BaseValue {...p}>{p.children}</BaseValue>
}
