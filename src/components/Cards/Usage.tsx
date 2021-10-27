/* This example requires Tailwind CSS v2.0+ */
import UserAvatar from '../UserAvatar'
import Web3 from 'web3'

export function StatColumn({
  title,
  text,
  value,
}: {
  title: string
  text: string
  value: number
}): JSX.Element {
  return (
    <div className="px-7 pt-3 pb-5 w-1/2">
      <div className="text-base leading-6 font-normal text-yellow-900">
        {title}
      </div>
      <div className="flex pt-3 text-yellow-500 items-center ">
        <div className="text-5xl leading-none font-extrabold">{value}</div>
        <div className="pl-2 text-sm leading-5 font-normal">{text}</div>
      </div>
    </div>
  )
}

export function CardDetails({
  details,
  consumersText,
  liquidityText,
}: {
  details: any
  consumersText: string
  liquidityText: string
}): JSX.Element {
  const sliceAddress = (address: string) => {
    const value = Web3.utils.toChecksumAddress(address)
    const characters = value.split('')
    const slices = []
    slices.push(characters.slice(0, 4))
    slices.push(characters.slice(4, 8))
    slices.push(['◦', '◦', '◦'])
    slices.push(characters.slice(characters.length - 8, characters.length - 4))
    slices.push(characters.slice(characters.length - 4, characters.length))

    return slices.map((slice, i) => {
      return `${slice.join('')}${slices.length - 1 > i ? ' ' : ''}`
    })
  }
  return (
    <div className="relative">
      <div className="bg-yellow-50 border border-yellow-200 overflow-hidden rounded-lg">
        <div className="py-3 px-7">
          <div className="text-xs leading-4 font-medium tracking-wider uppercase text-yellow-900">
            USAGE of this data assets
          </div>
        </div>
        <div className="flex justify-between divide-x divide-yellow-200 border-yellow-200 border-t border-t-solid">
          <StatColumn
            title="Consumers"
            text={consumersText}
            value={details.consumers.total}
          />
          <StatColumn
            title="Liquidity providers"
            text={liquidityText}
            value={details.liquidityProviders.total}
          />
        </div>
      </div>
      <div className="mb-12">
        <div className="flex flex-row px-5">
          <div className="flex flex-col w-1/2">
            {details.consumers.sampleAddresses.slice(0, 2).map((sample: any, i: number) => (
              <div
                key={`consumer-list-item${i}`}
                className="flex items-center py-2 border-solid border-b border-gray-200 text-sm leading-5 font-normal text-gray-500 pr-5"
              >
                <UserAvatar address={sample.address} size={32} />
                <span className="block pl-1.5">
                  {sliceAddress(sample.address)}
                </span>
                <span className="block ml-auto">{sample.lastTimestamp}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-1/2">
            {details.liquidityProviders.sampleAddresses
              .slice(0, 2)
              .map((sample: any, i: number) => (
                <div
                  key={`liquidity-list-item${i}`}
                  className="flex items-center py-2 border-solid border-b border-gray-200 text-sm leading-5 font-normal text-gray-500 pl-5"
                >
                  <UserAvatar address={sample.address} size={32} />
                  <span className="block pl-1.5">
                    {sliceAddress(sample.address)}
                  </span>
                  <span className="block ml-auto">{sample.amount}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="text-center pt-4">
          {/* <button className="shadow-sm border border-solid border-gray-300 bg-white text-xs leading-4 font-medium text-gray-700 py-2 px-3 rounded">
            See all
          </button> */}
        </div>
      </div>
      {/* <ul className="divide-y divide-gray-300"></ul> */}
    </div>
  )
}

export default function UsageCard({ stats }: { stats: any }): JSX.Element {
  return (
    <div className="py-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
        Usage in your network
      </h3>
      {stats.networkInteraction && (
        <CardDetails
          details={stats.networkInteraction}
          consumersText="In your network consumed this data asset"
          liquidityText="In your network provided liquidity for this data asset"
        />
      )}
      {stats.publisherInteraction && (
        <CardDetails
          details={stats.publisherInteraction}
          consumersText="In your network consumed data assets of this data asset's publisher"
          liquidityText="In your network provided liquidity for  this data asset's publisher"
        />
      )}
    </div>
  )
}
