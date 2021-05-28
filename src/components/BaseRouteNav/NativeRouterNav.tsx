import React, { useState } from 'react'
import { NativeRouterNavUl } from 'components/BaseRouteNav/NativeRouterNavUl'

export default function NativeRouterNav ({ ref, ...anyProps }: any) {
  const [state, setState] = useState({
    activeId: '',
    isOpen: false
  })

  const onControl = React.useCallback((e) => {
    if (
      e.target === e.currentTarget ||
      e.target.dataset?.type === 'controller'
    ) {
      setState({ ...state, activeId: 'root', isOpen: false })
    }
  }, [])

  return (
    <nav
      className={`NativeRouterNav ${state.isOpen ? 'isOpen' : ''}`}
      onClick={onControl}
      ref={ref}
    >
      <NativeRouterNavUl
        activeId={state.activeId}
        onClick={(e: any, activeId: any) => {
          setState({ ...state, activeId, isOpen: true })
        }}
        onClickAnchor={() => setState({ ...state, isOpen: false })}
        {...anyProps}
      />
    </nav>
  )
}
