import { all, isEmpty, isNil } from 'fxjs2/Strict'

export function getIsWord (str: string) {
  return all([!isNil(str), !isEmpty(str)])
}
