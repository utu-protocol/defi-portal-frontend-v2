/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useCallback, useEffect } from 'react'
import { Helmet as Head } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux'
import { getChainData } from '../../lib/utilities'
import Navigation from '../Navigation'
import styles from './layout.module.css'
import {
  connect as connectAction,
  disconnect as disconnectAction,
  getWeb3Modal,
} from '../../redux/actions/wallet.actions'

export default function Layout({
  title,
  children,
}: {
  title?: string
  children: ReactElement | ReactElement[]
}): ReactElement {
  const { provider, web3Provider, address, chainId } = useSelector(
    (state: any) => state
  )
  const web3Modal = getWeb3Modal()
  const dispatch = useDispatch()
  // const [isLoading, setLoading] = useState(false)
  const connect = useCallback(() => dispatch(connectAction()), [])

  const disconnect = useCallback(() => dispatch(disconnectAction()), [provider])

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          payload: {
            address: accounts[0],
          },
        })
      }

      const handleChainChanged = (accounts: string[]) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts)
        dispatch({
          type: 'SET_ADDRESS',
          payload: {
            address: accounts[0],
          },
        })
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  const chainData = getChainData(chainId)

  return (
    <div className="bg-primary h-80">
      <Head>
        <title>DeFi Recommendation Portal</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation
        // isLoading={isLoading}
        connect={connect}
        disconnect={disconnect}
        web3Provider={web3Provider}
        address={address}
        chainData={chainData}
      />
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.children}>{children}</div>
    </div>
  )
}
