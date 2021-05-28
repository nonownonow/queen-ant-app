import React from 'react'
import { Switch } from 'react-router-dom'
import { BaseRoute } from 'components/BaseRoute/BaseRoute'

export function BaseRouteSwitch ({ routes = [], ...props }: any) {
  // todo: clone the routes here
  const Routes = routes.flatMap((route: any) =>
    BaseRoute({ ...props, ...route })
  )
  return routes.length !== 0 ? <Switch>{Routes}</Switch> : null
}
