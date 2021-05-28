export function getAppEnvLabel (appEnv) {
  let appType
  switch (appEnv) {
    case 'canary':
      appType = 'canary'
      break
    case 'development':
      appType = '개발'
      break
    case 'production':
      appType = '운영'
      break
    case 'staging':
      appType = '2cc'
      break
  }
  return appType
}
