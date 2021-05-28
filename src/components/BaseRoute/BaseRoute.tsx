import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import checkNestedPath from 'components/utils/checkNestedPath'
import checkRouteType from 'components/utils/checkRouteType'
import { ROUTE_MODE, ROUTE_TYPE } from 'components/BaseRoute/type'
// TODO: (props)=>({...props})
// this must not be Component, just function returned Route component
export function BaseRoute ({
  mode = ROUTE_MODE.public, // mode는 parent를 따라야한다. 그래서 따로 빼냄.
  type = ROUTE_TYPE.all, // type은 parent를 따라야한다. 그래서 따로 빼냄
  rootPath = '',
  parentPath = '',
  ...route
}: any) {
  const { isLogin, isDesktop } = route
  route.path = checkNestedPath(route, parentPath, rootPath)
  if (route.mode === undefined) route.mode = mode // 재귀 할 시 route는 subRoute이다.
  if (route.type === undefined) route.type = type
  if (route.component) {
    const isValid = checkRouteType(route, isLogin, isDesktop, false)
    route.routes =
      route.routes &&
      route.routes.map((subRoute: any) => {
        subRoute.type = subRoute.type || route.type
        subRoute.mode = subRoute.mode || route.mode
        return subRoute
      })
    return isValid
      ? (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          render={(routeProps) => {
            return isLogin ||
            route.mode === undefined ||
            route.mode === ROUTE_MODE.public
              ? (
                <route.component
                  {...routeProps}
                  {...route.componentProps}
                  rootPath={route.path}
                  routes={route.routes}
                  {...{ isLogin, isDesktop }}
                />
                )
              : (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: routeProps.location }
                  }}
                />
                )
          }}
        />
        )
      : null
  }
  if (!route.routes) return null

  return route.routes.flatMap((subRoute: any) =>
    BaseRoute({
      ...route,
      ...subRoute,
      ...{ parentPath: route.path, mode, type }
    })
  )
}
