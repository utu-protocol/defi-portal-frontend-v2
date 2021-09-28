import Link from 'next/link'
import { ReactElement } from 'react'
import Detail from './AssetDetail'

/* This example requires Tailwind CSS v2{people && .0+ */

const people = [
  {
    name: '👋 Data Union.app - Image & Annotation Vault :e',
    title: ' DataUnion.app',
    department: 'Optimization',
    consumedAssets: '9',
    providedLiquidity: '3',
    code: 'QUICRA-0',
    status: 'Active',
    totalConsumption: '302,592,120',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: "Product Pages of 1'044'709 Products on Amazon.com...",
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    consumedAssets: '0',
    providedLiquidity: '0',
    totalConsumption: '154,787,432',
    code: 'LUMSTA-42',
    status: 'Purgatory',

    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]

export default function Example(): ReactElement {
  return (
    <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow flex overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="bg-gray-50 max-w-xs w-32 divide-y divide-gray-200">
              <thead className="bg-gray-50 max-w-md">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    DATA ASSETS
                  </th>
                  {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DATA ASSET DETAIL
                    </th> */}
                  {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Publisher
                    </th>
                    <th
                      scope="col"
                      className="bg-yellow-100 border-b border-yellow-200 px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                    >
                      Your Network
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >                      Total Consumption
                    </th> */}
                </tr>
              </thead>
              <tbody className="max-w-xs bg-white divide-y divide-gray-20{people && 0">
                {people?.map((person) => (
                  <tr className="max-w-xs" key={person.code}>
                    <td className="max-w-md px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                          </div> */}
                        <div className="ml-4">
                          {/* <a href="/ocean"> */}
                          <Link href="/ocean">
                            <>
                              <div className="text-sm font-medium text-gray-900">
                                {person.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {person.code}
                              </div>
                            </>
                          </Link>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span
                            className={
                            person.status === 'Active' ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800' : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'}>
                          {person.status}
                        </span>
                      </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.title}</div>
                        <div className="text-sm text-gray-500">{person.department}</div>
                      </td>
                      <td className="bg-yellow-50 border-b border-yellow-200 border-b-yellow-200 px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.consumedAssets} Consumed data assets <br /> {person.providedLiquidity} Provided liquidity</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <a href="#" className="font-light hover:text-indigo-900">
                          {person.totalConsumption} OCEAN
                        </a>
                      </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-white w-full">{people && <Detail />}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
