/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from 'react'

import Table from '../../components/Table'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAssets } from '../../redux/actions/ocean.actions'
import Loader from '../../components/Loader'

export const Ocean = (): ReactElement => {
  const dispatch = useDispatch()
  const { assets, loading } = useSelector((state: any) => ({
    assets: state.ocean.assets,
    loading: state.ocean.loading,
  }))
  useEffect(() => {
    dispatch(fetchAssets())
  }, [])
  return (
    <Layout title="Ocean Market">
      {loading && (!assets || !assets.length) ? (
        <div className="flex flex-col max-w-7xl  px-8 mt-8  mx-auto ">
          <Loader />{' '}
        </div>
      ) : (
        <Table list={assets} />
      )}
    </Layout>
  )
}

export default Ocean
