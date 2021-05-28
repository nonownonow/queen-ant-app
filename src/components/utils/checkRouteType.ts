import { ROUTE_TYPE } from 'components/type'

export default function (
  subRoute: any,
  isLogin: any,
  isDesktop: any,
  isNav: any
) {
  // console.log('----->routeType', subRoute.type, subRoute.label)
  let isValid: any
  const routeType =
    typeof subRoute.type === 'function'
      ? subRoute.type(isLogin)
      : subRoute.type

  switch (routeType) {
    case ROUTE_TYPE.none:
      isValid = !isNav
      break
    case ROUTE_TYPE.mobile:
      isValid = !isDesktop
      break
    case ROUTE_TYPE.desktop:
      isValid = isDesktop
      break
    default:
      isValid = true
  }
  return isValid
}
