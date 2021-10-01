/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Item from '../../components/AssetOverview'
import Layout from '../../components/Layout'
import AssetDetail from '../../components/AssetDetail'
import {
  useParams
} from "react-router-dom";
// import { GetStaticPaths, GetStaticProps } from 'next'

export default function Ocean(): ReactElement {
  const [details, setDetails] = useState<any>(null)
  const { token } = useParams<any>();

  const { address } = useSelector((state: any) => ({
    address: state.address,
  }))

  // console.log(token)

  const fetchData = async () => {
    const data = {
      sourceCriteria: JSON.stringify({
        type: 'User',
        ids: { address },
      }),
      targetCriteria: JSON.stringify({
        type: 'Asset',
        ids: {
          address_datatoken: token,
        },
      }),
    }
    const res = await fetch(
      `${process.env.REACT_APP_UTU_API_BASE_URL
      }/interactionSummary?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = await res.json()
    setDetails(result)
  }
  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  return (
    <Layout title="Ocean Market">
      <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
            <div className="flex shadow bg-white sm:rounded-lg overflow-hidden">
              {details && (
                <>
                  <div className="relative w-1/3 border-gray-200 border-r border-r-solid">
                    <Item details={details?.target} />
                  </div>
                  <div className="relative w-2/3">
                    <AssetDetail
                      details={details?.target}
                      stats={details?.data}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
