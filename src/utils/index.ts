import { mapObject } from 'fxjs2/Strict'

export { default as storage } from './storage'
export { default as dateForm } from './date'
// validation login needs

export function dateParse (d: any) {
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    time: d.getTime(),
    hours: d.getHours(),
    minutes: d.getMinutes(),
    seconds: d.getSeconds()
  }
}

export function replaceColl (coll: any, doc: any) {
  const index = coll.findIndex((v: any) => v.id === doc.id)
  coll[index] = { ...coll[index], ...doc }
  return coll
}

export function scannerValidation (type: string, data: string) {
  if (type === 'tote') {
    return data
  }
  return data
}

export function dateToString (d, withTime = false, withElapsedMinute = false) {
  const { year, month, date, hours, minutes, seconds } = mapObject(
    (v: any) => String(v).padStart(2, '0'),
    dateParse(d)
  )
  if (withTime) {
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`
  }
  if (withElapsedMinute) {
    const recentTime = d.getTime()
    const now: any = Date.now()
    const elapsedMinutes = Math.round((now - recentTime) / 1000 / 60)
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds} (${elapsedMinutes}분 전)`
  }

  return `${year}/${month}/${date}`
}

export function dateToStringWithElapsed (d) {
  const { year, month, date, hours, minutes, seconds } = mapObject(
    (v: any) => String(v).padStart(2, '0'),
    dateParse(d)
  )
  const recentTime = d.getTime()
  const now: any = Date.now()
  const elapsedMinutes = Math.round((now - recentTime) / 1000 / 60)
  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds} (${elapsedMinutes}분 전)`
}
