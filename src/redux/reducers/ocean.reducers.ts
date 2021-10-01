export type StateType = {
  assets: []
}

const initialState: StateType = {
  assets: [],
}

export type ActionType = {
  type: 'SET_ASSETS'
  payload: {
    assets?: StateType['assets']
  }
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
    default:
      return state
  }
}

export type RootState = ReturnType<typeof reducer>

export default reducer
