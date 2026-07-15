import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: '1px solid #e2e8f0',
    fontSize: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
}

export function SparkArea({
  data,
  color = '#f97316',
  height = 56,
}: {
  data: { v: number }[]
  color?: string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#spark-${color.replace('#', '')})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function SparkLine({
  data,
  color = '#f97316',
  height = 40,
}: {
  data: number[]
  color?: string
  height?: number
}) {
  const chartData = data.map((v, i) => ({ i, v }))
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.8}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function DualLineChart({
  data,
  lines,
  height = 180,
  yDomain,
}: {
  data: Record<string, string | number>[]
  lines: { key: string; color: string; name: string }[]
  height?: number
  yDomain?: [number | string, number | string]
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={yDomain} width={36} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
        {lines.map((l) => (
          <Line
            key={l.key}
            type="monotone"
            dataKey={l.key}
            name={l.name}
            stroke={l.color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function SimpleBarChart({
  data,
  bars,
  height = 180,
}: {
  data: Record<string, string | number>[]
  bars: { key: string; color: string; name: string }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={6}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={36} />
        <Tooltip {...tooltipStyle} />
        {bars.map((b) => (
          <Bar key={b.key} dataKey={b.key} name={b.name} fill={b.color} radius={[6, 6, 0, 0]} isAnimationActive={false} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DonutChart({
  data,
  colors,
  centerLabel,
  centerValue,
  height = 160,
}: {
  data: { name: string; value: number }[]
  colors: string[]
  centerLabel?: string
  centerValue?: string
  height?: number
}) {
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <div className="text-[10px] text-slate-400">{centerLabel}</div>}
          {centerValue && <div className="text-sm font-bold text-slate-800">{centerValue}</div>}
        </div>
      )}
    </div>
  )
}

export function AreaDeltaChart({
  data,
  height = 160,
}: {
  data: { date: string; arb: number; op: number }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={36} />
        <ReferenceLine y={0} stroke="#cbd5e1" />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 11 }} />
        <Area type="monotone" dataKey="arb" name="Arbitrum 增量 (USD)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} isAnimationActive={false} />
        <Area type="monotone" dataKey="op" name="Optimism 增量 (USD)" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function HorizontalBars({
  items,
}: {
  items: { name: string; value: number; color: string; change: string }[]
}) {
  const max = Math.max(...items.map((i) => i.value))
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-2 text-[11px]">
          <span className="w-16 shrink-0 text-slate-600 flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
            {item.name}
          </span>
          <div className="flex-1 h-2 rounded-full bg-orange-50 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-300 to-orange-500"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className="w-12 text-right text-emerald-500 font-medium">+{item.change}</span>
        </div>
      ))}
    </div>
  )
}

export function MultiMetricChart({
  data,
  height = 200,
}: {
  data: Record<string, string | number>[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={36} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={36} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line yAxisId="left" type="monotone" dataKey="arbTvl" name="Arbitrum TVL (USD)" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line yAxisId="left" type="monotone" dataKey="opTvl" name="Optimism TVL (USD)" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line yAxisId="right" type="monotone" dataKey="arbFlow" name="Arbitrum 净流入 (USD)" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line yAxisId="right" type="monotone" dataKey="opFlow" name="Optimism 净流入 (USD)" stroke="#f59e0b" strokeWidth={2} dot={false} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function EquityChart({
  data,
  height = 160,
}: {
  data: Record<string, string | number>[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={32} unit="%" />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        <Line type="monotone" dataKey="strategy" name="策略收益" stroke="#f97316" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="btc" name="BTC" stroke="#64748b" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="eth" name="ETH" stroke="#3b82f6" strokeWidth={1.5} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="equal" name="等权组合" stroke="#a78bfa" strokeWidth={1.5} dot={false} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}
