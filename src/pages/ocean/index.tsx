/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect } from 'react'

import Table from '../../components/Table'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchAssets } from '../../redux/actions/ocean.actions'

export const Home = (): ReactElement => {
  const dispatch = useDispatch();
  const { assets } = useSelector((state: any) => ({
    assets: state.ocean.assets,
  }));

  useEffect(() => {
    dispatch(fetchAssets());
  }, [])
  return (
    <Layout title="Ocean Market">
      <Table list={assets} />
    </Layout>
  )
}

export default Home
