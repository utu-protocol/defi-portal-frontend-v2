export type StateType = {
    provider?: any
    web3Provider?: any
    address?: string | null
    chainId?: number | null
  }
  
  const initialState: StateType = {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
  }
  
  export type ActionType =
    | {
        type: 'SET_WEB3_PROVIDER'
        payload: {
          provider?: StateType['provider']
          web3Provider?: StateType['web3Provider']
          address?: StateType['address']
          chainId?: StateType['chainId']
        }
      }
    | {
        type: 'SET_ADDRESS'
        payload: {
          address?: StateType['address']
        }
      }
    | {
        type: 'SET_CHAIN_ID'
        payload: {
          chainId?: StateType['chainId']
        }
      }
    | {
        type: 'RESET_WEB3_PROVIDER'
        payload: any
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
      case 'SET_WEB3_PROVIDER':
        return {
          ...state,
          provider: payload?.provider,
          web3Provider: payload?.web3Provider,
          address: payload?.address,
          chainId: payload?.chainId,
        }
      case 'SET_ADDRESS':
        return {
          ...state,
          address: payload?.address,
        }
      case 'SET_CHAIN_ID':
        return {
          ...state,
          chainId: payload?.chainId,
        }
      case 'RESET_WEB3_PROVIDER':
        return initialState
      default:
        return state
    }
  }
  
  export type RootState = ReturnType<typeof reducer>
  
  export default reducer
  