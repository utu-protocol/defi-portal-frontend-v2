import { ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'

import { connect } from '../redux/actions/wallet.actions'

export const Home = (): ReactElement => {
  const dispatch = useDispatch()
  const { address } = useSelector((state: any) => state.wallet)
  // const [ethAddress, setEthAddress] = useState('')
  // const [errorMsg, setErrorMsg] = useState('')

  // const openDashboard = async () => {
  //   const result = await dispatch(storeAddress({ address: ethAddress }))
  //   if (!result) {
  //     setErrorMsg('Please provide a valid Ethereum address')
  //     return
  //   }
  // }

  // const onChangeAddress = (e: any) => {
  //   if (errorMsg) {
  //     setErrorMsg('')
  //   }

  //   setEthAddress(e.target.value)
  // }


  return (
    <Layout
    // title="Tailored DeFi recommendations"
    // subtitle="From the people you trust."
    >
      <div className="max-w-screen-lg mx-5 pt-44 mt-2">
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
        {!address && (
          <>
            <div className="mt-8 sm:flex" aria-labelledby="newsletter-headline">
              {/* <div className="w-full sm:max-w-lg">
                <input
                  onChange={onChangeAddress}
                  value={ethAddress}
                  aria-label="address"
                  type="text"
                  className="font-mono appearance-none w-full px-5 py-3 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out"
                  placeholder="Enter ENS domain or a Ethereum address"
                />
              </div> */}
              {/* <div className="flex mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  onClick={openDashboard}
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:shadow-md focus:outline-none transition duration-150 ease-in-out"
                >
                  {"Let's Go!"}
                </button>
              </div>
              <p className="ml-4 mr-2 mt-3">or</p> */}
              <div className="flex mt-3 rounded-md shadow sm:mt-0 sm:flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(connect())
                  }}
                  className="bg-primary w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white hover:shadow-md focus:outline-none transition duration-150 ease-in-out"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
            {/* <p className="text-red-500 text-sm mt-1">{errorMsg && errorMsg}</p> */}
          </>
        )}
      </div>
    </Layout>
  )
}

export default Home
