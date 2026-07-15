import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2, Database, Layers } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AgentStepNav } from '../components/layout/AgentStepNav'
import { useApp } from '../context/AppContext'

const LAYERS = [
  { name: 'ODS', engine: 'Fluss', tables: ['ods_arbitrum_protocol_metrics', 'ods_optimism_protocol_metrics'], status: '就绪' },
  { name: 'DWD', engine: 'Fluss', tables: ['dwd_protocol_tvl_daily', 'dwd_chain_capital_flow_daily', 'dim_protocol'], status: '就绪' },
  { name: 'DWS', engine: 'Fluss', tables: ['dws_l2_tvl_compare_30d', 'dws_l2_tvl_history'], status: '待部署' },
  { name: 'ADS', engine: 'Paimon', tables: ['ads_l2_competition_summary'], status: '待部署' },
  { name: 'Serving', engine: 'StarRocks', tables: ['sr_l2_competition_dashboard'], status: '待注册' },
]

export function DataAgentWarehouse() {
  const navigate = useNavigate()
  const { toast, setAgentStep, selectedNode, setSelectedNode } = useApp()

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>
      <AgentStepNav activeId={4} />

      <div className="mb-5 text-center">
        <h1 className="text-[26px] font-extrabold text-slate-900">
          数仓分层 · <span className="text-violet-600">Medallion Design</span>
        </h1>
        <p className="mt-1 text-[12.5px] text-slate-500">
          按 ODS → DWD → DWS → ADS → Serving 自动分层，点击表名可查看字段与血缘。
        </p>
      </div>

      <div className="space-y-3">
        {LAYERS.map((layer, idx) => (
          <div key={layer.name} className="card p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-bold text-violet-700">
                {idx + 1}
              </span>
              <span className="text-[14px] font-bold text-slate-800">{layer.name}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{layer.engine}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  layer.status === '就绪'
                    ? 'bg-emerald-50 text-emerald-600'
                    : layer.status === '待部署'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'
                }`}
              >
                {layer.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.tables.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setSelectedNode(t)
                    toast(`已选中节点：${t}`, 'info')
                  }}
                  className={`rounded-lg border px-3 py-1.5 text-left text-[11.5px] font-medium transition ${
                    selectedNode === t
                      ? 'border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-200'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-violet-200'
                  }`}
                >
                  <Database size={12} className="mr-1 inline text-slate-400" />
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2 text-[12.5px] text-slate-600">
          <Layers size={15} className="text-violet-500" />
          当前选中：<b className="text-slate-800">{selectedNode}</b>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/data-agent/lineage" className="btn-outline !text-[12px]">
            查看血缘 DAG
          </Link>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            onClick={() => {
              setAgentStep(6)
              toast('分层设计已确认，进入发布', 'success')
              navigate('/data-agent/deploy')
            }}
          >
            <CheckCircle2 size={14} /> 确认分层并发布
          </button>
        </div>
      </div>
    </div>
  )
}
