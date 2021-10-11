import { ReactElement } from 'react'

export default function Header({ headerGroups }: { headerGroups: any[] }): ReactElement {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${column.highlight
                ? 'bg-yellow-100 border-b border-yellow-200 text-gray-700'
                : 'text-gray-500'
              }`}
              {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')}
              {/* Add a sort direction indicator */}
              <span>
                {column.isSorted
                  ? column.isSortedDesc
                    ? ' 🔽'
                    : ' 🔼'
                  : ''}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}
