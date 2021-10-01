import { ReactElement, useEffect, useState } from 'react'

import Table from '../components/Table'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'

export const Home = (): ReactElement => {
  const [list, setList] = useState([])
  const { address } = useSelector((state: any) => ({
    address: state.wallet.address,
  }))
  const fetchData = async () => {
    const data = {
      sourceCriteria: JSON.stringify({
        type: 'Address',
        ids: { address },
      }),
      targetType: 'DefiPortal',
    }
    const res = await fetch(
      `${
        process.env.REACT_APP_UTU_API_BASE_URL
      }/core-api/ranking?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = await res.json()
    setList(result)
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Layout title="DeFi">
      <Table list={list} />
    </Layout>
  )
}

export default Home
