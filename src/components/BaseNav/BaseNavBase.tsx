import React, { useState } from 'react'
import { BaseUlBase } from 'components/BaseNav/BaseUlBase'

export default function BaseNavBase ({ ref, ...props }: any) {
  const { partial: p, label, className } = props
  const [state, setState] = useState({
    activeId: '',
    isOpen: false
  })

  const onControl = React.useCallback((e) => {
    if (e.target === e.currentTarget) {
      setState({ ...state, activeId: 'root', isOpen: false })
    } else {
      setState({ ...state, isOpen: true })
    }
  }, [])

  return (
    <p.Nav
      className={`${className} ${state.isOpen ? 'isOpen' : ''}`}
      onClick={onControl}
      ref={ref}
    >
      <h1>{label}</h1>
      <BaseUlBase
        activeId={state.activeId}
        onClick={(e: any, activeId: any) => {
          setState({ ...state, activeId, isOpen: true })
        }}
        onClickAnchor={() => setState({ ...state, isOpen: false })}
        {...props}
      />
      {props.children}
    </p.Nav>
  )
}
