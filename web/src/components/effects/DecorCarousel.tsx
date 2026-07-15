import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  Network,
  TrendingUp,
} from 'lucide-react'
import { HorizontalBars, SparkArea, SparkLine } from '../charts/MiniCharts'
import { oddsSpark, tokenInflow, tvlSpark, tvlTopChains, volumeSpark } from '../../data/mock'

/** Low-opacity floating business cards that rotate — tech ambience for hero pages */

type Side = 'left' | 'right'

type Slide = {
  id: string
  side: Side
  node: ReactNode
}

function CardShell({
  children,
  to,
  className = '',
}: {
  children: ReactNode
  to?: string
  className?: string
}) {
  const cls = `card-soft block p-3 backdrop-blur-sm ${className}`
  if (to) {
    return (
      <Link to={to} className={`${cls} transition hover:border-orange-200 hover:shadow-md`}>
        {children}
      </Link>
    )
  }
  return <div className={cls}>{children}</div>
}

const LEFT_SLIDES: Omit<Slide, 'side'>[] = [
  {
    id: 'ask',
    node: (
      <CardShell to="/insight">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <MessageSquare size={12} className="text-orange-400" /> Ask a Question
        </div>
        <p className="text-[12px] leading-snug text-slate-700">
          Which chains had the highest TVL growth in the last 7 days?
        </p>
        <div className="mt-2 flex justify-end">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
            <ArrowRight size={12} className="-rotate-45" />
          </span>
        </div>
      </CardShell>
    ),
  },
  {
    id: 'tvl-top',
    node: (
      <CardShell to="/insight/query">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="font-medium text-slate-600">TVL Top Chains</span>
          <span className="text-slate-400">7D</span>
        </div>
        <HorizontalBars items={tvlTopChains} />
      </CardShell>
    ),
  },
  {
    id: 'report',
    node: (
      <CardShell to="/insight/report">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <FileText size={12} className="text-orange-400" /> Smart Report
        </div>
        <div className="text-[12px] font-medium text-slate-800">Weekly DeFi Overview</div>
        <div className="text-[10px] text-slate-400">May 12 – May 18</div>
        <span className="mt-2 inline-flex text-[11px] font-medium text-orange-500">
          View Report →
        </span>
      </CardShell>
    ),
  },
  {
    id: 'arb-tvl',
    node: (
      <CardShell to="/insight/query">
        <div className="mb-1 text-[11px] text-slate-500">◆ Arbitrum TVL</div>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold">$2.48B</span>
          <span className="text-[11px] text-emerald-500">+12.35%</span>
        </div>
        <SparkArea data={tvlSpark} color="#f97316" height={48} />
      </CardShell>
    ),
  },
  {
    id: 'volume',
    node: (
      <CardShell to="/insight">
        <div className="mb-1 text-[11px] font-medium text-slate-600">链上交易量</div>
        <div className="text-lg font-bold">$15.32B</div>
        <span className="text-[11px] text-emerald-500">+18.62% 30D</span>
        <SparkArea data={volumeSpark} color="#fb923c" height={44} />
      </CardShell>
    ),
  },
  {
    id: 'whale',
    node: (
      <CardShell to="/alpha">
        <div className="mb-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Activity size={12} className="text-violet-400" /> Whale Alert
        </div>
        <p className="text-[11.5px] text-slate-700">0x8f3a… 净买入 YES $1.24M</p>
        <div className="mt-1 text-[10px] text-emerald-500">Smart Money · 2m ago</div>
      </CardShell>
    ),
  },
]

const RIGHT_SLIDES: Omit<Slide, 'side'>[] = [
  {
    id: 'lineage',
    node: (
      <CardShell to="/data-agent/lineage">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <Network size={12} className="text-violet-400" /> Lineage Explorer
        </div>
        <div className="flex flex-col items-center gap-1 text-[10px]">
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1">raw_tx</div>
          <div className="lineage-pulse h-2 w-px bg-violet-300" />
          <div className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-blue-600">cleansed_tx</div>
          <div className="lineage-pulse h-2 w-px bg-orange-300" />
          <div className="rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-orange-600">agg_daily_flow</div>
        </div>
      </CardShell>
    ),
  },
  {
    id: 'odds',
    node: (
      <CardShell to="/alpha">
        <div className="mb-0.5 text-[11px] font-medium text-slate-600">Odds Trend</div>
        <div className="text-[11px] text-slate-500">BTC ETF Approval</div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold">68%</span>
          <span className="text-[11px] text-emerald-500">+8% 24h</span>
        </div>
        <SparkLine data={oddsSpark} color="#f97316" height={40} />
      </CardShell>
    ),
  },
  {
    id: 'query',
    node: (
      <CardShell to="/insight/query">
        <div className="mb-2 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
          <CheckCircle2 size={13} /> Query Result
        </div>
        <div className="space-y-1 text-[11px] text-slate-500">
          <div className="flex justify-between">
            <span>查询耗时</span>
            <b className="text-slate-800">1.32s</b>
          </div>
          <div className="flex justify-between">
            <span>命中模板</span>
            <span className="text-orange-600">Yes</span>
          </div>
        </div>
      </CardShell>
    ),
  },
  {
    id: 'token',
    node: (
      <CardShell to="/insight/query">
        <div className="mb-2 text-[11px] font-medium text-slate-700">Token 净流入 Top</div>
        {tokenInflow.slice(0, 3).map((t) => (
          <div key={t.token} className="flex items-center gap-2 text-[11px]">
            <span className="text-slate-400">{t.rank}</span>
            <span className="flex-1 font-medium">{t.token}</span>
            <span>{t.amount}</span>
          </div>
        ))}
      </CardShell>
    ),
  },
  {
    id: 'alpha-signal',
    node: (
      <CardShell to="/alpha/strategy">
        <div className="mb-1 flex items-center gap-1 text-[11px] text-slate-500">
          <TrendingUp size={12} className="text-orange-400" /> Alpha Signal
        </div>
        <div className="text-[13px] font-bold text-slate-800">TVL↑ + Whale Inflow</div>
        <div className="text-[11px] text-emerald-500">Sharpe 1.72 · 胜率 62%</div>
        <SparkLine data={[30, 35, 32, 40, 48, 52, 58]} height={36} />
      </CardShell>
    ),
  },
  {
    id: 'sources',
    node: (
      <CardShell to="/docs">
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
      </CardShell>
    ),
  },
]

export function DecorCarousel({
  side,
  intervalMs = 3800,
}: {
  side: Side
  intervalMs?: number
}) {
  const slides = side === 'left' ? LEFT_SLIDES : RIGHT_SLIDES
  const [idx, setIdx] = useState(side === 'left' ? 0 : 1)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % slides.length)
        setFade(true)
      }, 280)
    }, intervalMs)
    return () => window.clearInterval(t)
  }, [intervalMs, slides.length])

  // Show 2 stacked cards with offset indices for richer motion
  const a = slides[idx % slides.length]
  const b = slides[(idx + 1) % slides.length]
  const c = slides[(idx + 2) % slides.length]

  return (
    <div
      className={`pointer-events-none absolute top-4 z-20 hidden w-[200px] space-y-3 xl:block ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{ opacity: 0.72 }}
    >
      {[a, b, c].map((slide, i) => (
        <div
          key={`${slide.id}-${idx}-${i}`}
          className="pointer-events-auto float-card decor-fade"
          style={{
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${5 + i * 0.6}s`,
            opacity: fade ? (i === 0 ? 0.88 : i === 1 ? 0.62 : 0.42) : 0.15,
            transition: 'opacity 0.35s ease',
            transform: `translateY(${i * 2}px) scale(${1 - i * 0.03})`,
          }}
        >
          {slide.node}
        </div>
      ))}
    </div>
  )
}
