import Onboard from 'bnc-onboard'
import { API } from 'bnc-onboard/dist/src/interfaces'
import { useDispatch } from 'react-redux'
import { setMetaAddress, setMetaBalance } from '../reduxSlice/metaMaskSlice'
// import { useHistory } from 'react-router-dom';

const initializationOptions = {
  networkId: 1,
  walletSelect: {
    wallets: [
      { walletName: 'coinbase', preferred: true },
      { walletName: 'metamask', preferred: true },
    ],
  },
}

let onboard: API | undefined

export function useOnboard() {
  // const history = useHistory();
  const dispatch = useDispatch()

  if (!onboard) {
    onboard = Onboard({
      ...initializationOptions,
      subscriptions: {
        wallet: (wallet: any) => console.log('wallet', wallet),
        address: (address: string) => {
          dispatch(setMetaAddress(address))
        },
        network: (network: number) => console.log('network', network),
        balance: (balance: string) => {
          dispatch(setMetaBalance(balance))
          console.log('balance', balance)
          // history.push('/dashboard');
        },
      },
    })
  }

  return { onboard }
}
