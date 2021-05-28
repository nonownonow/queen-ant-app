import Base from 'components/Base'
import BaseDocumentNative from 'components/BaseDocument/BaseDocumentNative'
import React from 'react'

function BaseDocument (props: any) {
  return <BaseDocumentNative {...props} />
}

export default Base(BaseDocument)
