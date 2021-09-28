import React, { ReactElement } from 'react'
import { XIcon } from '@heroicons/react/outline'
import SummaryStats from './SummaryStats'
import UsageCard from './UsageCard'
import ReactMarkdown from 'react-markdown'

export function CloseButton(): ReactElement {
  return (
    <button
      type="button"
      className="bg-gray-100 w-8 h-8 text-center outline-none focus:outline-none flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
      // onClick={() => setOpen(false)}
    >
      <span className="sr-only">Close</span>
      <XIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Detail({ details, stats }: any): ReactElement {
  return (
    <div className="border-b-gray-100 pb-2 ml-12 divide-y">
      {/* <p className="font-medium text-gray-500 py-3 text-xs">
        DATA ASSET DETAIL
      </p> */}
      <div className="divide-y mr-12">
        <div>
          <div className="flex flex-row items-center justify-between font-medium text-gray-500 text-xs border-b border-gray-200 -mr-12 pr-3">
            <div className="py-3">
              <span className="block">DATA ASSET DETAIL</span>
            </div>
            <CloseButton />
          </div>
          <h2 className="pt-12 text-3xl font-bold">{details.name}</h2>
          <div className="ml-0 pr-4 py-5 flex flex-row justify-between">
            <p>By {details.properties.PublishedBy}</p>
            <p>{4} Data assets </p>
          </div>
        </div>
        <div className="py-5 text-gray-700">
          <ReactMarkdown>{details.properties.Description}</ReactMarkdown>
        </div>
        <SummaryStats stats={stats} />
        <UsageCard />
      </div>
    </div>
  )
}
