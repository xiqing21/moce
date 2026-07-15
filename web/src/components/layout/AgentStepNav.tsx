import { Link, useLocation } from 'react-router-dom'
import { StepBar, type Step } from '../ui/StepBar'

export const AGENT_FLOW = [
  { id: 1, label: '需求接收', path: '/data-agent/intake' },
  { id: 2, label: '任务规划', path: '/data-agent/planning' },
  { id: 3, label: 'NL to Job', path: '/data-agent/lineage' },
  { id: 4, label: '数仓分层', path: '/data-agent/warehouse' },
  { id: 5, label: '血缘分析', path: '/data-agent/lineage' },
  { id: 6, label: '发布结果', path: '/data-agent/deploy' },
] as const

export const AIOPS_FLOW = [
  { id: 1, label: '异常检测', path: '/data-agent/aiops' },
  { id: 2, label: '根因分析', path: '/data-agent/aiops?step=2' },
  { id: 3, label: '影响评估', path: '/data-agent/aiops?step=3' },
  { id: 4, label: '优化建议', path: '/data-agent/aiops?step=4' },
  { id: 5, label: '修复执行', path: '/data-agent/aiops?step=5' },
  { id: 6, label: '复盘沉淀', path: '/data-agent/aiops?step=6' },
] as const

// Each step is a dedicated screen — navigate with ?step=N

export function AgentStepNav({ activeId }: { activeId: number }) {
  const { pathname } = useLocation()
  const showSteps = activeId > 0

  const steps: Step[] = AGENT_FLOW.map((s) => ({
    id: s.id,
    label: s.label,
    status: s.id < activeId ? 'done' : s.id === activeId ? 'active' : 'pending',
  }))

  return (
    <div className="mb-4 space-y-2">
      {showSteps && <StepBar steps={steps} />}
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {AGENT_FLOW.map((s) => (
          <Link
            key={s.id}
            to={s.path}
            className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium transition ${
              pathname === s.path || s.id === activeId
                ? 'bg-violet-100 text-violet-700'
                : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-violet-600'
            }`}
          >
            {s.id}. {s.label}
          </Link>
        ))}
        <Link
          to="/data-agent/aiops"
          className={`rounded-full px-2.5 py-1 text-[10.5px] font-medium ${
            pathname.includes('aiops')
              ? 'bg-red-100 text-red-700'
              : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-red-600'
          }`}
        >
          AIOps 运维
        </Link>
      </div>
    </div>
  )
}
