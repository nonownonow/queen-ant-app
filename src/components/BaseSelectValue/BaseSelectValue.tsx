import BaseSelectCheckbox from 'components/BaseSelectValue/native/BaseSelectCheckbox'
import React from 'react'
import BaseSelectValueBase from 'components/BaseSelectValue/BaseSelectValueBase'
import Base from 'components/Base'

function BaseSelectValue ({ mode = 'checkbox', ...props }: any) {
  const partial: any = {
    checkbox: BaseSelectCheckbox
  }

  return <BaseSelectValueBase partial={partial[mode]} {...props} />
}

export default Base(BaseSelectValue)
