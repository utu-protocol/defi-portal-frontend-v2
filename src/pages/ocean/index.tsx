/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useEffect, useState } from 'react'

import Table from '../../components/Table'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'

export const Home = (): ReactElement => {
  const [list, setList] = useState([])
  const { address } = useSelector((state: any) => ({
    address: state.address,
  }))
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
    setList(result)
    // console.log(result);
  }

  useEffect(() => {
    fetchData()
  }, [address])
  return (
    <Layout title="Ocean Market">
      <Table list={list} />
    </Layout>
  )
}

export default Home
