export type StateType = {
  protocols: []
  loading: Boolean
}

const initialState: StateType = {
  protocols: [],
  loading: false,
}

export type ActionType = {
  type: 'SET_PROTOCOLS'
  payload: {
    protocols?: StateType['protocols']
  }
} | {
  type: 'SET_DEFI_LOADING'
  payload: {
    loading?: StateType['loading']
  } 
} | {
  type: any
  payload: any
}

const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {
  const { type, payload } = action
  switch (type) {
    case 'SET_PROTOCOLS':
      return {
        ...state,
        protocols: payload?.protocols || [],
      }
    case 'SET_DEFI_LOADING':
      return {
        ...state,
        loading: payload?.loading || false,
      }
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>

export default reducer
