import React from 'react'
import Base from 'components/Base'
import BaseNavBase from 'components/BaseNav/BaseNavBase'
import Nav from 'components/BaseNav/native/Nav'

function BaseNav (props: any) {
  const partial = Nav
  return <BaseNavBase partial={partial} {...props} />
}

export default Base(BaseNav)
