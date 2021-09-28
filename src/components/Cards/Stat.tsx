/* This example requires Tailwind CSS v2.0+ */
import { ArrowUpIcon } from '@heroicons/react/outline'

export default function StatCard({
  title,
  value,
  stat,
  statText,
  increased,
}: {
  title: string
  value: string
  stat: string
  statText: string
  increased?: boolean
}): JSX.Element {
  return (
    <div className="px-4 py-5 bg-white border border-gray-200 border-solid rounded-lg overflow-hidden sm:p-6 flex flex-row justify-between">
      <div>
        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      </div>
      {stat && (
        <div className="flex flex-col justify-end">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-normal ${
              increased
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {increased && (
              <ArrowUpIcon className="text-green-500 h-3 w-3 font-bold" />
            )}{' '}
            {stat} {statText}
          </span>
        </div>
      )}
    </div>
  )
}
