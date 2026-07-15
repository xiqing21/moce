import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, MessageSquare, Network } from 'lucide-react'
import { HorizontalBars, SparkLine } from '../charts/MiniCharts'
import { oddsSpark, tvlTopChains } from '../../data/mock'

/** 图1 左右贴画 — 始终可见（不用 xl 隐藏），轮播业务卡片 */

const LEFT_FRAMES = [
  {
    key: 'ask',
    node: (
      <Link to="/insight" className="card-soft block p-3 transition hover:border-orange-200 hover:shadow-md">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <MessageSquare size={12} className="text-orange-400" />
          Ask a Question
        </div>
        <p className="text-[12px] leading-snug text-slate-700">
          Which chains had the highest TVL growth in the last 7 days?
        </p>
        <div className="mt-2 flex justify-end">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
            <ArrowRight size={12} className="-rotate-45" />
          </span>
        </div>
      </Link>
    ),
  },
  {
    key: 'tvl',
    node: (
      <Link to="/insight/query" className="card-soft block p-3 transition hover:border-orange-200">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="font-medium text-slate-600">TVL Top Chains</span>
          <span className="text-slate-400">7D Change</span>
        </div>
        <HorizontalBars items={tvlTopChains} />
      </Link>
    ),
  },
  {
    key: 'report',
    node: (
      <Link to="/insight/report" className="card-soft block p-3 transition hover:border-orange-200">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <FileText size={12} className="text-orange-400" />
          Smart Report
        </div>
        <div className="text-[12px] font-medium text-slate-800">Weekly DeFi Overview</div>
        <div className="text-[10px] text-slate-400">May 12 – May 18, 2024</div>
        <span className="btn-orange-outline mt-2 flex w-full !py-1.5 text-[11px]">
          View Report <ArrowRight size={12} />
        </span>
      </Link>
    ),
  },
]

const RIGHT_FRAMES = [
  {
    key: 'lineage',
    node: (
      <Link to="/data-agent/lineage" className="card-soft block p-3 transition hover:border-violet-200">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <Network size={12} className="text-violet-400" />
          Lineage Explorer
        </div>
        <div className="flex flex-col items-center gap-1 text-[10px]">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1">raw_tx</div>
          <div className="lineage-pulse h-2 w-px bg-violet-300" />
          <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-blue-600">cleansed_tx</div>
          <div className="lineage-pulse h-2 w-px bg-orange-300" />
          <div className="rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-orange-600">agg_daily_flow</div>
        </div>
      </Link>
    ),
  },
  {
    key: 'odds',
    node: (
      <Link to="/alpha" className="card-soft block p-3 transition hover:border-orange-200">
        <div className="mb-0.5 text-[11px] font-medium text-slate-600">Odds Trend</div>
        <div className="text-[11px] text-slate-500">BTC ETF Approval</div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">68%</span>
          <span className="text-[11px] text-emerald-500">+8% 24h</span>
        </div>
        <SparkLine data={oddsSpark} color="#f97316" height={40} />
      </Link>
    ),
  },
  {
    key: 'sources',
    node: (
      <div className="card-soft p-3">
        <div className="mb-2 text-[11px] font-medium text-slate-600">Data Sources</div>
        <div className="flex items-center gap-1.5">
          {['◆', '◎', '◉', 'OP'].map((s) => (
            <span
              key={s}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-[10px] font-bold"
            >
              {s}
            </span>
          ))}
          <span className="text-[11px] text-slate-500">+12</span>
        </div>
      </div>
    ),
  },
]

function useStickerRotate(interval = 4000) {
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setI((x) => x + 1)
        setFade(true)
      }, 280)
    }, interval)
    return () => window.clearInterval(t)
  }, [interval])
  return { i, fade }
}

export function HomeLeftStickers() {
  const { i, fade } = useStickerRotate(4000)
  const a = LEFT_FRAMES[i % LEFT_FRAMES.length]
  const b = LEFT_FRAMES[(i + 1) % LEFT_FRAMES.length]
  return (
    <aside className="sticker-col sticker-col-left">
      <div className="space-y-3" style={{ opacity: fade ? 1 : 0.2, transition: 'opacity 0.3s ease' }}>
        <div className="float-card" style={{ animationDuration: '5s' }}>
          {a.node}
        </div>
        <div className="float-card" style={{ animationDuration: '5.8s', animationDelay: '0.4s' }}>
          {b.node}
        </div>
      </div>
    </aside>
  )
}

export function HomeRightStickers() {
  const { i, fade } = useStickerRotate(4200)
  const a = RIGHT_FRAMES[i % RIGHT_FRAMES.length]
  const b = RIGHT_FRAMES[(i + 1) % RIGHT_FRAMES.length]
  return (
    <aside className="sticker-col sticker-col-right">
      <div className="space-y-3" style={{ opacity: fade ? 1 : 0.2, transition: 'opacity 0.3s ease' }}>
        <div className="float-card" style={{ animationDuration: '5.2s' }}>
          {a.node}
        </div>
        <div className="float-card" style={{ animationDuration: '6s', animationDelay: '0.35s' }}>
          {b.node}
        </div>
      </div>
    </aside>
  )
}
