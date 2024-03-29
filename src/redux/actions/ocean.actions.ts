import { apiRequest } from '../../api'
import { CORE_API_URL } from '../../Config'

export const setLoading = (value: boolean) => async (dispatch: any) => {
  dispatch({
    type: 'SET_OCEAN_LOADING',
    payload: {
      loading: value,
    },
  })
}

export const getAssetDetails =
  ({ token }: { token: string }) =>
  async (dispatch: any, getState: any) => {
    dispatch(setLoading(true))
    const address = getState().wallet.address

    const data = {
      sourceCriteria: JSON.stringify({
        type: 'Address',
        ids: { address: String(address).toLowerCase() },
      }),
      targetCriteria: JSON.stringify({
        type: 'Asset',
        ids: {
          address_datatoken: token,
        },
      }),
    }
    const res = await apiRequest.get(
      `${CORE_API_URL}/interactionSummary?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )

    const { result } = res.data
    dispatch(setLoading(false))
    return result
  }

export const fetchAssets = () => async (dispatch: any, getState: any) => {
  const address = getState().wallet.address
  dispatch(setLoading(true))
  const data = {
    sourceCriteria: JSON.stringify({
      type: 'Address',
      ids: { address: String(address).toLowerCase() },
    }),
    targetType: 'Asset',
  }
  try {
    const res = await apiRequest.get(
      `${CORE_API_URL}/ranking?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = res.data

    dispatch(setLoading(false))

    dispatch({
      type: 'SET_ASSETS',
      payload: {
        assets: result,
      },
    })
    return result
  } catch (e) {
    // handle error
    console.log(e)
    return []
  }
}
