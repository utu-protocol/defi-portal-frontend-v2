import { useTable, useSortBy } from 'react-table'
import Header from './Header'
import Row from './Row'

function Table({ columns, data }: { columns: any[]; data: any[] }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <div className="flex flex-col max-w-7xl  px-8 py-8  mx-auto ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <Header headerGroups={headerGroups} />
              <tbody
                className="bg-white divide-y divide-gray-200 px-6"
                {...getTableBodyProps()}
              >
                {firstPageRows.map((row, i) => {
                  prepareRow(row)
                  return <Row row={row} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
