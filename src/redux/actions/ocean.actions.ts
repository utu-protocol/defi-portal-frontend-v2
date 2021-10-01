export const getAssetDetails =
  ({ token }: { token: string }) =>
  async (dispatch: any, getState: any) => {
    const address = getState().wallet.address
    const data = {
      sourceCriteria: JSON.stringify({
        type: 'User',
        ids: { address },
      }),
      targetCriteria: JSON.stringify({
        type: 'Asset',
        ids: {
          address_datatoken: token,
        },
      }),
    }
    const res = await fetch(
      `${
        process.env.REACT_APP_UTU_API_BASE_URL
      }/interactionSummary?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = await res.json()

    return result
  }

export const fetchAssets = () => async (dispatch: any, getState: any) => {
  const address = getState().wallet.address
  const data = {
    sourceCriteria: JSON.stringify({
      type: 'User',
      ids: { address },
    }),
    targetType: 'Asset',
  }
  const res = await fetch(
    `${process.env.REACT_APP_UTU_API_BASE_URL}/ranking?${new URLSearchParams(
      Object.entries(data)
    ).toString()}`
  )
  const { result } = await res.json()
  dispatch({
    type: 'SET_ASSETS',
    payload: {
      assets: result,
    },
  })
  return result
}
