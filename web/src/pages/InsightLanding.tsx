import { Link } from 'react-router-dom'
import {
  Activity,
  Brain,
  CheckCircle2,
  Database,
  Flame,
  Globe2,
  Search,
  Send,
  Shield,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { SparkArea } from '../components/charts/MiniCharts'
import { tokenInflow, tvlSpark, volumeSpark } from '../data/mock'

const CAPABILITIES = [
  { icon: Activity, label: '活跃地址' },
  { icon: Zap, label: 'TVL 趋势' },
  { icon: Search, label: '鲸鱼监控' },
  { icon: Database, label: '链上交易量' },
  { icon: Wallet, label: '协议收入' },
  { icon: Flame, label: 'Gas 分析' },
  { icon: Globe2, label: '跨链流量' },
  { icon: Shield, label: '钱包画像' },
]

const FEATURES = [
  { icon: Globe2, color: 'text-orange-500 bg-orange-50', title: '多链覆盖', desc: '覆盖 30+ 链与 L2，持续扩展全面支持多链数据分析需求。', tag: '30+ 链' },
  { icon: Database, color: 'text-violet-500 bg-violet-50', title: '海量数据', desc: 'PB 级链上数据存储与处理毫秒级查询，秒级返回结果。', tag: 'PB 级数据' },
  { icon: Brain, color: 'text-amber-500 bg-amber-50', title: '大模型驱动', desc: '自研 AI 模型理解链上语义更懂 Web3 的智能分析引擎。', tag: 'AI 增强' },
  { icon: Shield, color: 'text-emerald-500 bg-emerald-50', title: '安全可靠', desc: '企业级安全架构与隐私保护多重审计，数据安全合规。', tag: 'SOC 2 认证' },
]

export function InsightLanding() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-4 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <div className="relative">
        {/* Left floating cards */}
        <div className="pointer-events-none absolute left-0 top-4 z-20 hidden w-[210px] space-y-3 xl:block">
          <div className="card-soft pointer-events-auto p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">◆</span>
              Arbitrum TVL
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">$2.48B</span>
              <span className="text-[11px] font-medium text-emerald-500">+12.35%</span>
              <span className="text-[10px] text-slate-400">较上周期</span>
            </div>
            <SparkArea data={tvlSpark} color="#f97316" height={52} />
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>May 12</span><span>May 16</span><span>May 18</span>
            </div>
          </div>

          <div className="card-soft pointer-events-auto p-3">
            <div className="mb-1 text-[11px] font-medium text-slate-600">链上交易量趋势</div>
            <div className="mb-1 flex gap-1 text-[10px]">
              {['7D', '30D', '90D'].map((t, i) => (
                <span key={t} className={`rounded px-1.5 py-0.5 ${i === 1 ? 'bg-orange-50 text-orange-600' : 'text-slate-400'}`}>{t}</span>
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">$15.32B</span>
              <span className="text-[11px] text-emerald-500">+18.62%</span>
            </div>
            <SparkArea data={volumeSpark} color="#f97316" height={48} />
          </div>

          <div className="flex flex-col gap-2">
            {['Polygon', 'Base'].map((c) => (
              <div key={c} className="pointer-events-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Right floating cards */}
        <div className="pointer-events-none absolute right-0 top-4 z-20 hidden w-[220px] space-y-3 xl:block">
          <div className="card-soft pointer-events-auto p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <CheckCircle2 size={13} /> Query Result
              </div>
              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">命中模板</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between"><span>查询耗时</span><span className="font-semibold text-slate-800">1.32s</span></div>
              <div className="flex justify-between"><span>数据范围</span><span className="text-slate-700">2024-05-12 ~ 2024-05-18</span></div>
            </div>
            <button className="mt-2 text-[11px] font-medium text-orange-500">查看详情 →</button>
          </div>

          <div className="card-soft pointer-events-auto p-3">
            <div className="mb-2 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-700">Token 净流入排行榜 (7D)</span>
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] text-red-500">OP Optimism</span>
            </div>
            <div className="space-y-1.5">
              {tokenInflow.map((t) => (
                <div key={t.token} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 text-slate-400">{t.rank}</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: t.color }}>
                    {t.token[0]}
                  </span>
                  <span className="flex-1 font-medium text-slate-700">{t.token}</span>
                  <span className="text-slate-600">{t.amount}</span>
                </div>
              ))}
            </div>
            <button className="mt-2 text-[11px] font-medium text-orange-500">查看完整榜单 →</button>
          </div>
        </div>

        {/* Center */}
        <div className="relative z-10 mx-auto max-w-[720px] pt-4 text-center">
          <h1 className="text-[32px] font-extrabold tracking-tight text-slate-900 sm:text-[38px]">
            从自然语言到 <span className="text-moce-orange">Web3 洞察</span>
          </h1>
          <p className="mt-2 text-[13px] text-slate-500">
            面向链上分析、协议运营与研究团队的 AI 数据分析入口。
          </p>

          <div className="card mt-6 p-4 text-left">
            <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50/40 px-3 py-2.5">
              <input
                className="flex-1 bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
                defaultValue="查询过去 7 天 Arbitrum 上净流入最高的 20 个代币"
              />
              <Link to="/insight/query" className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm">
                <Send size={14} />
              </Link>
            </div>

            <div className="mt-3">
              <div className="mb-2 flex items-center gap-1 text-[11px] font-medium text-orange-500">
                <Sparkles size={12} /> 推荐问题
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '对比 Optimism 与 Arbitrum 的 TVL 周环比',
                  '找出近 24 小时异常活跃的链上地址',
                  '统计 Uniswap 最近 30 天每日活跃地址与交易量趋势',
                  '生成某协议日活、交易额与留存分析',
                ].map((q) => (
                  <Link
                    key={q}
                    to="/insight/feasibility"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-orange-200 hover:text-orange-600"
                  >
                    <Search size={11} className="text-slate-400" />
                    {q}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-amber-400" />
                命中模板 / 向量缓存，可秒级返回
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                平均返回时间 &lt; 2s <CheckCircle2 size={12} />
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {CAPABILITIES.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11.5px] text-slate-600 shadow-sm"
              >
                <c.icon size={13} className="text-orange-400" />
                {c.label}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-3.5 text-left">
                <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon size={16} />
                </div>
                <div className="text-[13px] font-bold text-slate-800">{f.title}</div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{f.desc}</p>
                <div className="mt-2 text-[11px] font-semibold text-orange-500">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
