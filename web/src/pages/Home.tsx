import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Database,
  FileText,
  Lock,
  MessageSquare,
  Network,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AlphaIcon, DataAgentIcon, InsightIcon } from '../components/ui/MoceLogo'
import { HorizontalBars, SparkLine } from '../components/charts/MiniCharts'
import { FloatBadge, FloatCard, OrbitDecor } from '../components/effects/FloatCard'
import { oddsSpark, tvlTopChains } from '../data/mock'
import { useApp } from '../context/AppContext'

export function Home() {
  const navigate = useNavigate()
  const { toast, setQuery } = useApp()

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-5 mt-1 flex justify-center">
        <ProductTabs active="none" />
      </div>

      <div className="relative">
        <OrbitDecor />

        {/* Left floating widgets */}
        <div className="pointer-events-none absolute left-0 top-6 z-20 hidden w-[210px] space-y-3 xl:block">
          <FloatCard delay={0} className="p-3" to="/insight">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <MessageSquare size={12} className="text-orange-400" />
              Ask a Question
            </div>
            <p className="text-[12px] leading-snug text-slate-700">
              Which chains had the highest TVL growth in the last 7 days?
            </p>
            <div className="mt-2 flex justify-end">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-200">
                <ArrowRight size={12} className="-rotate-45" />
              </span>
            </div>
          </FloatCard>

          <FloatCard delay={0.4} className="p-3" onClick={() => navigate('/insight/query')}>
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-600">TVL Top Chains</span>
              <span className="text-slate-400">7D Change</span>
            </div>
            <HorizontalBars items={tvlTopChains} />
          </FloatCard>

          <FloatCard delay={0.8} className="p-3" to="/insight/report">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <FileText size={12} className="text-orange-400" />
              Smart Report
            </div>
            <div className="flex items-start gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                <FileText size={14} className="text-orange-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-medium text-slate-800">Weekly DeFi Overview</div>
                <div className="text-[10px] text-slate-400">May 12 – May 18, 2024</div>
              </div>
            </div>
            <span className="btn-orange-outline mt-2 flex w-full !py-1.5 text-[11px]">
              View Report <ArrowRight size={12} />
            </span>
          </FloatCard>
        </div>

        {/* Right floating widgets */}
        <div className="pointer-events-none absolute right-0 top-6 z-20 hidden w-[210px] space-y-3 xl:block">
          <FloatCard delay={0.2} className="p-3" to="/data-agent/lineage">
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
              <Network size={12} className="text-violet-400" />
              Lineage Explorer
            </div>
            <div className="flex flex-col items-center gap-1 text-[10px]">
              {['raw_tx', 'cleansed_tx'].map((n, i) => (
                <div key={n} className="contents">
                  {i > 0 && <div className="lineage-pulse h-3 w-px bg-violet-300" />}
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">{n}</div>
                </div>
              ))}
              <div className="lineage-pulse h-3 w-px bg-violet-300" />
              <div className="flex gap-1">
                <div className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-violet-600">fact_transfer</div>
                <div className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-violet-600">dim_address</div>
              </div>
              <div className="lineage-pulse h-3 w-px bg-orange-300" />
              <div className="rounded-md border border-orange-200 bg-orange-50 px-3 py-1 text-orange-600">agg_daily_flow</div>
            </div>
          </FloatCard>

          <FloatCard delay={0.6} className="p-3" to="/alpha">
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-600">Odds Trend</span>
            </div>
            <div className="mb-0.5 text-[11px] text-slate-500">BTC ETF Approval</div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-800">68%</span>
              <span className="mb-1 text-[11px] font-medium text-emerald-500">+8% 24h</span>
            </div>
            <SparkLine data={oddsSpark} color="#f97316" height={44} />
            <div className="mt-0.5 flex justify-between text-[9px] text-slate-400">
              <span>May 12</span>
              <span>May 15</span>
              <span>May 18</span>
            </div>
          </FloatCard>

          <FloatCard
            delay={1}
            className="p-3"
            onClick={() => toast('数据源目录：已连接 16 条链上源 + 公共数据集', 'info')}
          >
            <div className="mb-2 text-[11px] font-medium text-slate-600">Data Sources</div>
            <div className="flex items-center gap-1.5">
              {['◆', '◎', '◉', 'OP'].map((s, i) => (
                <span
                  key={i}
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[10px] font-bold text-slate-600"
                >
                  {s}
                </span>
              ))}
              <span className="ml-1 text-[11px] font-medium text-slate-500">+12</span>
            </div>
          </FloatCard>
        </div>

        {/* Center hero */}
        <div className="relative z-10 mx-auto max-w-[860px] pt-2 text-center">
          <h1 className="text-[34px] font-extrabold tracking-tight text-slate-900 sm:text-[40px]">
            One Brand, <span className="text-moce-orange">Three Intelligence Layers</span>
          </h1>
          <p className="mt-2 text-[13.5px] text-slate-500">
            一个品牌，连接 Web3 数据分析、数据生产与 Alpha 发现。
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              to="/insight"
              className="card group relative overflow-hidden p-5 text-left transition hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100"
              onClick={() => toast('进入 MOCE Insight', 'info')}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 to-orange-500" />
              <InsightIcon className="mb-3 h-9 w-9 !rounded-xl" />
              <h3 className="text-[15px] font-bold text-slate-900">MOCE Insight</h3>
              <ul className="mt-3 space-y-1.5 text-[12px] text-slate-600">
                {['自然语言提问', '数据资产判断', 'SQL 查询', '图表生成', '智能报告'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] text-slate-400">
                Ask anything about Web3 data.
              </p>
            </Link>

            <Link
              to="/data-agent/intake"
              className="card group relative overflow-hidden p-5 text-left transition hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100"
              onClick={() => toast('进入 MOCE Data Agent 完整流程', 'info')}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-400 to-violet-500" />
              <DataAgentIcon className="mb-3 h-9 w-9 !rounded-xl" />
              <h3 className="text-[15px] font-bold text-slate-900">MOCE Data Agent</h3>
              <ul className="mt-3 space-y-1.5 text-[12px] text-slate-600">
                {['数据需求卡', 'NL to Job', 'Flink / Fluss / Paimon / StarRocks', '血缘分析', 'AIOps'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] text-slate-400">
                Turn data requests into production-ready pipelines.
              </p>
            </Link>

            <Link
              to="/alpha"
              className="card group relative overflow-hidden p-5 text-left transition hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100"
              onClick={() => toast('进入 MOCE Alpha', 'info')}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
              <AlphaIcon className="mb-3 h-9 w-9 !rounded-xl" />
              <h3 className="text-[15px] font-bold text-slate-900">MOCE Alpha</h3>
              <ul className="mt-3 space-y-1.5 text-[12px] text-slate-600">
                {['Prediction Market Intelligence', 'Smart Money / Odds / Flow 分析', 'Strategy / Quant Research Lab', '回测与信号监控'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] text-slate-400">
                Discover alpha from markets, flow and signals.
              </p>
            </Link>
          </div>

          {/* Flow pipeline — clickable */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
            {[
              { to: '/insight', icon: <InsightIcon className="h-5 w-5" />, label: 'MOCE Insight' },
              { to: '/data-request', icon: <FileText size={14} className="text-orange-500" />, label: 'Data Request' },
              { to: '/data-agent/intake', icon: <DataAgentIcon className="h-5 w-5" />, label: 'MOCE Data Agent' },
              { to: '/data-agent/deploy', icon: <Database size={14} className="text-blue-500" />, label: 'New Data Asset' },
              { to: '/alpha', icon: (
                <span className="flex gap-0.5">
                  <InsightIcon className="h-5 w-5" />
                  <AlphaIcon className="h-5 w-5" />
                </span>
              ), label: 'Insight / Alpha' },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-1">
                {i > 0 && <ArrowRight size={14} className="mx-1 text-slate-300" />}
                <Link
                  to={item.to}
                  className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50/80 px-2.5 py-1.5 text-[11.5px] font-medium text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                  onClick={() => {
                    if (item.label.includes('Request')) {
                      setQuery('分析过去 30 天某新协议的 LP 撤池风险及大户资金流出行为')
                    }
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <FloatBadge delay={0.1} to="/insight">✦ 试一下 Insight</FloatBadge>
            <FloatBadge delay={0.3} to="/data-agent/intake">◈ Data Agent 全流程</FloatBadge>
            <FloatBadge delay={0.5} to="/alpha/strategy">A 策略回测</FloatBadge>
            <FloatBadge delay={0.7} to="/pricing">$ 查看定价</FloatBadge>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-[11.5px] text-slate-500">
            {[
              { icon: Shield, title: '安全可信', desc: '链上身份与权限体系' },
              { icon: Lock, title: '隐私合规', desc: '数据最小化与脱敏' },
              { icon: Sparkles, title: '去中心化存证', desc: '关键数据链上存证' },
              { icon: Zap, title: '高性能引擎', desc: '实时计算 + 弹性扩展' },
            ].map((b) => (
              <button
                key={b.title}
                type="button"
                className="flex items-start gap-2 text-left transition hover:text-orange-600"
                onClick={() => toast(`${b.title}：${b.desc}`, 'info')}
              >
                <b.icon size={16} className="mt-0.5 text-orange-400" />
                <div>
                  <div className="font-semibold text-slate-700">{b.title}</div>
                  <div className="text-slate-400">{b.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
