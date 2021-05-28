import { ROUTE_MODE, ROUTE_TYPE } from 'components/type'
import React from 'react'
import { Link } from 'react-router-dom'
import checkNestedPath from 'components/utils/checkNestedPath'
import checkRouteType from 'components/utils/checkRouteType'

export function BaseUlBase ({
  parentPath = '',
  parentId = 'root',
  activeId = '',
  routes = [],
  isExpand = activeId.includes(parentId),
  onClick = (e: any, nestedId: any) => {
  },
  ...anyProps
}: any) {
  if (routes.length === 0) return null
  const { isLogin, isDesktop, ref, partial: p } = anyProps
  return (
    <p.Ul className={`${parentId} ${isExpand ? 'isExpand' : ''}`} ref={ref}>
      {routes.map((route: any) => {
        const nestedPath = checkNestedPath(route, parentPath)
        const nestedId = parentId + route.id
        let newRoute: any = route
        // clone in destructuring for preventing side effect
        if (route.mode === ROUTE_MODE.private) {
          // subRoute.type =
          newRoute = {
            ...route,
            type:
              route.type ||
              ((isLogin: any) => (isLogin ? ROUTE_TYPE.all : ROUTE_TYPE.none))
          }
        }

        return checkRouteType(newRoute, isLogin, isDesktop, true)
          ? (
            <p.Li key={nestedId} className={nestedId}>
              <ListLabel
                path={nestedPath}
                className={parentId}
                route={route}
                onClick={(e: any) => {
                  onClick(e, nestedId)
                }}
                {...anyProps}
              >
                {route.icon}
                {route.label}
              </ListLabel>
              <BaseUlBase
                parentPath={nestedPath}
                parentId={nestedId}
                activeId={activeId}
                routes={route.routes}
                onClick={onClick}
                {...anyProps}
              />
            </p.Li>
            )
          : null
      })}
    </p.Ul>
  )
}

function ListLabel ({ path = '', className, route, onClick, ...props }: any) {
  if (route.routes) return <button onClick={onClick}>{props.children}</button>
  return (
    <Link
      to={() => {
        return { pathname: Array.isArray(path) ? path[0] : path }
      }}
      onClick={() => props.onClickAnchor()}
    >
      {props.children}
    </Link>
  )
}
