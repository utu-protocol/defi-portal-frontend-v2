import { ReactElement } from 'react'

import Table from '../components/Table'
import Layout from '../components/Layout/Layout'

export const Home = (): ReactElement => {
  return (
    <Layout title="Ocean Market">
      <Table />
    </Layout>
  )
}

export default Home
