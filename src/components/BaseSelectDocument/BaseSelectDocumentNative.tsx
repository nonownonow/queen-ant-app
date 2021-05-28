import BaseSelectDocumentBase from 'components/BaseSelectDocument/BaseSelectDocumentBase'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useDesktop } from 'utils/hooks/useDesktop'

import { TABLE_MODE } from 'components/BaseSelectDocument/BaseSelectDocument.type'

export default function BaseSelectDocumentNative ({ mode, ...props }: any) {
  const [isDesktop] = useDesktop()
  const tbodyRef: any = useRef()
  const [state, setState] = useState({
    currentScroll: 0
  })
  useLayoutEffect(() => {
    // tbodyRef.current.scrollTop = state.currentScroll;
    // console.log(state.currentScroll);
  }, [state.currentScroll])
  const documentMode =
    mode === undefined
      ? isDesktop
        ? TABLE_MODE.TABLE
        : TABLE_MODE.CARD
      : mode
  /*  const handlerScroll = debounce(target => {
    setState(state => ({ ...state, currentScroll: target.scrollTop }));
  }, 500); */
  const tablePiece = {
    Caption: p => <caption>{p.children}</caption>,
    Collection: (p: any) => (
      <table id={p.id} className={p.className} ref={p.baseRef}>
        {p.label ? <p.piece.Caption>{p.label}</p.piece.Caption> : null}
        {p.header}
        <tbody ref={tbodyRef}>{p.children}</tbody>
      </table>
    ),
    Header: p => <thead>{p.children}</thead>,
    HeaderValue: (p: any) => (
      <th className={p.className} {...p}>
        {p.children}
      </th>
    ),
    Document: (p: any) => <tr {...p}>{p.children}</tr>,
    Value: (p: any) => {
      return <td {...p}>{p.children}</td>
    },
    Entry: null,
    Key: null
  }

  const cardPiece = {
    Collection: (p: any) => (
      <ul id={p.id} className={p.className}>
        {p.children}
      </ul>
    ),
    Document: (p: any) => (
      <li>
        <dl>{p.children}</dl>
      </li>
    )
  }

  const piece = documentMode === TABLE_MODE.TABLE ? tablePiece : cardPiece
  return <BaseSelectDocumentBase {...props} piece={piece}/>
}
