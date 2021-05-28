import { config } from 'react-app-config'
import { debounce } from 'fxjs2/Strict'
import { useEffect, useMemo, useState } from 'react'

let handleResize: any
let handleDelayResize: any
export function useDesktop (initValue = false) {
  const [isDesktop, setIsDesktop] = useState(initValue)

  useMemo(() => {
    handleResize = function () {
      setIsDesktop(config.mobileSize < window.innerWidth)
    }
    handleDelayResize = debounce(handleResize, config.delay)
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleDelayResize)
    return () => {
      window.removeEventListener('resize', handleDelayResize)
    }
  }, [isDesktop])

  return [isDesktop]
}
