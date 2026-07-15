import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Download, Activity, Wallet } from 'lucide-react'
import { SparkArea, SparkLine } from '../charts/MiniCharts'
import { tokenInflow, tvlSpark, volumeSpark, oddsSpark } from '../../data/mock'
import { useApp } from '../../context/AppContext'

/** 图2 贴画：多帧轮询 + 纵向居中堆叠 + 低透明度（CSS .sticker-col） */

type Range = '7D' | '30D' | '90D'

const VOL: Record<Range, { v: string; ch: string; series: { v: number }[] }> = {
  '7D': { v: '$4.12B', ch: '+9.40%', series: volumeSpark.map((d, i) => ({ v: d.v * 0.4 + i })) },
  '30D': { v: '$15.32B', ch: '+18.62%', series: volumeSpark },
  '90D': { v: '$48.70B', ch: '+31.05%', series: volumeSpark.map((d, i) => ({ v: d.v * 1.5 + i })) },
}

const LEFT_POOL = [
  {
    kind: 'tvl' as const,
    name: 'Arbitrum TVL',
    value: '$2.48B',
    change: '+12.35%',
    series: tvlSpark,
    pill: 'Arbitrum',
    pillCls: 'border-blue-100 bg-blue-50 text-blue-600',
  },
  {
    kind: 'tvl' as const,
    name: 'Base TVL',
    value: '$1.12B',
    change: '+19.80%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.55 + 12 })),
    pill: 'Base',
    pillCls: 'border-sky-100 bg-sky-50 text-sky-600',
  },
  {
    kind: 'tvl' as const,
    name: 'Optimism TVL',
    value: '$0.92B',
    change: '+8.30%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.42 + 8 })),
    pill: 'Optimism',
    pillCls: 'border-red-100 bg-red-50 text-red-500',
  },
  {
    kind: 'tvl' as const,
    name: 'Solana TVL',
    value: '$8.64B',
    change: '+7.58%',
    series: tvlSpark.map((d) => ({ v: d.v * 1.1 + 20 })),
    pill: 'Solana',
    pillCls: 'border-violet-100 bg-violet-50 text-violet-600',
  },
  {
    kind: 'tvl' as const,
    name: 'Polygon TVL',
    value: '$0.68B',
    change: '+4.20%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.35 + 6 })),
    pill: 'Polygon',
    pillCls: 'border-purple-100 bg-purple-50 text-purple-600',
  },
  {
    kind: 'volume' as const,
    name: '链上交易量趋势',
  },
  {
    kind: 'active' as const,
    name: '活跃地址 (24h)',
    value: '1.24M',
    change: '+6.8%',
    series: volumeSpark.map((_, i) => ({ v: 40 + Math.sin(i / 2) * 12 + i })),
  },
  {
    kind: 'gas' as const,
    name: 'L2 平均 Gas',
    value: '$0.09',
    change: '-12%',
    series: oddsSpark.map((v) => ({ v: Number(v) * 0.15 })),
  },
]

const RIGHT_POOL = [
  {
    kind: 'query' as const,
    chain: 'Optimism',
    latency: '1.32s',
    range: '2024-05-12 ~ 2024-05-18',
    tag: '命中模板',
    tokens: tokenInflow,
  },
  {
    kind: 'query' as const,
    chain: 'Ethereum',
    latency: '0.98s',
    range: '2025-05-01 ~ 2025-05-18',
    tag: '向量缓存',
    tokens: [
      { rank: 1, token: 'ETH', amount: '$210.4M', color: '#64748b' },
      { rank: 2, token: 'USDT', amount: '$98.2M', color: '#22c55e' },
      { rank: 3, token: 'WBTC', amount: '$54.1M', color: '#f59e0b' },
      { rank: 4, token: 'LINK', amount: '$21.0M', color: '#3b82f6' },
      { rank: 5, token: 'UNI', amount: '$14.6M', color: '#ec4899' },
    ],
  },
  {
    kind: 'query' as const,
    chain: 'Arbitrum',
    latency: '1.15s',
    range: '2025-05-10 ~ 2025-05-18',
    tag: '实时查询',
    tokens: [
      { rank: 1, token: 'USDC', amount: '$156.0M', color: '#3b82f6' },
      { rank: 2, token: 'ARB', amount: '$72.3M', color: '#2563eb' },
      { rank: 3, token: 'GMX', amount: '$41.2M', color: '#a855f7' },
      { rank: 4, token: 'MAGIC', amount: '$18.9M', color: '#f97316' },
      { rank: 5, token: 'RDNT', amount: '$12.4M', color: '#06b6d4' },
    ],
  },
  {
    kind: 'query' as const,
    chain: 'Base',
    latency: '0.87s',
    range: '2025-05-11 ~ 2025-05-18',
    tag: '秒级返回',
    tokens: [
      { rank: 1, token: 'ETH', amount: '$88.0M', color: '#64748b' },
      { rank: 2, token: 'USDC', amount: '$61.2M', color: '#3b82f6' },
      { rank: 3, token: 'AERO', amount: '$24.5M', color: '#22c55e' },
      { rank: 4, token: 'BRETT', amount: '$11.0M', color: '#f59e0b' },
      { rank: 5, token: 'DEGEN', amount: '$7.8M', color: '#a855f7' },
    ],
  },
  {
    kind: 'odds' as const,
    title: 'Odds Trend',
    label: 'BTC ETF Approval',
    value: '68%',
    change: '+8% 24h',
    series: oddsSpark,
  },
  {
    kind: 'whale' as const,
    title: 'Whale Alert',
    text: '0x8f3a… 净买入 $1.24M',
    sub: 'Smart Money · 2m ago',
  },
  {
    kind: 'protocol' as const,
    title: '协议收入 Top',
    rows: [
      ['Uniswap', '$4.2M'],
      ['Aave', '$2.1M'],
      ['Lido', '$1.8M'],
    ],
  },
]

function useRotate(ms = 3500) {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setIdx((x) => x + 1)
        setFade(true)
      }, 260)
    }, ms)
    return () => window.clearInterval(t)
  }, [ms])
  return { idx, fade }
}

function pick3<T>(pool: T[], start: number): T[] {
  return [0, 1, 2].map((o) => pool[(start + o) % pool.length])
}

export function InsightLeftStickers() {
  const { toast } = useApp()
  const [volRange, setVolRange] = useState<Range>('30D')
  const { idx, fade } = useRotate(3800)
  const items = pick3(LEFT_POOL, idx)
  const vol = VOL[volRange]

  return (
    <aside className="sticker-col sticker-col-left">
      <div className="sticker-stack" style={{ opacity: fade ? 1 : 0.35, transition: 'opacity 0.28s' }}>
        {items.map((item, i) => {
          if (item.kind === 'volume') {
            return (
              <div key={`vol-${idx}-${i}`} className="float-card card-soft p-2.5" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="mb-1 text-[10px] font-medium text-slate-600">{item.name}</div>
                <div className="mb-1 flex gap-1">
                  {(['7D', '30D', '90D'] as Range[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setVolRange(r)
                        toast(`交易量：${r} → ${VOL[r].v}`, 'success')
                      }}
                      className={`rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                        volRange === r ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-200' : 'text-slate-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold">{vol.v}</span>
                  <span className="text-[10px] text-emerald-500">{vol.ch}</span>
                </div>
                <SparkArea data={vol.series} color="#f97316" height={40} />
              </div>
            )
          }
          if (item.kind === 'active' || item.kind === 'gas') {
            return (
              <div key={`${item.kind}-${idx}-${i}`} className="float-card card-soft p-2.5" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="mb-0.5 flex items-center gap-1 text-[10px] text-slate-500">
                  {item.kind === 'active' ? <Activity size={11} /> : <Wallet size={11} />}
                  {item.name}
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-bold">{item.value}</span>
                  <span className={`text-[10px] ${item.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {item.change}
                  </span>
                </div>
                <SparkArea data={item.series} color={item.kind === 'gas' ? '#f59e0b' : '#22c55e'} height={36} />
              </div>
            )
          }
          // tvl
          return (
            <Link
              key={`${item.name}-${idx}-${i}`}
              to="/insight/query"
              className="float-card card-soft block p-2.5"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={`mb-1 inline-flex rounded-full border px-2 py-0.5 text-[9px] ${item.pillCls}`}>
                {item.pill}
              </div>
              <div className="text-[10px] text-slate-500">{item.name}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold">{item.value}</span>
                <span className="text-[10px] text-emerald-500">{item.change}</span>
              </div>
              <SparkArea data={item.series} color="#f97316" height={40} />
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export function InsightRightStickers() {
  const { idx, fade } = useRotate(4100)
  const items = pick3(RIGHT_POOL, idx)

  return (
    <aside className="sticker-col sticker-col-right">
      <div className="sticker-stack" style={{ opacity: fade ? 1 : 0.35, transition: 'opacity 0.28s' }}>
        {items.map((item, i) => {
          if (item.kind === 'odds') {
            return (
              <Link
                key={`odds-${idx}-${i}`}
                to="/alpha"
                className="float-card card-soft block p-2.5"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div className="text-[10px] font-medium text-slate-600">{item.title}</div>
                <div className="text-[9px] text-slate-400">{item.label}</div>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold">{item.value}</span>
                  <span className="text-[10px] text-emerald-500">{item.change}</span>
                </div>
                <SparkLine data={item.series} color="#f97316" height={32} />
              </Link>
            )
          }
          if (item.kind === 'whale') {
            return (
              <div key={`whale-${idx}-${i}`} className="float-card card-soft p-2.5" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="text-[10px] font-medium text-slate-600">{item.title}</div>
                <p className="mt-1 text-[11px] text-slate-700">{item.text}</p>
                <div className="mt-0.5 text-[9px] text-emerald-500">{item.sub}</div>
              </div>
            )
          }
          if (item.kind === 'protocol') {
            return (
              <div key={`proto-${idx}-${i}`} className="float-card card-soft p-2.5" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="mb-1 text-[10px] font-medium text-slate-600">{item.title}</div>
                {item.rows.map(([n, v]) => (
                  <div key={n} className="flex justify-between text-[10px] text-slate-600">
                    <span>{n}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            )
          }
          // query
          return (
            <div key={`q-${item.chain}-${idx}-${i}`} className="float-card card-soft p-2.5" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                  <CheckCircle2 size={12} /> Query
                </div>
                <span className="rounded bg-emerald-50 px-1 py-0.5 text-[9px] text-emerald-600">{item.tag}</span>
              </div>
              <div className="mb-1 flex justify-between text-[10px] text-slate-500">
                <span>耗时</span>
                <b className="text-slate-800">{item.latency}</b>
              </div>
              <div className="mb-1.5 flex items-center justify-between text-[9px]">
                <span className="text-slate-400">净流入榜</span>
                <span className="rounded-full bg-red-50 px-1.5 text-red-500">{item.chain}</span>
              </div>
              <div className="space-y-1">
                {item.tokens.slice(0, 4).map((t) => (
                  <div key={t.token} className="flex items-center gap-1.5 text-[10px]">
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white"
                      style={{ background: t.color }}
                    >
                      {t.token[0]}
                    </span>
                    <span className="flex-1 font-medium text-slate-700">{t.token}</span>
                    <span className="text-slate-500">{t.amount}</span>
                  </div>
                ))}
              </div>
              <Link to="/insight/query" className="mt-1.5 inline-flex items-center gap-0.5 text-[10px] text-orange-500">
                详情 <Download size={10} />
              </Link>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
