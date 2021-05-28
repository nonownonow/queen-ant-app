import React, { forwardRef } from 'react'
import NativeRouterNav from 'components/BaseRouteNav/NativeRouterNav'

function BaseNav (props: any, ref: any) {
  // console.log('baseNavUl update')
  // TODO: cloneDeep the routes in props here
  return <NativeRouterNav {...props} ref={ref}/>
}

export default forwardRef(BaseNav)
