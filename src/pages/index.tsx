import { ReactElement, useEffect, useState } from 'react'

import Table from '../components/Table'
import Layout from '../components/Layout/Layout'

export const Home = (): ReactElement => {
  const [list, setList] = useState([])
  const fetchData = async () => {
    const data = {
      sourceCriteria: JSON.stringify({
        type: 'User',
        ids: { address: '0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79' },
      }),
      targetType: 'Asset',
    }
    const myHeaders = new Headers()
    myHeaders.append('Referer', 'localhost:3000')
    const res = await fetch(
      `https://stage-api.ututrust.com/core-api/ranking?${new URLSearchParams(
        Object.entries(data)
      ).toString()}`,
      {
        headers: myHeaders,
      }
    )
    const { result } = await res.json()
    setList(result)
    // console.log(result);
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
