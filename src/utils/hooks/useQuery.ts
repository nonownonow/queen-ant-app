import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

let query = new URLSearchParams()
export function useQuery () {
  const history = useHistory()
  query = useMemo(() => new URLSearchParams(history.location.search), [
    history.location.search
  ])
  function setQuery (query: any) {
    for (const [key, value] of query) {
      if (value === '') {
        query.delete(key)
      }
    }
    history.push({ ...history.location, search: query.toString() })
  }
  return [query, setQuery] as const
}
