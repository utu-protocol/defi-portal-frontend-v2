/* This example requires Tailwind CSS v2.0+ */
import StatCard from './Cards/Stat'

export default function SummaryStats({ stats }: { stats: any }): JSX.Element {
  return (
    <div className="py-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Signals</h3>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <StatCard
          title="Total consumption"
          value={stats.consumption.totalConsumption}
          stat={stats.consumption.times}
          statText="times"
        />
        <StatCard
          title="Total liquidity"
          value={stats.liquidity.valueOcean}
          stat={stats.liquidity.pools}
          statText="pools"
        />
        <StatCard
          title="Swap volume"
          value={stats.swaps.valueOcean}
          stat={stats.swaps.pools}
          statText="pools"
        />
        <StatCard
          title="Monthly activity"
          value={stats.activity.monthlyInteractions}
          stat={stats.activity.change}
          statText="%"
          increased={stats.activity.change > 0}
          decreased={stats.activity.change < 0}
        />
      </div>
    </div>
  )
}
