import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Database,
  FileText,
  Lock,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AlphaIcon, DataAgentIcon, InsightIcon } from '../components/ui/MoceLogo'
import { HomeLeftStickers, HomeRightStickers } from '../components/effects/HomeSideStickers'
import { useApp } from '../context/AppContext'

export function Home() {
  const { toast, setQuery } = useApp()

  return (
    <div className="mx-auto max-w-[1360px]">
      <div className="mb-4 mt-1 flex justify-center">
        <ProductTabs active="none" />
      </div>

      {/* grid order: left | center | right — stickers always visible ≥1024px */}
      <div className="hero-with-stickers">
        <HomeLeftStickers />

        <div className="hero-center text-center">
          <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 sm:text-[38px]">
            One Brand, <span className="text-moce-orange">Three Intelligence Layers</span>
          </h1>
          <p className="mt-2 text-[13.5px] text-slate-500">
            一个品牌，连接 Web3 数据分析、数据生产与 Alpha 发现。
          </p>

          {/* Mobile strip of stickers so narrow screens still see them */}
          <div className="sticker-mobile-strip mt-4 lg:hidden">
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Ask a Question</b>
              <p className="mt-1 text-slate-600">Which chains had the highest TVL growth…</p>
            </div>
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Odds Trend</b>
              <p className="mt-1 text-2xl font-bold text-orange-500">68%</p>
            </div>
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Lineage</b>
              <p className="mt-1 text-slate-600">raw_tx → cleansed_tx</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
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

          <div className="mt-6 flex flex-wrap items-center justify-center gap-1 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
            {[
              { to: '/insight', icon: <InsightIcon className="h-5 w-5" />, label: 'MOCE Insight' },
              { to: '/data-request', icon: <FileText size={14} className="text-orange-500" />, label: 'Data Request' },
              { to: '/data-agent/intake', icon: <DataAgentIcon className="h-5 w-5" />, label: 'MOCE Data Agent' },
              { to: '/data-agent/deploy', icon: <Database size={14} className="text-blue-500" />, label: 'New Data Asset' },
              {
                to: '/alpha',
                icon: (
                  <span className="flex gap-0.5">
                    <InsightIcon className="h-5 w-5" />
                    <AlphaIcon className="h-5 w-5" />
                  </span>
                ),
                label: 'Insight / Alpha',
              },
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

        <HomeRightStickers />
      </div>
    </div>
  )
}
