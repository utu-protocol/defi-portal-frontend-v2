/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { name: 'Total Subscribers', stat: '71,897', stat2: '13 times' },
  { name: 'Avg. Open Rate', stat: '58.16%', stat2: '13 times' },
  { name: 'Avg. Click Rate', stat: '24.57%', stat2: '13 times' },
  { name: 'Avg. Click Rate', stat: '24.57%', stat2: '13 times' },
]

export function CardDetails() {
  const items = [
    { id: 1 },
    { id: 1 },
    { id: 1 },
    { id: 1 },
    // More items...
  ]
  return (
    <div className="bg-yellow-50 border border-yellow-100 overflow-hidden rounded-md">
      <div className="bg-yellow-100">USAGE of this data assets</div>
      <div className="flex justify-between">
        <div>
          Consumers
          <p>8</p>
          In your network consumed this data assets
        </div>
        <div>
          Liquidity Providers
          <p>8</p>
          In your network consumed this data assets
        </div>
      </div>

      <ul className="divide-y divide-gray-300">
        {items.map((item) => (
          <li key={item.id} className="px-6 py-4">
            Your content
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function UsageCard() {
  return (
    <div className="py-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Usage in your network
      </h3>
      <CardDetails />
      {/* <CardDetails /> */}

      {/* <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 flex flex-row justify-between"
          >
            <div>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {item.stat}
              </dd>
            </div>
            {item.stat2 && (
              <div className="flex flex-col justify-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {item.stat2}
                </span>
              </div>
            )}
          </div>
        ))}
      </dl> */}
    </div>
  )
}
