export type StateType = {
  assets: []
  loading: Boolean
}

const initialState: StateType = {
  assets: [],
  loading: false,
}

export type ActionType =
  | {
      type: 'SET_ASSETS'
      payload: {
        assets?: StateType['assets']
      }
    }
  | {
      type: 'SET_OCEAN_LOADING'
      payload: {
        loading?: StateType['loading']
      }
    }
  | {
      type: any
      payload: any
    }

const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {
  const { type, payload } = action
  switch (type) {
    case 'SET_ASSETS':
      return {
        ...state,
        assets: payload.assets || [],
      }
    case 'SET_OCEAN_LOADING':
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
