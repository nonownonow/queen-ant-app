import BaseInput from 'components/BaseValue/native/BaseInput'
import React from 'react'
import Base from 'components/Base'
import BaseValueBase from 'components/BaseValue/BaseValueBase'
import BaseButton from 'components/BaseValue/native/BaseButton'

function BaseValue (props: any) {
  const { type } = props
  const partial: any = {
    checkbox: BaseInput,
    radio: BaseInput,
    text: BaseInput,
    number: BaseInput,
    file: BaseInput,
    submit: BaseButton,
    reset: BaseButton,
    button: BaseButton
  }
  return <BaseValueBase partial={partial[type]} {...props} />
}

export default Base(BaseValue)
