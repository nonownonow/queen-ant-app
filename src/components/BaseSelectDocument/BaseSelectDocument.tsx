import Base from 'components/Base'
import BaseSelectDocumentNative from 'components/BaseSelectDocument/BaseSelectDocumentNative'
import React from 'react'

function BaseSelectDocument (props: any) {
  return <BaseSelectDocumentNative {...props} />
}

export default Base(BaseSelectDocument)
