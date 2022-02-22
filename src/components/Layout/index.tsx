/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useCallback, useEffect } from 'react'
import { Helmet as Head } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux'
import { getChainData } from '../../lib/utilities'
import Navigation from '../Navigation'
import styles from './layout.module.css'
import {
  connect as connectAction,
  initWallet,
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
    (state: any) => state.wallet
  )
  const web3Modal = getWeb3Modal()
  const dispatch = useDispatch()
  // const [isLoading, setLoading] = useState(false)
  const connect = useCallback(async (reload = true) => {
    await dispatch(connectAction(reload));
    if (reload) window.location.reload();
  }, [])

  const disconnect = useCallback(() => dispatch(disconnectAction()), [provider])

  // Auto connect to the cached provider
  useEffect(() => {
    dispatch(initWallet())
  }, [])
  
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
