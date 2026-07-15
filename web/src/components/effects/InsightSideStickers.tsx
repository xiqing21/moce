import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Download } from 'lucide-react'
import { SparkArea } from '../charts/MiniCharts'
import { tokenInflow, tvlSpark, volumeSpark } from '../../data/mock'
import { useApp } from '../../context/AppContext'

/** 图2 红框贴画 — 网格侧栏常显 + 轮播 + 7D/30D/90D 可点 */

type Range = '7D' | '30D' | '90D'

const VOL: Record<Range, { v: string; ch: string; series: { v: number }[] }> = {
  '7D': { v: '$4.12B', ch: '+9.40%', series: volumeSpark.map((d, i) => ({ v: d.v * 0.4 + i })) },
  '30D': { v: '$15.32B', ch: '+18.62%', series: volumeSpark },
  '90D': { v: '$48.70B', ch: '+31.05%', series: volumeSpark.map((d, i) => ({ v: d.v * 1.5 + i })) },
}

const TVL_ROTATE = [
  {
    name: 'Arbitrum TVL',
    value: '$2.48B',
    change: '+12.35%',
    series: tvlSpark,
    pill: 'Arbitrum',
    pillCls: 'border-blue-100 bg-blue-50 text-blue-600',
  },
  {
    name: 'Base TVL',
    value: '$1.12B',
    change: '+19.80%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.55 + 12 })),
    pill: 'Base',
    pillCls: 'border-sky-100 bg-sky-50 text-sky-600',
  },
  {
    name: 'Optimism TVL',
    value: '$0.92B',
    change: '+8.30%',
    series: tvlSpark.map((d) => ({ v: d.v * 0.42 + 8 })),
    pill: 'Optimism',
    pillCls: 'border-red-100 bg-red-50 text-red-500',
  },
]

const RANK_ROTATE = [
  {
    chain: 'Optimism',
    latency: '1.32s',
    range: '2024-05-12 ~ 2024-05-18',
    tag: '命中模板',
    tokens: tokenInflow,
  },
  {
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
]

function useRotate(ms = 4200) {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setIdx((x) => x + 1)
        setFade(true)
      }, 300)
    }, ms)
    return () => window.clearInterval(t)
  }, [ms])
  return { idx, fade }
}

export function InsightLeftStickers() {
  const { toast } = useApp()
  const [volRange, setVolRange] = useState<Range>('30D')
  const { idx, fade } = useRotate(4200)
  const tvl = TVL_ROTATE[idx % TVL_ROTATE.length]
  const vol = VOL[volRange]

  return (
      <aside className="sticker-col sticker-col-left">
        <div style={{ opacity: fade ? 1 : 0.25, transition: 'opacity 0.3s' }} className="space-y-3">
          <div
            className={`float-card inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] shadow-sm ${tvl.pillCls}`}
            style={{ animationDuration: '5s' }}
          >
            <span className="h-2 w-2 rounded-full bg-current opacity-60" />
            {tvl.pill}
          </div>

          <Link
            to="/insight/query"
            className="float-card card-soft block p-3 shadow-md"
            style={{ animationDuration: '5.5s', animationDelay: '0.15s' }}
          >
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[9px] font-bold text-white">
                ◆
              </span>
              {tvl.name}
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">{tvl.value}</span>
              <span className="text-[11px] font-medium text-emerald-500">{tvl.change}</span>
              <span className="text-[10px] text-slate-400">较上周期</span>
            </div>
            <SparkArea data={tvl.series} color="#f97316" height={56} />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>May 12</span>
              <span>May 16</span>
              <span>May 18</span>
            </div>
          </Link>

          <div
            className="float-card card-soft p-3 shadow-md"
            style={{ animationDuration: '6s', animationDelay: '0.4s' }}
          >
            <div className="mb-1 text-[11px] font-medium text-slate-600">链上交易量趋势</div>
            <div className="mb-1.5 flex gap-1">
              {(['7D', '30D', '90D'] as Range[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setVolRange(r)
                    toast(`交易量：${r} → ${VOL[r].v}`, 'success')
                  }}
                  className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                    volRange === r
                      ? 'bg-orange-50 text-orange-600 ring-1 ring-orange-200'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">{vol.v}</span>
              <span className="text-[11px] text-emerald-500">{vol.ch}</span>
              <span className="text-[10px] text-slate-400">较上周期</span>
            </div>
            <SparkArea data={vol.series} color="#f97316" height={48} />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Apr 19</span>
              <span>Apr 29</span>
              <span>May 18</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { n: 'Polygon', c: 'bg-violet-400' },
              { n: 'Base', c: 'bg-blue-500' },
            ].map((c, i) => (
              <Link
                key={c.n}
                to="/insight/query"
                className="float-card inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 shadow-sm"
                style={{ animationDelay: `${0.6 + i * 0.2}s` }}
              >
                <span className={`h-2 w-2 rounded-full ${c.c}`} />
                {c.n}
              </Link>
            ))}
          </div>
        </div>
      </aside>
  )
}

export function InsightRightStickers() {
  const { idx, fade } = useRotate(4500)
  const rank = RANK_ROTATE[idx % RANK_ROTATE.length]

  return (
      <aside className="sticker-col sticker-col-right">
        <div style={{ opacity: fade ? 1 : 0.25, transition: 'opacity 0.3s' }} className="space-y-3">
          <div className="flex justify-end gap-2">
            <span className="float-card rounded-full border border-orange-100 bg-white px-2 py-0.5 text-[10px] text-orange-500 shadow-sm">
              Ethereum
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-xs shadow-sm">
              ◆
            </span>
          </div>

          <Link
            to="/insight/query"
            className="float-card card-soft block p-3 shadow-md"
            style={{ animationDuration: '5.2s' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 size={13} /> Query Result
              </div>
              <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">{rank.tag}</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>查询耗时</span>
                <span className="text-base font-bold text-slate-900">{rank.latency}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="shrink-0">数据范围</span>
                <span className="text-right text-slate-700">{rank.range}</span>
              </div>
            </div>
            <span className="mt-2 inline-block text-[11px] font-medium text-orange-500">查看详情 →</span>
          </Link>

          <div className="float-card card-soft p-3 shadow-md" style={{ animationDuration: '5.8s', animationDelay: '0.3s' }}>
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-700">Token 净流入排行榜 (7D)</span>
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-500">
                {rank.chain}
              </span>
            </div>
            <div className="mb-1 flex justify-end text-slate-300">
              <Download size={12} />
            </div>
            <div className="space-y-1.5">
              {rank.tokens.map((t) => (
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
            <span className="float-card rounded-full border border-amber-100 bg-white px-2.5 py-1 text-[11px] text-amber-600 shadow-sm">
              BNB Chain
            </span>
          </div>
        </div>
      </aside>
  )
}
