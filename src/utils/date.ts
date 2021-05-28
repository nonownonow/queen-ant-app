function taskTime (a: any, b: any) {
  let diff = Math.abs(a - b)
  const ms = diff % 1000
  diff = (diff - ms) / 1000
  const ss = diff % 60
  diff = (diff - ss) / 60
  const mm = diff % 60
  diff = (diff - mm) / 60
  const hh = diff % 24
  const days = (diff - hh) / 24
  return `${days}일 ${hh}시간 ${mm}분 ${ss}초`
}

export default {
  taskTime
}
