import { ReactElement, useEffect, useState } from 'react'

import Table from '../components/Table'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
// 0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79
export const Home = (): ReactElement => {
  const [list, setList] = useState([])
  const { address } = useSelector((state: any) => ({
    address: state.address,
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
        process.env.NEXT_PUBLIC_UTU_API_BASE_URL
      }/core-api/ranking?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`
    )
    const { result } = await res.json()
    setList(result)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout title="Ocean Market">
      <Table list={list} />
    </Layout>
  )
}

export default Home
