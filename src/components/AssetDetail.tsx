/* eslint-disable react/jsx-no-target-blank */
import React, { ReactElement } from 'react'
import { XIcon } from '@heroicons/react/outline'
import {
  Link
} from "react-router-dom";
import SummaryStats from './SummaryStats'
import UsageCard from './Cards/Usage'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
// @ts-ignore
import truncateMarkdown from 'markdown-truncate'

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
  const [expandText, setExpandText] = useState(false)
  const description = () => {
    return truncateMarkdown(details.properties.Description, {
      limit: 300,
      ellipsis: true
    });
  };
  return (
    <div className="border-b-gray-100 divide-y">
      {/* <p className="font-medium text-gray-500 py-3 text-xs">
        DATA ASSET DETAIL
      </p> */}
      <div className="relative w-full">
        <div className="border-b border-solid border-gray-200">
          <div className="flex flex-row items-center justify-between pb-3 font-medium text-gray-500 text-xs border-b border-gray-200">
            <div className="py-3">
              <span className="block">DATA ASSET DETAIL</span>
            </div>
            <Link to="/ocean-market">
              <CloseButton />
            </Link>
          </div>
          <h2 className="pt-12 text-3xl font-bold">{details.name}</h2>
          <a href={`https://market.oceanprotocol.com/asset/${details.properties.DID}`} target="_blank" className="mt-5 block text-indigo-600 cursor-pointer">View on Ocean Market</a>
          <div className="ml-0 pr-4 py-5 flex flex-row justify-between text-gray-500">
            <p>
              By{' '}
              <span className="text-gray-900">
                {details.properties.PublishedBy}
              </span>
            </p>
            <p>{stats.publisherInfo?.totalAssets && stats.publisherInfo.totalAssets + " data assets"}</p>
          </div>
        </div>
        <div className="flex mt-5 text-sm leading-5 font-normal text-gray-500 justify-between">
          <div className="relative">Updated 3 months ago</div>
          <div>
            <span
              className={`px-3 py-0.5 inline-flex text-sm leading-5 font-medium rounded-full ${!details.properties.Purgatory
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
                }`}
            >
              {!details.properties.Purgatory ? 'Active' : 'Purgatory'}
            </span>
          </div>
        </div>

        <div className="text-gray-700 text-base leading-6 font-normal mt-7 mb-16">
          {!expandText ? (
            <>
              <ReactMarkdown className="inline-block">
                {description()}
              </ReactMarkdown>
              {details.properties.Description.length > 310 && (
                <span
                  onClick={() => setExpandText(true)}
                  className="text-base leading-6 font-normal text-indigo-600 cursor-pointer"
                >
                  Read more
                </span>
              )}
            </>
          ) : (
            <>
              <ReactMarkdown className="inline-block">
                {details.properties.Description}
              </ReactMarkdown>
              <span
                onClick={() => setExpandText(false)}
                className="text-base leading-6 font-normal text-indigo-600 cursor-pointer"
              >
                Show less
              </span>
            </>
          )}
        </div>
        {stats.networkInteraction || stats.publisherInteraction ? (
          <UsageCard stats={stats} />
        ) : null}
        <SummaryStats stats={stats} />
      </div>
    </div>
  )
}
