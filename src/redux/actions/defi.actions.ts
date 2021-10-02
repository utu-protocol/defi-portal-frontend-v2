export const setLoading = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: 'SET_DEFI_LOADING',
    payload: {
      loading: value,
    },
  })
}

export const setProtocols = (protocols: any[]) => async (dispatch: any) => {
  dispatch({
    type: 'SET_PROTOCOLS',
    payload: {
      protocols,
    },
  })
}
