import Head from 'next/head'
import { ReactElement } from 'react'
// import Navigation from "../../components/Navigation"
import Item from "../../components/Item"
export default function Ocean(): ReactElement {
  return (
    <>
    <div className="bg-purple-600 h-80">

    {/* // <div className="flex flex-col items-center justify-top min-h-screen pb-2 w-full"> */}
      <Head>
        <title>Ocean Market</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navigation /> */}
      <h1 className="max-w-7xl px-8 py-12  mx-auto text-3xl font-bold text-white">
        Ocean Market
      </h1>
    </div>
    <div className="-mt-36">
      <Item />
    </div>
    </>
  )
}
