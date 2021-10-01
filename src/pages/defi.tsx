import { ReactElement, useEffect } from 'react'

// import Table from '../components/Table'
import Layout from '../components/Layout'
import { CancelTokenSource } from 'axios';
import { useProtocols } from '../hooks';
// 0xd5643F1Ff4218C2B09239885D9bF4e99f4a65F79

const intervalSeconds = 60;
let interval: any;

export const Home = (): ReactElement => {
  const { protocols, getProtocols, triggerSubscriptionAndGetProtocols } = useProtocols();

  useEffect(() => {

    const triggerCancelTokenSource = triggerSubscriptionAndGetProtocols();
    let getProtocolsCancelTokenSource: CancelTokenSource;

    interval = setInterval(function () {
      getProtocolsCancelTokenSource = getProtocols()
    }, intervalSeconds * 1000);

    return () => {
      clearInterval(interval);

      triggerCancelTokenSource.cancel();
      getProtocolsCancelTokenSource && getProtocolsCancelTokenSource.cancel();
    }
  }, [triggerSubscriptionAndGetProtocols, getProtocols]);
  
  console.log(protocols);

  return (
    <Layout title="DeFi">
      {/* <Table list={list} /> */}
    </Layout>
  )
}

export default Home
