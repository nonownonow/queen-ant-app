import fetch from 'isomorphic-unfetch'

export async function fnlttSinglAcntAll (query) {
  const url = 'https://opendart.fss.or.kr/api/fnlttSinglAcntAll.json'
  const search = new URLSearchParams(query).toString()
  const href = `${url}?${search}`
  return await fetch(href).then(body => body.json())
}
