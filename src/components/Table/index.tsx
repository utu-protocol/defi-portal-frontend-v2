import { ReactElement } from 'react'
import Header from './Header'
import Row from './Row'

export default function Table({ list }: { list: any[] }): ReactElement {
  return (
    <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <Header />
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((item) => (
                  <Row
                    key={`table-row-${item.entity.properties.DID}`}
                    data={item.entity}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
