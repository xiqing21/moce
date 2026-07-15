import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle, Loader2, Sparkles } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AgentStepNav } from '../components/layout/AgentStepNav'
import { useApp } from '../context/AppContext'

const PLAN_STEPS = [
  { t: '识别指标口径', d: 'TVL / Net Inflow / 协议维度' },
  { t: '检查已有任务 / 结果表', d: '命中 2 张候选明细，0 张现成汇总' },
  { t: 'RAG 检索元数据与知识库', d: '检索 1,248 条知识 + 8,732 元数据' },
  { t: '自动生成任务方案', d: 'Flink Job + Fluss 分层 + StarRocks Serving' },
  { t: '评估成本与 SLA', d: '预估日成本 $12.4 · SLA 15m' },
]

export function DataAgentPlanning() {
  const navigate = useNavigate()
  const { toast, setAgentStep } = useApp()
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState<number[]>([])

  const runPlan = async () => {
    setRunning(true)
    setDone([])
    for (let i = 0; i < PLAN_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 450))
      setDone((d) => [...d, i])
    }
    setRunning(false)
    setAgentStep(2)
    toast('任务规划完成，可生成 NL to Job 方案', 'success')
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>
      <AgentStepNav activeId={2} />

      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold text-slate-900">
          任务规划 · <span className="text-violet-600">Agent Planning</span>
        </h1>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Agent 自动拆解数据任务、检索资产与知识库，生成可部署方案草稿。
        </p>
      </div>

      <div className="card mx-auto max-w-xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13px] font-bold text-slate-800">规划进度</span>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            disabled={running}
            onClick={runPlan}
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {running ? '规划中…' : done.length === PLAN_STEPS.length ? '重新规划' : '开始规划'}
          </button>
        </div>

        <div className="space-y-3">
          {PLAN_STEPS.map((s, i) => {
            const ok = done.includes(i)
            const active = running && done.length === i
            return (
              <div
                key={s.t}
                className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 transition ${
                  ok ? 'border-emerald-200 bg-emerald-50/50' : active ? 'border-violet-200 bg-violet-50/50' : 'border-slate-100'
                }`}
              >
                {ok ? (
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
                ) : active ? (
                  <Loader2 size={16} className="mt-0.5 animate-spin text-violet-500" />
                ) : (
                  <Circle size={16} className="mt-0.5 text-slate-300" />
                )}
                <div>
                  <div className="text-[13px] font-semibold text-slate-800">{s.t}</div>
                  <div className="text-[11.5px] text-slate-500">{s.d}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link to="/data-agent/intake" className="btn-outline !text-[12px]">
          上一步
        </Link>
        <button
          type="button"
          className="btn-primary !text-[12px]"
          disabled={done.length < PLAN_STEPS.length && !running}
          onClick={() => {
            if (done.length < PLAN_STEPS.length) {
              toast('请先完成任务规划', 'warning')
              return
            }
            setAgentStep(3)
            navigate('/data-agent/lineage')
          }}
        >
          生成 NL to Job 方案 →
        </button>
      </div>
    </div>
  )
}
