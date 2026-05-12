import { TrendEntry, CATEGORY_COLORS, DAYS } from '@/data/trends'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

type Props = {
  trend: TrendEntry
  rank: number
  showChart?: boolean
}

export function TrendCard({ trend, rank, showChart = false }: Props) {
  const isUp = trend.change > 0
  const color = CATEGORY_COLORS[trend.category]
  const chartData = trend.history.map((v, i) => ({ day: DAYS[i], v }))

  return (
    <div className="card" style={{ padding: '14px 16px', transition: 'all 0.15s', cursor: 'default' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Rank */}
        <div style={{ minWidth: 28, fontWeight: 700, fontSize: 18, color: rank <= 3 ? '#4f46e5' : '#d1d5db', fontFamily: 'Space Grotesk, sans-serif', lineHeight: 1.2 }}>
          {rank}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#0f1117' }}>{trend.keyword}</span>
            <span className="badge" style={{ background: color + '15', color }}>
              {trend.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Volume bar */}
            <div style={{ flex: 1, height: 4, background: '#f1f3f9', borderRadius: 2 }}>
              <div style={{ width: `${trend.volume}%`, height: '100%', background: color, borderRadius: 2, transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 12, color: '#6b7280', minWidth: 24 }}>{trend.volume}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: isUp ? '#10b981' : '#ef4444' }}>
              {isUp ? '▲' : '▼'} {Math.abs(trend.change)}%
            </span>
          </div>
        </div>
      </div>

      {/* Mini chart */}
      {showChart && (
        <div style={{ height: 60, marginTop: 10 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`g-${trend.keyword}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'white', border: '1px solid #e4e7ef', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [v, 'Volume']}
              />
              <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill={`url(#g-${trend.keyword})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
