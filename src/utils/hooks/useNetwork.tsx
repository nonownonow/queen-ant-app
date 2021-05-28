import KurlyDialog from 'components/KurlyDialog'
import React, { useState, useLayoutEffect, createContext } from 'react'
import styled from 'styled-components'
export const NetWorkContext = createContext(undefined)
export default function NetworkProvider ({ children }: any) {
  const [online, setOnline] = useState(true)
  useLayoutEffect(() => {
    window.addEventListener('online', () => {
      setOnline(true)
    })
    window.addEventListener('offline', () => {
      setOnline(false)
    })
  }, [])

  return (
    <NetWorkContext.Provider value={[online, setOnline]}>
      {children}
      <KurlyDialog isOpen={!online}>
        <Message>
          <span>네트워크 연결 오류</span>
          <span>잠시 후 다시 시도해주세요.</span>
        </Message>
      </KurlyDialog>
    </NetWorkContext.Provider>
  )
}

const Message = styled.p`
  display: flex;
  width: 200%;
  transform: translateX(-25%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: white;
  font-size: 4rem;
  height: 100%;
  font-weight: bold;
`
