/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { providers, utils } from 'ethers'
// @ts-ignore
import { addressSignatureVerification } from '@ututrust/web-components'
// @ts-ignore
import EthereumAddress from 'ethereum-address'
import { API_BASE_URL, CHAIN_ID, INFURA_ID } from '../../Config'
import supportedChains from '../../lib/chains'



export const UTU_API_AUTH_TOKEN = 'utu-identity-data'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID,
      rpc: {
          1: "https://mainnet.infura.io/v3/" + INFURA_ID,
          42: "https://kovan.infura.io/v3/" + INFURA_ID,
          137: "https://polygon-mainnet.infura.io/v3/" + INFURA_ID,
          80001: "https://rpc-mumbai.maticvigil.com",
      },
  },
  },
}

let web3Modal: any
let provider: any
let currentChainId: number

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
  await addressSignatureVerification(API_BASE_URL, provider)
  return window.location.reload()
}

export const connect = () => async (dispatch: any) => {
  provider = await web3Modal.connect()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.utuWeb3Provider = provider;
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
  currentChainId = network.chainId

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
  await localStorage.removeItem(UTU_API_AUTH_TOKEN)
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
    currentChainId = chainId

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

const requestNetworkChange = async (network: any) => {
  await provider.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: utils.hexStripZeros(utils.hexlify(network.chain_id)),
      },
    ],
  })
}

const addNetwork = async (network: any) => {
  await provider.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: utils.hexStripZeros(utils.hexlify(network?.chain_id)),
        chainName: network.name,
        nativeCurrency: network.native_currency,
        rpcUrls: [network.rpc_url],
      },
    ],
  })
}

export const switchNetwork = async () => {
  console.log('currentchain id', currentChainId)
  if (Number(currentChainId) === Number(CHAIN_ID)) return

  // @ts-ignore
  const network = supportedChains.find(
    (chain) => chain.chain_id === Number(CHAIN_ID)
  )
  if (!network) return
  try {
    await requestNetworkChange(network)
  } catch (e: any) {
    if (e.code === 4902) {
      await addNetwork(network)
      await requestNetworkChange(network)
    }
  }
}

export const getUTUApiAccessToken = async () => {
  const utu_api_token = await localStorage.getItem(UTU_API_AUTH_TOKEN)
  if (!utu_api_token) return null
  const { access_token } = JSON.parse(utu_api_token)
  return access_token
}

export const getWalletProvider = () => provider
