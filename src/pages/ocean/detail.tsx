/* eslint-disable no-console */
import { ReactElement, useEffect, useState } from 'react'
// import Item from '../../components/AssetOverview'
import Layout from '../../components/Layout'
import AssetDetail from '../../components/AssetDetail'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAssetDetails } from '../../redux/actions/ocean.actions'
import Loader from '../../components/Loader'

export default function OceanDetail(): ReactElement {
  const [details, setDetails] = useState<any>(null)
  const { token } = useParams<any>()
  const dispatch = useDispatch()
  const { loading } = useSelector((state: any) => ({
    loading: state.ocean.loading,
  }))
  const fetchData = async () => {
    const result = await dispatch(getAssetDetails({ token }))
    setDetails(result)
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Layout title="Ocean Market">
      {loading && !details ? (
        <div className="flex flex-col max-w-7xl  px-8 mt-8  mx-auto ">
          <Loader />{' '}
        </div>
      ) : (
        <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
              <div className="flex shadow bg-white sm:rounded-lg overflow-hidden">
                {details && (
                  <>
                    {/* <div className="relative w-1/3 border-gray-200 border-r border-r-solid">
                      <Item details={details?.target} />
                    </div> */}
                    <div className="relative w-full px-12 py-6">
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
      )}

    </Layout>
  )
}
