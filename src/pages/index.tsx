import { ReactElement } from 'react'
import React, { useState } from 'react'
import ethereum_address from 'ethereum-address'
// import { useHistory } from 'react-router-dom'
// import Header from './header'
// import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { setMetaAddress } from '../reduxSlice/metaMaskSlice'
// import Footer from './footer'
import { useOnboard } from '../hooks'

// import Table from '../components/Table'
import Layout from '../components/Layout/Layout'

export const Home = (): ReactElement => {
  // const history = useHistory()
  const dispatch = useDispatch()
  const { onboard } = useOnboard()

  const [ethAddress, setEthAddress] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const openDashboard = () => {
    if (ethereum_address.isAddress(ethAddress)) {
      // router.push('/dashboard')
    } else {
      setErrorMsg('Not a valid Ethereum address')
    }
  }

  const onChangeAddress = (e: any) => {
    dispatch(setMetaAddress(e.target.value))
    setEthAddress(e.target.value)
    setErrorMsg('')
  }

  const connectWallet = async () => {
    try {
      if (onboard) {
        const selected = await onboard.walletSelect()
        if (selected) {
          await onboard.walletCheck()
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout
    // title="Tailored DeFi recommendations"
    // subtitle="From the people you trust."
    >
      <div className="max-w-screen-lg mx-auto mx-5">
        <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
          Tailored DeFi recommendations
          <br />
          <span id="newsletter-headline" className="text-portal">
            From the people <span className="underline">you</span> trust.
          </span>
        </h2>
        <p className="mt-4 pt-5 text-lg leading-7 text-gray-500 max-w-sm">
          Get personalized DeFi recommendations from the people you trust.
          Leveraging the power of the UTU Trust Engine, you can now navigate the
          Decentralized Finance world safely.
        </p>
        <form className="mt-8 sm:flex" aria-labelledby="newsletter-headline">
          <input
            onChange={onChangeAddress}
            aria-label="address"
            type="text"
            className="font-mono appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out sm:max-w-lg"
            placeholder="Enter ENS domain or a Ethereum address"
          />
          <div className="flex mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              onClick={openDashboard}
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:shadow-md focus:outline-none transition duration-150 ease-in-out"
            >
              Let's Go!
            </button>
          </div>
          <p className="ml-4 mr-2 mt-3">or</p>
          <div className="flex mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="button"
              onClick={connectWallet}
              className="bg-portal w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white hover:shadow-md focus:outline-none transition duration-150 ease-in-out"
            >
              Connect Wallet
            </button>
          </div>
        </form>
      </div>
      {/* <Table /> */}
    </Layout>
  )
}

export default Home
