import {
  CheckCircle2,
  Circle,
  Download,
  RefreshCw,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'

const LAYERS = [
  {
    name: 'RAG 检索层',
    color: 'border-violet-200 bg-violet-50/50',
    nodes: [{ id: 'metadata_catalog', sub: 'PostgreSQL / Vector', x: 1 }],
  },
  {
    name: 'CDC 接入层',
    color: 'border-blue-200 bg-blue-50/40',
    nodes: [{ id: 'cdc_wallet_txn_raw', sub: 'Flink CDC → Kafka', x: 1 }],
  },
  {
    name: 'ODS 层\n(Fluss)',
    color: 'border-emerald-200 bg-emerald-50/40',
    nodes: [{ id: 'ods_arbitrum_protocol_metrics', sub: 'Fluss Table', x: 1 }],
  },
  {
    name: 'DWD 层\n(Fluss)',
    color: 'border-orange-200 bg-orange-50/40',
    nodes: [
      { id: 'dwd_protocol_tvl_daily', sub: 'Fluss Table', x: 1 },
      { id: 'dim_date', sub: 'Fluss Table', x: 2 },
      { id: 'dim_protocol', sub: 'Fluss Table', x: 2 },
    ],
  },
  {
    name: 'DWS 层\n(Fluss)',
    color: 'border-violet-300 bg-violet-50/60 ring-2 ring-violet-300',
    nodes: [
      { id: 'dws_l2_tvl_compare_30d', sub: 'Fluss Table', x: 1, active: true },
      { id: 'dws_l2_tvl_history', sub: 'Fluss Table', x: 2 },
    ],
  },
  {
    name: 'ADS / Result 层',
    color: 'border-pink-200 bg-pink-50/40',
    nodes: [{ id: 'ads_l2_competition_summary', sub: 'Paimon Table', x: 1 }],
  },
  {
    name: 'StarRocks Serving',
    color: 'border-sky-200 bg-sky-50/40',
    nodes: [{ id: 'sr_l2_competition_dashboard', sub: 'StarRocks Table', x: 1 }],
  },
]

export function DataAgentLineage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>

      <StepBar
        className="mb-4"
        steps={[
          { id: 1, label: '需求接收', status: 'done' },
          { id: 2, label: '任务规划', status: 'done' },
          { id: 3, label: 'NL to Job', status: 'active' },
          { id: 4, label: '数仓分层', status: 'pending' },
          { id: 5, label: '血缘分析', status: 'pending' },
          { id: 6, label: '发布结果', status: 'pending' },
        ]}
      />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_1fr_240px]">
        {/* Left */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">需求与 Agent 规划</div>
            <div className="mb-1 text-[10px] text-slate-400">自然语言需求</div>
            <p className="text-[12px] leading-relaxed text-slate-600">
              分析过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势、资金净流入，并产出可实时刷新的结果表与汇总看板。
            </p>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">Agent 规划进度</div>
            <div className="space-y-2">
              {[
                { t: '识别指标口径', s: 'done', time: '00:18' },
                { t: '检查已有任务 / 结果表', s: 'done', time: '00:35' },
                { t: 'RAG 检索元数据与知识库', s: 'done', time: '01:12' },
                { t: '自动生成任务方案', s: 'done', time: '01:45' },
                { t: '创建 Flink Job 与分层表', s: 'active', time: '02:30' },
                { t: '注册 StarRocks 结果表', s: 'pending', time: '…' },
              ].map((item) => (
                <div key={item.t} className="flex items-center gap-2 text-[11.5px]">
                  {item.s === 'done' ? (
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  ) : item.s === 'active' ? (
                    <Circle size={13} className="text-violet-500 fill-violet-100" />
                  ) : (
                    <Circle size={13} className="text-slate-300" />
                  )}
                  <span className={`flex-1 ${item.s === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>{item.t}</span>
                  <span className="text-slate-400 tabular-nums">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">知识与元数据来源</div>
            {[
              { t: 'RAG 知识库', n: '1,248 条' },
              { t: '元数据目录', n: '8,732 条' },
              { t: '历史任务方案', n: '1,326 条' },
            ].map((x) => (
              <div key={x.t} className="flex items-center justify-between border-b border-slate-50 py-1.5 text-[11.5px] last:border-0">
                <span className="text-slate-600">{x.t}</span>
                <span className="font-medium text-slate-800">{x.n} <span className="text-slate-300">›</span></span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center DAG */}
        <div className="card p-4">
          <div className="mb-1 text-center">
            <h1 className="text-[20px] font-extrabold text-slate-900">
              MOCE Data Agent · <span className="text-moce-orange">NL to Job & Lineage</span>
            </h1>
            <p className="mt-0.5 text-[11.5px] text-slate-500">
              将自然语言数据需求自动拆解为 Flink / Fluss / Paimon / StarRocks 数据任务，并生成血缘关系与部署方案。
            </p>
          </div>

          <div className="mb-2 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-700">任务 DAG / 数仓血缘</span>
            <div className="flex gap-3 text-slate-400">
              <span className="flex items-center gap-1"><span className="h-px w-4 bg-slate-400" /> 数据流</span>
              <span className="flex items-center gap-1"><span className="h-px w-4 border-t border-dashed border-slate-400" /> 依赖 / 引用</span>
            </div>
          </div>

          <div className="space-y-1.5">
            {LAYERS.map((layer) => (
              <div key={layer.name} className={`flex items-stretch gap-2 rounded-xl border px-2 py-1.5 ${layer.color}`}>
                <div className="flex w-24 shrink-0 items-center text-[10px] font-semibold leading-tight text-slate-600 whitespace-pre-line">
                  {layer.name}
                </div>
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  {layer.nodes.map((n) => (
                    <div
                      key={n.id}
                      className={`rounded-lg border bg-white px-2.5 py-1.5 shadow-sm ${
                        (n as { active?: boolean }).active
                          ? 'border-violet-400 ring-2 ring-violet-200'
                          : 'border-slate-200'
                      }`}
                    >
                      <div className="text-[11px] font-semibold text-slate-800">{n.id}</div>
                      <div className="text-[9.5px] text-slate-400">{n.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Job Spec */}
          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
            <div className="mb-2 text-[11px] font-semibold text-slate-600">Job Spec（基于当前选中节点）</div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { k: 'Job Name', v: 'dws_l2_tvl_compare_30d' },
                { k: 'DAG ID', v: 'dag_20250518_0017' },
                { k: 'Engine', v: 'Flink 1.18' },
                { k: 'Storage', v: 'Fluss 0.6.0' },
                { k: 'Serving', v: 'StarRocks 3.3' },
                { k: 'SLA', v: '15m 延迟 / 99.9%' },
                { k: 'Checkpoint', v: '5m' },
                { k: 'Watermark', v: 'event_time + 5m' },
                { k: 'Join Strategy', v: 'Broadcast + Shuffle' },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10.5px]">
                  <span className="text-slate-400">{s.k}</span>
                  <div className="font-medium text-slate-700">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <button className="btn-outline !text-[12px]"><RefreshCw size={13} /> 重新生成方案</button>
            <button className="btn-outline !text-[12px]"><Download size={13} /> 导出 DAG</button>
            <button className="btn-primary !text-[12px]"><Rocket size={13} /> 部署新任务</button>
            <button className="btn-outline !text-[12px]"><Sparkles size={13} className="text-violet-500" /> 发起新一轮优化</button>
          </div>
        </div>

        {/* Right detail */}
        <aside className="card-soft p-3">
          <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-slate-700">
            血缘详情
            <button className="flex items-center gap-1 text-[11px] font-normal text-slate-400">
              <RefreshCw size={11} /> 刷新
            </button>
          </div>
          <div className="mb-2 rounded-lg border border-violet-200 bg-violet-50 px-2 py-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11.5px] font-bold text-violet-700">dws_l2_tvl_compare_30d</span>
              <span className="rounded bg-violet-500 px-1.5 py-0.5 text-[9px] text-white">当前选中</span>
            </div>
          </div>
          <div className="space-y-1.5 text-[11.5px]">
            {[
              ['节点类型', 'DWS 层（汇总表）'],
              ['上游', 'dwd_protocol_tvl_daily'],
              ['下游', 'ads_l2_competition_summary'],
              ['刷新频率', '15 分钟'],
              ['主键', 'date, chain, protocol'],
              ['负责人', 'data-analyst'],
              ['状态', '运行中'],
              ['健康度', '100%'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2 border-b border-slate-50 py-1">
                <span className="text-slate-400">{k}</span>
                <span className="text-right font-medium text-slate-700">{v}</span>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <div className="mb-1.5 text-[11px] font-semibold text-slate-600">字段信息 (7)</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-slate-400">
                  <th className="py-1 text-left font-medium">字段名</th>
                  <th className="py-1 text-left font-medium">类型</th>
                  <th className="py-1 text-left font-medium">说明</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {[
                  ['date', 'DATE', '统计日期'],
                  ['chain', 'VARCHAR(16)', '链名'],
                  ['protocol', 'VARCHAR(64)', '协议名称'],
                  ['tvl_usd', 'DECIMAL(38,6)', 'TVL (USD)'],
                  ['tvl_change_7d_usd', 'DECIMAL', '7 日 TVL 变化'],
                  ['net_inflow_7d_usd', 'DECIMAL', '7 日净流入'],
                  ['tvl_rank', 'INT', 'TVL 排名'],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-slate-50">
                    <td className="py-1 font-mono text-[9.5px]">{r[0]}</td>
                    <td className="py-1">{r[1]}</td>
                    <td className="py-1">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  )
}
