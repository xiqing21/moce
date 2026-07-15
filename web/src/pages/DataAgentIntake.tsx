import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, FileText, MessageSquare, Sparkles } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AgentStepNav } from '../components/layout/AgentStepNav'
import { useApp } from '../context/AppContext'

export function DataAgentIntake() {
  const navigate = useNavigate()
  const { query, setQuery, toast, setAgentStep } = useApp()
  const [accepted, setAccepted] = useState(false)
  const [localQ, setLocalQ] = useState(
    query || '分析过去 30 天某新协议的 LP 撤池风险及大户资金流出行为',
  )

  const accept = () => {
    setQuery(localQ)
    setAccepted(true)
    setAgentStep(1)
    toast('需求已接收，正在进入任务规划…', 'success')
    window.setTimeout(() => navigate('/data-agent/planning'), 600)
  }

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>
      <AgentStepNav activeId={1} />

      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold text-slate-900">
          需求接收 · <span className="text-violet-600">Intake</span>
        </h1>
        <p className="mt-1 text-[12.5px] text-slate-500">
          从 Insight 数据需求卡或自然语言入口接入，标准化为可执行的 Data Request。
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-slate-800">
            <MessageSquare size={15} className="text-violet-500" />
            原始需求
          </div>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-700 outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              '对比 L2 TVL 并产出实时看板',
              'LP 撤池风险 + 大户流出',
              '跨链资金净流入监控',
            ].map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-violet-200 hover:text-violet-700"
                onClick={() => setLocalQ(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-slate-800">
            <FileText size={15} className="text-orange-500" />
            标准化字段（自动解析）
          </div>
          <div className="space-y-2 text-[12.5px]">
            {[
              ['需求类型', '结果表 + 实时看板'],
              ['业务域', 'DeFi / L2 竞争分析'],
              ['时间范围', '过去 30 天，可滚动刷新'],
              ['主体', 'Arbitrum vs Optimism'],
              ['产出物', 'DWS 汇总表 + StarRocks 看板'],
              ['SLA', '延迟 ≤ 15 分钟，可用性 99.9%'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3 border-b border-slate-50 py-1.5">
                <span className="w-20 shrink-0 text-slate-400">{k}</span>
                <span className="font-medium text-slate-700">{v}</span>
              </div>
            ))}
          </div>
          {accepted && (
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-[12px] text-emerald-700">
              <CheckCircle2 size={14} /> 已接收，跳转任务规划…
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link to="/data-request" className="btn-outline !text-[12px]">
          返回数据需求卡
        </Link>
        <button type="button" className="btn-primary !px-6 !text-[13px]" onClick={accept}>
          <Sparkles size={14} /> 确认接收并进入规划
        </button>
      </div>
    </div>
  )
}
