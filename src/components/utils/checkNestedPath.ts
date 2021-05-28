export default function (route: any, parentPath: any, rootPath = '') {
  let path: any = parentPath === '/' ? '' : rootPath + parentPath
  let nestedPath: any
  if (Array.isArray(route.path)) {
    path = path || Array(route.path.length).fill('')
    nestedPath = route.path.map((v: any, i: any) => path[i] + route.path[i])
  } else {
    nestedPath = path + (route.path || '')
  }
  return nestedPath
}
