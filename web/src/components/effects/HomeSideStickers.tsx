import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FileText, MessageSquare, Network, Shield, Zap } from 'lucide-react'
import { HorizontalBars, SparkLine } from '../charts/MiniCharts'
import { oddsSpark, tvlTopChains } from '../../data/mock'

/** 图1 贴画：更多帧轮询 + 纵向居中堆叠 */

const LEFT_POOL = [
  {
    key: 'ask',
    node: (
      <Link to="/insight" className="card-soft block p-2.5 transition hover:border-orange-200">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-500">
          <MessageSquare size={11} className="text-orange-400" /> Ask a Question
        </div>
        <p className="text-[11px] leading-snug text-slate-700">
          Which chains had the highest TVL growth in the last 7 days?
        </p>
        <div className="mt-1.5 flex justify-end">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
            <ArrowRight size={10} className="-rotate-45" />
          </span>
        </div>
      </Link>
    ),
  },
  {
    key: 'tvl',
    node: (
      <Link to="/insight/query" className="card-soft block p-2.5">
        <div className="mb-1.5 flex justify-between text-[10px]">
          <span className="font-medium text-slate-600">TVL Top Chains</span>
          <span className="text-slate-400">7D</span>
        </div>
        <HorizontalBars items={tvlTopChains} />
      </Link>
    ),
  },
  {
    key: 'report',
    node: (
      <Link to="/insight/report" className="card-soft block p-2.5">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-500">
          <FileText size={11} className="text-orange-400" /> Smart Report
        </div>
        <div className="text-[11px] font-medium text-slate-800">Weekly DeFi Overview</div>
        <div className="text-[9px] text-slate-400">May 12 – May 18</div>
      </Link>
    ),
  },
  {
    key: 'secure',
    node: (
      <div className="card-soft p-2.5">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-600">
          <Shield size={11} className="text-emerald-500" /> 安全可信
        </div>
        <p className="text-[10px] text-slate-500">链上身份与权限体系 · SOC 2</p>
      </div>
    ),
  },
  {
    key: 'perf',
    node: (
      <div className="card-soft p-2.5">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-slate-600">
          <Zap size={11} className="text-amber-500" /> 高性能
        </div>
        <p className="text-[10px] text-slate-500">平均返回 &lt; 2s · PB 级查询</p>
      </div>
    ),
  },
  {
    key: 'ask2',
    node: (
      <Link to="/insight" className="card-soft block p-2.5">
        <div className="mb-1 text-[10px] font-medium text-orange-500">推荐问题</div>
        <p className="text-[11px] text-slate-700">对比 Optimism 与 Arbitrum 的 TVL 周环比</p>
      </Link>
    ),
  },
]

const RIGHT_POOL = [
  {
    key: 'lineage',
    node: (
      <Link to="/data-agent/lineage" className="card-soft block p-2.5">
        <div className="mb-1.5 flex items-center gap-1 text-[10px] font-medium text-slate-500">
          <Network size={11} className="text-violet-400" /> Lineage
        </div>
        <div className="flex flex-col items-center gap-0.5 text-[9px]">
          <div className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5">raw_tx</div>
          <div className="lineage-pulse h-2 w-px bg-violet-300" />
          <div className="rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-blue-600">cleansed_tx</div>
          <div className="lineage-pulse h-2 w-px bg-orange-300" />
          <div className="rounded border border-orange-200 bg-orange-50 px-2 py-0.5 text-orange-600">agg_daily_flow</div>
        </div>
      </Link>
    ),
  },
  {
    key: 'odds',
    node: (
      <Link to="/alpha" className="card-soft block p-2.5">
        <div className="text-[10px] font-medium text-slate-600">Odds Trend</div>
        <div className="text-[9px] text-slate-400">BTC ETF</div>
        <div className="flex items-end justify-between">
          <span className="text-xl font-bold">68%</span>
          <span className="text-[10px] text-emerald-500">+8%</span>
        </div>
        <SparkLine data={oddsSpark} color="#f97316" height={32} />
      </Link>
    ),
  },
  {
    key: 'sources',
    node: (
      <div className="card-soft p-2.5">
        <div className="mb-1.5 text-[10px] font-medium text-slate-600">Data Sources</div>
        <div className="flex items-center gap-1">
          {['◆', '◎', '◉', 'OP'].map((s) => (
            <span key={s} className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 text-[9px] font-bold">
              {s}
            </span>
          ))}
          <span className="text-[10px] text-slate-500">+12</span>
        </div>
      </div>
    ),
  },
  {
    key: 'alpha',
    node: (
      <Link to="/alpha/strategy" className="card-soft block p-2.5">
        <div className="text-[10px] font-medium text-orange-500">Alpha Signal</div>
        <div className="text-[11px] font-semibold text-slate-800">TVL↑ + Whale</div>
        <div className="text-[9px] text-emerald-500">Sharpe 1.72</div>
      </Link>
    ),
  },
  {
    key: 'agent',
    node: (
      <Link to="/data-agent/aiops" className="card-soft block p-2.5">
        <div className="text-[10px] font-medium text-violet-500">AIOps</div>
        <div className="text-[11px] text-slate-700">1 严重 · 2 告警</div>
        <div className="text-[9px] text-slate-400">实时监控中</div>
      </Link>
    ),
  },
  {
    key: 'odds2',
    node: (
      <Link to="/alpha" className="card-soft block p-2.5">
        <div className="text-[10px] text-slate-500">Predict.fun YES</div>
        <div className="text-xl font-bold text-emerald-600">65.8%</div>
        <SparkLine data={oddsSpark.map((v) => v + 8)} color="#22c55e" height={28} />
      </Link>
    ),
  },
]

function useRotate(ms: number) {
  const [i, setI] = useState(0)
  const [fade, setFade] = useState(true)
  useEffect(() => {
    const t = window.setInterval(() => {
      setFade(false)
      window.setTimeout(() => {
        setI((x) => x + 1)
        setFade(true)
      }, 260)
    }, ms)
    return () => window.clearInterval(t)
  }, [ms])
  return { i, fade }
}

function stack3<T extends { key: string; node: ReactNode }>(pool: T[], start: number) {
  return [0, 1, 2].map((o) => pool[(start + o) % pool.length])
}

export function HomeLeftStickers() {
  const { i, fade } = useRotate(3600)
  const items = stack3(LEFT_POOL, i)
  return (
    <aside className="sticker-col sticker-col-left">
      <div className="sticker-stack" style={{ opacity: fade ? 1 : 0.3, transition: 'opacity 0.28s' }}>
        {items.map((it, idx) => (
          <div key={`${it.key}-${i}-${idx}`} className="float-card" style={{ animationDelay: `${idx * 0.2}s` }}>
            {it.node}
          </div>
        ))}
      </div>
    </aside>
  )
}

export function HomeRightStickers() {
  const { i, fade } = useRotate(4000)
  const items = stack3(RIGHT_POOL, i)
  return (
    <aside className="sticker-col sticker-col-right">
      <div className="sticker-stack" style={{ opacity: fade ? 1 : 0.3, transition: 'opacity 0.28s' }}>
        {items.map((it, idx) => (
          <div key={`${it.key}-${i}-${idx}`} className="float-card" style={{ animationDelay: `${idx * 0.18}s` }}>
            {it.node}
          </div>
        ))}
      </div>
    </aside>
  )
}
