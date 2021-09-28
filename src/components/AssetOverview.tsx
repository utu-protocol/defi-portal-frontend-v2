import { ReactElement } from 'react'

/* This example requires Tailwind CSS v2{people && .0+ */
export default function Example({ details }: { details: any }): ReactElement {
  return (
    <div className="flex flex-col overflow-hidden border-gray-200  bg-gray-50">
      <div className="relative border-b border-b-solid">
        <span className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider block">
          DATA ASSETS
        </span>
      </div>
      <div className="px-6 py-4 bg-white border-b border-b-solid">
        <div className="text-sm font-medium text-gray-900">{details.name}</div>
        <div className="text-sm text-gray-500">
          {details.properties.PublishedBy}
        </div>
      </div>
    </div>
    //     </div>
    //   </div>
    // </div>
  )
}
