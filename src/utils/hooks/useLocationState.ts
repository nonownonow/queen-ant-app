import { useHistory } from 'react-router-dom'

export function useLocationState (initValue: any) {
  const history = useHistory()
  const { state = initValue } = history.location

  function setState (state: any) {
    history.replace({ ...history.location, state })
  }

  return [state, setState] as const
}
