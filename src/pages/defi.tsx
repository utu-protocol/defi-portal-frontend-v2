/* eslint-disable react/jsx-no-target-blank */
import { ReactElement, useEffect } from 'react'

// import Table from '../components/Table'
import Layout from '../components/Layout'
import { CancelTokenSource } from 'axios'
import { useProtocols } from '../hooks'
import Loader from '../components/Loader'
import ProtocolCard from '../components/Cards/Protocol'
// 0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79

const intervalSeconds = 60
let interval: any

const DeFi = (): ReactElement => {
  const { protocols, loading, getProtocols, triggerSubscriptionAndGetProtocols } =
    useProtocols()

  console.log(protocols)

  useEffect(() => {
    const triggerCancelTokenSource = triggerSubscriptionAndGetProtocols()
    let getProtocolsCancelTokenSource: CancelTokenSource

    interval = setInterval(function () {
      getProtocolsCancelTokenSource = getProtocols()
    }, intervalSeconds * 1000)

    return () => {
      clearInterval(interval)

      triggerCancelTokenSource.cancel()
      getProtocolsCancelTokenSource && getProtocolsCancelTokenSource.cancel()
    }
  }, [triggerSubscriptionAndGetProtocols, getProtocols])

  return (
    <Layout title="DeFi">
      {/* <Table list={list} /> */}

      <div className="flex flex-col max-w-7xl  px-8  mx-auto ">
        {loading && (!protocols || !protocols.length) ? (
          <div className="text-white mt-8">
            <p>We are scanning the blockchain network</p>
            <Loader />
          </div>
        ) : (
          <div className="-my-2 overflow-x-auto py-8 sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden bg-white border-b border-gray-200 sm:rounded-lg flex flex-col divide-y">
                <div className="bg-yellow-300 text-center py-3 text-gray-700 border-yellow-200 flex items-center justify-center space-x-2">
                  <p>Powered by</p>
                  <img src={`/logo.png`} alt="utu-logo" className="w-5 h-5" />
                  <p>UTU Trust Engine</p>
                </div>
                {protocols && protocols.length
                  ? protocols.map((protocol: any, index: number) => {
                    return (
                      <ProtocolCard key={`protocol-list-item${protocol.entity.name}`} protocol={protocol} index={index} />
                    )
                  })
                  : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default DeFi
