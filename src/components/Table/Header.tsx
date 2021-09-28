import { ReactElement } from 'react'

/* This example requires Tailwind CSS v2.0+ */
const headers = [
  {
    label: 'Name',
    highlight: false,
  },
  {
    label: 'Status',
    highlight: false,
  },
  {
    label: 'Publisher',
    highlight: false,
  },
  {
    label: 'Your Network',
    highlight: true,
  },
  {
    label: 'Times consumed',
    highlight: false,
  },
  // More people...
]

export default function Header(): ReactElement {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header, i) => (
          <th
            key={`header-${i}`}
            scope="col"
            className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
              header.highlight
                ? 'bg-yellow-100 border-b border-yellow-200 text-gray-700'
                : 'text-gray-500'
            }`}
          >
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}
