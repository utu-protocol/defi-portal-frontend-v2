/* This example requires Tailwind CSS v2.0+ */
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/outline'

export default function StatCard({
  title,
  value,
  stat,
  statText,
  increased,
  decreased,
}: {
  title: string
  value: string
  stat: number
  statText: string
  increased?: boolean
  decreased?: boolean
}): JSX.Element {
  return (
    <div className="px-4 py-5 bg-white border border-gray-200 border-solid rounded-lg overflow-hidden sm:p-6 flex flex-row justify-between">
      <div>
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <div className="mt-1">
          <span className="text-3xl font-semibold text-gray-900">
            {Intl.NumberFormat().format(Number(value))}
          </span>
          <span className="font-medium uppercase text-xs ml-0.5">Ocean</span>
        </div>
      </div>
      {stat >= 0 && (
        <div className="flex flex-col justify-end">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-normal ${increased && 'bg-green-100 text-green-800'
              } ${decreased && 'bg-red-100 text-red-800'} ${!increased && !decreased ? 'bg-gray-100 text-gray-500' : ''
              }`}
          >
            {increased && (
              <ArrowUpIcon className="text-green-800 h-3 w-3 font-bold" />
            )}
            {decreased && (
              <ArrowDownIcon className="text-red-800 h-3 w-3 font-bold" />
            )}{' '}
            {stat} {statText}
          </span>
        </div>
      )}
    </div>
  )
}
