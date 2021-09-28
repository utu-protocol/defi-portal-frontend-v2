import React, { ReactElement } from 'react'
import { XIcon } from '@heroicons/react/outline'
import SummaryStats from './SummaryStats/SummaryStats'
import UsageCard from './UsageCard/UsageCard'
const item = {
  name: '👋 Data Union.app - Image & Annotation Vault 📸',
  title: ' DataUnion.app',
  department: 'Optimization',
  dataAssets: '4',
  consumedAssets: '9',
  providedLiquidity: '3',
  email: 'QUICRA-0',
  status: 'Active',
  totalConsumption: '302,592,120',
  image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  content:
    'This dataset represents a collection of images and annotations as well as the software stack attached to it. The data is uploaded, annotated and verified by the dataset co-owners in exchange for datatoken rewards. The ownership will be similar to NFTs but one finished image and its annotation will be owned partially by all its contributors. Participants invest their time to co-own the dataset and improve its quality. The goal of this dataset is to be... Read more',
}

export function CloseButton(): ReactElement {
  return (
    <button
      type="button"
      className="bg-gray-100 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      // onClick={() => setOpen(false)}
    >
      <span className="sr-only">Close</span>
      <XIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
export function AssetDetailHeader({
  title,
  author,
  assetsNumber,
}: {
  title: string
  author: string
  assetsNumber: string
}): ReactElement {
  return (
    <div>
      <div className="flex flex-row  justify-between font-medium text-gray-500 py-3 text-xs border-b border-gray-200 -mr-12 pr-3">
        <p className="pt-1">DATA ASSET DETAIL</p>
        <CloseButton />
        {/* <button
          type="button"
          className="bg-gray-100 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          // onClick={() => setOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button> */}
      </div>
      <h2 className="pt-12 text-3xl font-bold">{title}</h2>
      <div className="ml-0 pr-4 py-5 flex flex-row justify-between">
        <p>By {author}</p>
        <p>{assetsNumber} Data assets </p>
      </div>
    </div>
  )
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Detail({ props }: any): ReactElement {
  // eslint-disable-next-line no-console
  props = item
  // eslint-disable-next-line no-console
  console.log(props)
  return (
    <div className="border-b-gray-100 pb-2 ml-12 divide-y">
      {/* <p className="font-medium text-gray-500 py-3 text-xs">
        DATA ASSET DETAIL
      </p> */}
      <div className="divide-y mr-12">
        <AssetDetailHeader
          title={props?.name}
          author={props?.title}
          assetsNumber={props?.dataAssets}
        />
        <div className="py-5">{props?.content}</div>
        <SummaryStats />
        <UsageCard />
      </div>
    </div>
  )
}
