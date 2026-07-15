import { Link } from 'react-router-dom'
import { BookOpen, Code2, Layers, Rocket } from 'lucide-react'
import { useApp } from '../context/AppContext'

const GUIDES = [
  { title: '快速开始', desc: '3 分钟跑通自然语言查询 → 图表 → 报告', to: '/insight', icon: Rocket },
  { title: 'Insight 工作流', desc: '提问、可行性判断、SQL、NL to Chart、智能报告', to: '/insight/feasibility', icon: BookOpen },
  { title: 'Data Agent 全流程', desc: '需求卡 → 规划 → NL to Job → 分层 → 发布 → AIOps', to: '/data-agent/intake', icon: Layers },
  { title: 'Alpha 研究', desc: '预测市场情报与 Strategy Lab 回测', to: '/alpha', icon: Code2 },
]

export function Docs() {
  const { toast } = useApp()

  return (
    <div className="mx-auto max-w-3xl pt-6">
      <h1 className="text-center text-[28px] font-extrabold text-slate-900">
        MOCE <span className="text-moce-orange">文档</span>
      </h1>
      <p className="mt-2 text-center text-[13px] text-slate-500">
        演示环境文档中心 — 所有链接均可跳转到对应交互流程。
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link key={g.title} to={g.to} className="card group p-4 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500 group-hover:bg-orange-100">
              <g.icon size={18} />
            </div>
            <div className="text-[14px] font-bold text-slate-800">{g.title}</div>
            <p className="mt-1 text-[12px] text-slate-500">{g.desc}</p>
          </Link>
        ))}
      </div>

      <div className="card mt-6 p-5">
        <div className="mb-2 text-[13px] font-bold text-slate-800">API 示例（Mock）</div>
        <pre className="code-block text-[11px]">{`POST /v1/insight/query
{
  "question": "过去 7 天 Arbitrum 净流入 Top 20",
  "format": "chart+table"
}`}</pre>
        <button
          type="button"
          className="btn-primary mt-3 !text-[12px]"
          onClick={() => toast('已复制 API 示例到剪贴板（Mock）', 'success')}
        >
          复制示例
        </button>
      </div>
    </div>
  )
}
