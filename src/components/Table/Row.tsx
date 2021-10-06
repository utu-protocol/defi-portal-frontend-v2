import { ReactElement } from 'react'
import {
  Link
} from "react-router-dom";

export default function Row({ data }: { data: any }): ReactElement {
  return (
    <tr>
      <td className="px-2 py-4 max-w-xl">
        <Link to={`/ocean-market/${data.ids.address_datatoken}`}>
          <div className="flex items-center">
            {/* <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={data.image} alt="" />
                          </div> */}
            <div className="ml-4">
              <>
                <div className="text-sm font-medium text-gray-900">
                  {data.name}
                </div>
                <div className="text-sm text-gray-500">
                  {data.properties.PublishedBy}
                </div>
              </>
            </div>
          </div>
        </Link>
      </td>
      <td className="px-6 py-4">
        <span
          className={
            !data.properties.Purgatory
              ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
              : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
          }
        >
          {!data.properties.Purgatory ? 'Active' : 'Purgatory'}
        </span>
      </td>
      <td className="px-6 py-4 max-w-lg break-all">
        <div className="text-sm text-gray-900">
          {data.properties.PublishedBy}
        </div>
        <div className="text-sm text-gray-500">{data.department}</div>
      </td>
      <td className="bg-yellow-50 border-b border-yellow-200 border-b-yellow-200 px-6 py-4 text-sm text-gray-500">
        {data.summaryText}
      </td>
      <td className="px-6 py-4 text-left text-sm font-medium">
        <span className="font-light hover:text-indigo-900">
          {data.properties.Consumed}
        </span>
      </td>
    </tr>
  )
}
