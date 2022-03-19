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

export const UTU_API_AUTH_TOKEN = 'utu-identity-data'

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
  console.log('connecting api ');
  return addressSignatureVerification(API_BASE_URL, provider)
}

export const connect = () => async (dispatch: any) => {
  provider = await web3Modal.connect()

  await dispatch(getWallet())

  dispatch(subscribeProvider())
}

export const getWallet = () => async (dispatch: any) => {
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
}
export const initWallet = () => async (dispatch: any, getState: any) => {
  if (web3Modal && web3Modal.cachedProvider) {
    dispatch(connect())
  }
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
  await localStorage.removeItem(UTU_API_AUTH_TOKEN);
  provider = null
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

    return true
  }

export const subscribeProvider = () => async (dispatch: any) => {
  if (!provider) {
    return
  }
  provider.on('accountsChanged', async (accounts: string[]) => {
    if (!accounts.length) {
      return dispatch(disconnect())
    }
    await dispatch(storeAddress({ address: accounts[0] }))
  })

  // Subscribe to chainId change
  provider.on('chainChanged', (chainId: number) => {
    dispatch({
      type: 'SET_CHAIN_ID',
      payload: {
        chainId,
      },
    })
  })

  // Subscribe to provider connection
  provider.on('connect', (info: { chainId: number }) => {
    dispatch(getWallet())
  })

  // Subscribe to provider disconnection
  provider.on('disconnect', (error: { code: number; message: string }) => {
    console.error(error)
  })
}

export const getUTUApiAccessToken = async () => {
  const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN)
  if (!utu_api_token) return null
  const { access_token } = JSON.parse(utu_api_token)
  return access_token
}
