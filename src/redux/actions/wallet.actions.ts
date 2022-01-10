/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { providers } from 'ethers'
// @ts-ignore
import { addressSignatureVerification } from '@ututrust/web-components'
// @ts-ignore
import EthereumAddress from 'ethereum-address'
import { API_BASE_URL } from '../../Config'
const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
}

let web3Modal: any
let provider: any

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}

export const getWeb3Modal = (): any => {
  return web3Modal
}

export const connectApi = () => async (dispatch: any, getState: any) => {
  const { address } = getState().wallet
  return addressSignatureVerification(API_BASE_URL, address, provider)
}

export const connect =
  (authenticate = false) =>
  async (dispatch: any) => {
    provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    await dispatch({
      type: 'SET_WEB3_PROVIDER',
      payload: {
        provider: {},
        web3Provider: {},
        address,
        chainId: network.chainId,
      },
    })

    if (authenticate) {
      await dispatch(connectApi())
    }
    
    dispatch(subscribeProvider(provider));
  }

export const disconnect = () => async (dispatch: any, getState: any) => {
  provider = await web3Modal.cachedProvider
  await web3Modal.clearCachedProvider()
  if (provider?.disconnect && typeof provider.disconnect === 'function') {
    await provider.disconnect()
  }
  await dispatch({
    type: 'RESET_WEB3_PROVIDER',
  })
  provider = null
  window.location.reload()
}

export const storeAddress =
  ({ address }: { address: string }) =>
  async (dispatch: any) => {
    if (!EthereumAddress.isAddress(address)) {
      return false
    }

    await dispatch({
      type: 'SET_ADDRESS',
      payload: {
        address: String(address).toLowerCase(),
      },
    })

    window.location.reload()
    return true
  }

export const subscribeProvider = (provider: any) => async (dispatch: any) => {
  if (!provider.on) {
    return
  }
  provider.on('disconnect', () => dispatch(disconnect()))
  provider.on('accountsChanged', async (accounts: string[]) => {
    if (!accounts.length) {
      return dispatch(disconnect())
    }
    await dispatch(storeAddress({address: accounts[0]}))
  })
  // provider.on('chainChanged', async (chainId: number) => {
  //   await dispatch(setChainId(chainId))
  //   const networkId = await web3.eth.net.getId()
  //   await dispatch(setNetworkId(networkId))
  // })
}
