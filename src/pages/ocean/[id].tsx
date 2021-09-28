/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Item from '../../components/AssetOverview'
import Layout from '../../components/Layout'
import AssetDetail from '../../components/AssetDetail'
import { GetStaticPaths, GetStaticProps } from 'next'

const stats = {
  status: 'success',
  result: {
    target: {
      name: 'Creative Haddock Token',
      type: 'Asset',
    },
    data: {
      consumption: {
        times: 13,
        valueOcean: 71697,
      },
      liquidity: {
        pools: 4,
        valueOcean: 278476,
      },
      swaps: {
        pools: 3,
        valueOcean: 710561,
      },
      activity: {
        monthlyInteractions: 2,
        changePercent: 12,
      },
      networkInteraction: {
        consumers: {
          total: 8,
          sampleAddresses: [
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              lastTimestamp: '2d ago',
            },
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              lastTimestamp: '1m ago',
            },
          ],
        },
        liquidityProviders: {
          total: 3,
          sampleAddresses: [
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              amount: '10k',
            },
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              amount: '2k',
            },
          ],
        },
      },
      publisherInteraction: {
        consumers: {
          total: 8,
          sampleAddresses: [
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              lastTimestamp: '2d ago',
            },
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              lastTimestamp: '1m ago',
            },
          ],
        },
        liquidityProviders: {
          total: 3,
          sampleAddresses: [
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              amount: '10k',
            },
            {
              address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79',
              amount: '2k',
            },
          ],
        },
      },
    },
  },
}
export default function Ocean({ id }: { id: string }): ReactElement {
  const [details, setDetails] = useState(null)

  const { address } = useSelector((state: any) => ({
    address: state.address,
  }))

  console.log(id)

  const fetchData = async () => {
    const data = {
      sourceCriteria: JSON.stringify({
        type: 'User',
        ids: { address },
      }),
      targetType: 'Asset',
    }
    const res = await fetch(
      `https://stage-api.ututrust.com/core-api/ranking?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = await res.json()
    setDetails(result[0]?.entity)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout title="Ocean Market">
      <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
            <div className="flex shadow bg-white sm:rounded-lg overflow-hidden">
              {details && (
                <>
                  <div className="relative w-1/3 border-gray-200 border-r border-r-solid">
                    <Item details={details} />
                  </div>
                  <div className="relative w-2/3">
                    <AssetDetail details={details} stats={stats.result.data} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id

  return {
    props: {
      id,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: [],
    fallback: true,
  }
}
