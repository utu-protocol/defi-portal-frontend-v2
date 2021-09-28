/* This example requires Tailwind CSS v2.0+ */
const stats = [
  { name: 'Total Subscribers', stat: '71,897', stat2: '13 times' },
  { name: 'Avg. Open Rate', stat: '58.16%', stat2: '13 times' },
  { name: 'Avg. Click Rate', stat: '24.57%', stat2: '13 times' },
  { name: 'Avg. Click Rate', stat: '24.57%', stat2: '13 times' },
]

export default function SummaryStats() {
  return (
    <div className="py-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Summary</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
      </dl>
    </div>
  )
}
