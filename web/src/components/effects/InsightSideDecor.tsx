import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Download } from 'lucide-react'
import { SparkArea } from '../charts/MiniCharts'
import { oddsSpark, tokenInflow, tvlSpark, volumeSpark } from '../../data/mock'
import { useApp } from '../../context/AppContext'

type Range = '7D' | '30D' | '90D'

const VOLUME: Record<Range, { v: string; ch: string; data: { v: number }[] }> = {
  '7D': {
    v: '$4.12B',
    ch: '+9.40%',
    data: volumeSpark.map((d, i) => ({ v: d.v * 0.35 + i })),
  },
  '30D': {
    v: '$15.32B',
    ch: '+18.62%',
    data: volumeSpark,
  },
  '90D': {
    v: '$48.70B',
    ch: '+31.05%',
    data: volumeSpark.map((d, i) => ({ v: d.v * 1.4 + i * 0.8 })),
  },
}

const LEFT_SETS = [
  {
    id: 'arb',
    title: 'Arbitrum TVL',
    value: '$2.48B',
    change: '+12.35%',
    series: tvlSpark,
    badge: 'Arbitrum',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    id: 'base',
    title: 'Base TVL',
    value: '$1.12B',
    change: '+19.80%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.55 + 10 })),
    badge: 'Base',
    badgeColor: 'bg-sky-50 text-sky-600 border-sky-100',
  },
  {
    id: 'op',
    title: 'Optimism TVL',
    value: '$0.92B',
    change: '+8.30%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.4 + 8 })),
    badge: 'Optimism',
    badgeColor: 'bg-red-50 text-red-500 border-red-100',
  },
]

const RIGHT_SETS = [
  {
    id: 'query-arb',
    latency: '1.32s',
    range: '2024-05-12 ~ 2024-05-18',
    tag: '命中模板',
    tokens: tokenInflow,
    chain: 'Optimism',
  },
  {
    id: 'query-eth',
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
    chain: 'Ethereum',
  },
  {
    id: 'query-sol',
    latency: '1.55s',
    range: '2025-05-10 ~ 2025-05-18',
    tag: '实时查询',
    tokens: [
      { rank: 1, token: 'SOL', amount: '$88.0M', color: '#a855f7' },
      { rank: 2, token: 'JUP', amount: '$32.4M', color: '#22c55e' },
      { rank: 3, token: 'WIF', amount: '$19.2M', color: '#f97316' },
      { rank: 4, token: 'RAY', amount: '$11.8M', color: '#3b82f6' },
      { rank: 5, token: 'BONK', amount: '$9.1M', color: '#eab308' },
    ],
    chain: 'Solana',
  },
]

/**
 * Prototype 2.png style floating widgets (red-box areas):
 * left: TVL card + volume trend + chain pills
 * right: Query result + token ranking + floating chain tags
 * Soft float + slow carousel of business variants
 */
export function InsightSideDecor() {
  const { toast, range, setRange } = useApp()
  const [leftIdx, setLeftIdx] = useState(0)
  const [rightIdx, setRightIdx] = useState(0)
  const [fade, setFade] = useState(true)

  const volRange = (['7D', '30D', '90D'].includes(range) ? range : '30D') as Range
  const left = LEFT_SETS[leftIdx % LEFT_SETS.length]
  const right = RIGHT_SETS[rightIdx % RIGHT_SETS.length]
  const vol = VOLUME[volRange]

  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setLeftIdx((i) => (i + 1) % LEFT_SETS.length)
        setRightIdx((i) => (i + 1) % RIGHT_SETS.length)
        setFade(true)
      }, 320)
    }, 4500)
    return () => window.clearInterval(t)
  }, [])

  return (
    <>
      {/* LEFT red-box cluster */}
      <div
        className="pointer-events-none absolute left-0 top-2 z-20 hidden w-[220px] xl:block"
        style={{ opacity: fade ? 0.92 : 0.25, transition: 'opacity 0.35s ease' }}
      >
        <div className="pointer-events-auto space-y-3">
          {/* Floating chain badge */}
          <div
            className={`float-card inline-flex items-center gap-1.5 rounded-full border bg-white/95 px-2.5 py-1 text-[11px] shadow-sm ${left.badgeColor}`}
            style={{ animationDuration: '5s' }}
          >
            <span className="h-2 w-2 rounded-full bg-current opacity-70" />
            {left.badge}
          </div>

          <Link
            to="/insight/query"
            className="float-card card-soft block p-3 shadow-md shadow-orange-50/50"
            style={{ animationDuration: '5.5s', animationDelay: '0.2s' }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
                ◆
              </span>
              {left.title}
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">{left.value}</span>
              <span className="text-[11px] font-medium text-emerald-500">{left.change}</span>
              <span className="text-[10px] text-slate-400">较上周期</span>
            </div>
            <SparkArea data={left.series} color="#f97316" height={56} />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>May 12</span>
              <span>May 16</span>
              <span>May 18</span>
            </div>
          </Link>

          <div
            className="float-card card-soft p-3 shadow-md"
            style={{ animationDuration: '6s', animationDelay: '0.5s' }}
          >
            <div className="mb-1 text-[11px] font-medium text-slate-600">链上交易量趋势</div>
            <div className="mb-1.5 flex gap-1 text-[10px]">
              {(['7D', '30D', '90D'] as Range[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`rounded px-1.5 py-0.5 font-medium transition ${
                    volRange === t
                      ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-200'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  onClick={() => {
                    setRange(t)
                    toast(`交易量区间：${t} → ${VOLUME[t].v}`, 'success')
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-slate-900">{vol.v}</span>
              <span className="text-[11px] text-emerald-500">{vol.ch}</span>
              <span className="text-[10px] text-slate-400">较上周期</span>
            </div>
            <SparkArea data={vol.data} color="#f97316" height={48} />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Apr 19</span>
              <span>Apr 29</span>
              <span>May 18</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pl-1">
            {[
              { name: 'Polygon', c: 'bg-violet-400' },
              { name: 'Base', c: 'bg-blue-400' },
            ].map((c, i) => (
              <Link
                key={c.name}
                to="/insight/query"
                className="float-card inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[11px] text-slate-600 shadow-sm"
                style={{ animationDelay: `${0.8 + i * 0.3}s`, animationDuration: '6.5s' }}
              >
                <span className={`h-2 w-2 rounded-full ${c.c}`} />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT red-box cluster */}
      <div
        className="pointer-events-none absolute right-0 top-2 z-20 hidden w-[230px] xl:block"
        style={{ opacity: fade ? 0.92 : 0.25, transition: 'opacity 0.35s ease' }}
      >
        <div className="pointer-events-auto space-y-3">
          <div className="flex justify-end gap-2">
            <span
              className="float-card rounded-full border border-orange-100 bg-white/95 px-2 py-0.5 text-[10px] text-orange-500 shadow-sm"
              style={{ animationDuration: '5s' }}
            >
              Ethereum
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs shadow-sm">
              ◆
            </span>
          </div>

          <Link
            to="/insight/query"
            className="float-card card-soft block p-3 shadow-md"
            style={{ animationDuration: '5.2s', animationDelay: '0.15s' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 size={13} /> Query Result
              </div>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">{right.tag}</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>查询耗时</span>
                <span className="text-base font-bold text-slate-900">{right.latency}</span>
              </div>
              <div className="flex justify-between">
                <span>数据范围</span>
                <span className="text-slate-700">{right.range}</span>
              </div>
            </div>
            <span className="mt-2 inline-block text-[11px] font-medium text-orange-500">查看详情 →</span>
          </Link>

          <div
            className="float-card card-soft p-3 shadow-md"
            style={{ animationDuration: '5.8s', animationDelay: '0.4s' }}
          >
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-700">Token 净流入排行榜 (7D)</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] text-red-500">
                {right.chain}
              </span>
            </div>
            <div className="mb-1 flex justify-end text-slate-300">
              <Download size={12} />
            </div>
            <div className="space-y-1.5">
              {right.tokens.map((t) => (
                <div key={t.token} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 text-slate-400">{t.rank}</span>
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ background: t.color }}
                  >
                    {t.token[0]}
                  </span>
                  <span className="flex-1 font-medium text-slate-700">{t.token}</span>
                  <span className="text-slate-600">{t.amount}</span>
                </div>
              ))}
            </div>
            <Link to="/insight/query" className="mt-2 inline-block text-[11px] font-medium text-orange-500">
              查看完整榜单 →
            </Link>
          </div>

          <div className="flex justify-end">
            <span
              className="float-card rounded-full border border-amber-100 bg-white/95 px-2.5 py-1 text-[11px] text-amber-600 shadow-sm"
              style={{ animationDuration: '6.2s', animationDelay: '0.7s' }}
            >
              BNB Chain
            </span>
          </div>
        </div>
      </div>

      {/* Subtle odds spark decoration far right bottom-ish - only for tech feel */}
      <div className="pointer-events-none absolute bottom-24 right-4 hidden opacity-40 xl:block">
        <div className="w-24">
          <SparkArea data={oddsSpark.map((v) => ({ v }))} height={28} />
        </div>
      </div>
    </>
  )
}
