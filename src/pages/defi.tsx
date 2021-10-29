/* eslint-disable react/jsx-no-target-blank */
import { ReactElement, useEffect } from 'react'

// import Table from '../components/Table'
import Layout from '../components/Layout'
import { CancelTokenSource } from 'axios'
import { useProtocols } from '../hooks'
import Loader from '../components/Loader'
import TrustEngine from '../components/trustEngine'
// 0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79

const intervalSeconds = 60
let interval: any

const DeFi = (): ReactElement => {
  const { protocols, loading, getProtocols, triggerSubscriptionAndGetProtocols } =
    useProtocols()

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
                    const relationshipsFound =
                      protocol.summaryImages.length > 0 || protocol.summaryText?.length > 0 
                    return (
                      <a
                        key={`protocol-list-item${protocol.entity.name}`}
                        href={protocol.entity.properties.url}
                        target="_blank"
                        className={`block cursor-pointer ${relationshipsFound || index === 0 ? 'border-yellow-200' : 'border-gray-200'} ${relationshipsFound ? 'bg-yellow-100 hover:bg-yellow-200' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex py-3">
                          <div className="flex flex-1">
                            <div className="flex-shrink-0 px-4">
                              <img
                                className={`h-12 w-12 rounded-full border-solid border-2 border-gray-200 ${relationshipsFound ? '' : ' text-gray-200'
                                  }`}
                                src={`/protocols/${protocol.entity.name.toLowerCase()}.png`}
                                alt=""
                              />
                            </div>
                            <div className="">
                              <div
                                className={`mt-1 text-xl leading-5 font-medium truncate text-gray-900`}
                              >
                                {protocol.entity.name}{' '}
                                <span
                                  className={`text-xs text-gray-500`}
                                >
                                  [{protocol.entity.properties.category}]
                                </span>
                              </div>
                              <div
                                className={`mt-1 flex items-center text-sm leading-5 ${relationshipsFound
                                  ? 'text-gray-700'
                                  : 'text-gray-500'
                                  }`}
                              >
                                <span className="truncate">
                                  {protocol.entity.properties.description}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <TrustEngine summaryImages={protocol.summaryImages} summaryText={protocol.summaryText} index={index}></TrustEngine>
                          </div>
                          <div className="pr-4 flex items-center text-gray-500 ml-auto flex-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </div>
                        </div>
                      </a>
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
