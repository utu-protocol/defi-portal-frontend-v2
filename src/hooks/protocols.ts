import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { getSortedProviders } from '../api'
import { setProtocols, setLoading } from '../redux/actions/defi.actions'
import { useDispatch } from 'react-redux'

export function useProtocols() {
  // const [protocols, setProtocols] = useState<IProtocol[]>();
  const dispatch = useDispatch()
  const { ethAddress, protocols, loading } = useSelector(
    ({ wallet, defi }: any) => {
      return {
        ethAddress: wallet.address,
        protocols: defi.protocols,
        loading: defi.loading,
      }
    }
  )

  const triggerSubscriptionAndGetProtocols = useCallback(() => {
    const cancelTokenSource = axios.CancelToken.source()
    if (!ethAddress) return cancelTokenSource;
    dispatch(setLoading(true))
    getSortedProviders(ethAddress, cancelTokenSource.token, true)
      .then((response: any) => {
        console.info(
          `${new Date().toLocaleTimeString()} Triggered Subscription and Retrieved ratings`
        )
        dispatch(setLoading(false))
        return dispatch(setProtocols(response.data.result))
      })
      .catch(handleError)

    return cancelTokenSource

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress])

  const getProtocols = useCallback(() => {
    const cancelTokenSource = axios.CancelToken.source()
    dispatch(setLoading(true))
    getSortedProviders(ethAddress, cancelTokenSource.token)
      .then((response: any) => {
        dispatch(setLoading(false))
        console.info(`${new Date().toLocaleTimeString()} Retrieved ratings`)
        return dispatch(setProtocols(response.data.result))
      })
      .catch(handleError)

    return cancelTokenSource

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethAddress])

  function handleError(error: Error) {
    if (!axios.isCancel(error)) {
      throw error
    }
  }

  return {
    loading,
    protocols,
    getProtocols,
    triggerSubscriptionAndGetProtocols,
  }
}
