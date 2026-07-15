import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, Rocket, Shield } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AgentStepNav } from '../components/layout/AgentStepNav'
import { useApp } from '../context/AppContext'

const CHECKS = [
  'Flink Job 编译通过',
  'Checkpoint / Watermark 配置校验',
  'StarRocks 结果表 DDL 就绪',
  '血缘元数据注册',
  'SLA 告警规则挂载',
  '灰度 10% 流量观察 2 分钟',
]

export function DataAgentDeploy() {
  const { toast, deploying, setDeploying, setAgentStep } = useApp()
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)

  const deploy = async () => {
    setDeploying(true)
    setFinished(false)
    setProgress(0)
    for (let i = 1; i <= CHECKS.length; i++) {
      await new Promise((r) => setTimeout(r, 400))
      setProgress(i)
    }
    setDeploying(false)
    setFinished(true)
    setAgentStep(6)
    toast('任务部署成功：dws_l2_tvl_compare_30d 已上线', 'success')
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>
      <AgentStepNav activeId={6} />

      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold text-slate-900">
          发布结果 · <span className="text-violet-600">Deploy</span>
        </h1>
        <p className="mt-1 text-[12.5px] text-slate-500">
          一键部署 Flink / Fluss / StarRocks 任务，并开启监控与 AIOps 联动。
        </p>
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[14px] font-bold text-slate-800">部署清单</div>
            <div className="text-[11.5px] text-slate-400">Job: dws_l2_tvl_compare_30d · Engine: Flink 1.18</div>
          </div>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            disabled={deploying}
            onClick={deploy}
          >
            {deploying ? <Loader2 size={14} className="animate-spin" /> : <Rocket size={14} />}
            {deploying ? '部署中…' : finished ? '重新部署' : '一键部署'}
          </button>
        </div>

        <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-orange-400 transition-all duration-300"
            style={{ width: `${(progress / CHECKS.length) * 100}%` }}
          />
        </div>

        <div className="space-y-2">
          {CHECKS.map((c, i) => {
            const ok = progress > i
            const active = deploying && progress === i
            return (
              <div key={c} className="flex items-center gap-2 text-[12.5px]">
                {ok ? (
                  <CheckCircle2 size={14} className="text-emerald-500" />
                ) : active ? (
                  <Loader2 size={14} className="animate-spin text-violet-500" />
                ) : (
                  <span className="inline-block h-3.5 w-3.5 rounded-full border border-slate-200" />
                )}
                <span className={ok ? 'text-slate-800' : 'text-slate-500'}>{c}</span>
              </div>
            )
          })}
        </div>

        {finished && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-[12.5px] text-emerald-800">
            <div className="mb-1 flex items-center gap-1.5 font-bold">
              <CheckCircle2 size={15} /> 发布成功
            </div>
            结果表已可被 MOCE Insight 命中；看板 sr_l2_competition_dashboard 已注册。建议开启 AIOps 实时监控。
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link to="/data-agent/warehouse" className="btn-outline !text-[12px]">
          返回分层
        </Link>
        <Link to="/insight" className="btn-outline !text-[12px]">
          回到 Insight 提问
        </Link>
        <Link to="/data-agent/aiops" className="btn-primary !text-[12px]">
          <Shield size={14} /> 打开 AIOps 监控
        </Link>
      </div>
    </div>
  )
}
