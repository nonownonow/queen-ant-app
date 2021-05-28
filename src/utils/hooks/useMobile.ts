import React from 'react'
// import config from 'configs/config'
// import { debounce } from 'fxjs2/Strict'

// let handleResize: any
// let handleDelayResize: any
export default function useMobile (initValue = true) {
  const [isMobile, setIsMobile] = React.useState(initValue)

  // useMemo(() => {

  //   handleResize = function () {
  //     setIsMobile(config.mobileSize >= window.innerWidth)
  //   }
  //   handleDelayResize = debounce(handleResize, config.delay)
  // }, [])

  // useLayoutEffect(() => {
  //   console.log(navigator.userAgent)

  //   handleResize()
  //   window.addEventListener('resize', handleDelayResize)
  //   return () => {
  //     window.removeEventListener('resize', handleDelayResize)
  //   }
  // }, [isMobile])

  React.useLayoutEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsMobile(isMobile)
  }, [])

  return [isMobile]
}
