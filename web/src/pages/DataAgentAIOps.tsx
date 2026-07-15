import {
  AlertTriangle,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  Wrench,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'
import { SparkLine } from '../components/charts/MiniCharts'
import { metricSparks } from '../data/mock'

const tasks = [
  { name: 'flink_job_l2_competition_realtime_v1', type: 'Flink SQL', env: 'prod', level: '严重', time: '2 分钟前', active: true },
  { name: 'flink_job_wallet_inflow_monitor_v2', type: 'Flink SQL', env: 'prod', level: '告警', time: '5 分钟前' },
  { name: 'sr_l2_competition_dashboard', type: 'StarRocks', env: 'prod', level: '告警', time: '8 分钟前' },
  { name: 'flink_job_user_activity_agg_v1', type: 'Flink SQL', env: 'prod', level: '正常', time: '12 分钟前' },
]

export function DataAgentAIOps() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <StepBar
          steps={[
            { id: 1, label: '异常检测', status: 'active' },
            { id: 2, label: '根因分析', status: 'pending' },
            { id: 3, label: '影响评估', status: 'pending' },
            { id: 4, label: '优化建议', status: 'pending' },
            { id: 5, label: '修复执行', status: 'pending' },
            { id: 6, label: '复盘沉淀', status: 'pending' },
          ]}
        />
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />数据刷新：10s 前</span>
          <button className="btn-outline !py-1 !text-[11px]"><RefreshCw size={11} /> 自动刷新</button>
        </div>
      </div>

      <div className="mb-3">
        <h1 className="text-[20px] font-extrabold text-slate-900">
          MOCE Data Agent · <span className="text-moce-orange">Intelligent AIOps</span>
        </h1>
        <p className="text-[12px] text-slate-500">面向实时数据链路的异常检测、根因分析、血缘影响评估与优化建议。</p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_1fr_230px]">
        {/* Left */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">监控对象 / 告警总览</div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { n: 1, l: '严重', c: 'text-red-600 bg-red-50' },
                { n: 2, l: '告警', c: 'text-amber-600 bg-amber-50' },
                { n: 5, l: '提醒', c: 'text-blue-600 bg-blue-50' },
                { n: 24, l: '正常', c: 'text-emerald-600 bg-emerald-50' },
              ].map((x) => (
                <div key={x.l} className={`rounded-lg ${x.c} py-1.5`}>
                  <div className="text-lg font-bold">{x.n}</div>
                  <div className="text-[9px]">{x.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-1">
              {['环境 全部', '引擎 全部', '严重级别 全部'].map((f) => (
                <span key={f} className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px] text-slate-500">{f} ▾</span>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[11px] text-slate-400">
              <Search size={12} /> 搜索任务名称
            </div>
          </div>

          <div className="card-soft p-2">
            <div className="mb-1 px-1 text-[12px] font-semibold text-slate-700">任务列表</div>
            <div className="space-y-1">
              {tasks.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-lg px-2 py-1.5 text-[11px] ${
                    t.active ? 'border border-red-200 bg-red-50/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-medium text-slate-800 leading-snug">{t.name}</span>
                    <span className={`shrink-0 rounded px-1 py-0.5 text-[9px] font-medium ${
                      t.level === '严重' ? 'bg-red-100 text-red-600' :
                      t.level === '告警' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>{t.level}</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">{t.type} · {t.env} · {t.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-slate-400">
              <span>共 4 项</span>
              <span>&lt; 1 &gt;</span>
            </div>
          </div>
        </aside>

        {/* Center */}
        <div className="space-y-3">
          <div className="card p-3">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-[14px] font-bold text-slate-900">flink_job_l2_competition_realtime_v1 任务失败</span>
              <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-medium text-white">严重</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
              <span>任务类型：Flink SQL</span>
              <span>环境：prod</span>
              <span>引擎版本：Flink 1.18.1</span>
              <span>异常时间：2025-05-18 10:24:31</span>
              <span>持续时间：18 分钟</span>
            </div>
          </div>

          <div className="card p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">根因分析链路</div>
            <div className="flex flex-wrap items-center gap-1">
              {[
                { n: 1, t: 'Source CDC 波动', d: '变更率突增 320%' },
                { n: 2, t: 'Key 热点倾斜', d: 'Top Key 占比 78%' },
                { n: 3, t: 'Backpressure 升高', d: '背压比例 89%' },
                { n: 4, t: 'Checkpoint 超时', d: '耗时超阈值 3x' },
                { n: 5, t: 'Job Failover', d: '失败重启 3 次' },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-300">→</span>}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
                    <div className="text-[10px] font-bold text-orange-600">{s.n}. {s.t}</div>
                    <div className="text-[9.5px] text-slate-500">{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">实时指标监控</div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
              {[
                { l: 'CPU 使用率', v: '86%', c: '+18%', d: metricSparks.cpu, color: '#f97316' },
                { l: '内存使用率', v: '78%', c: '+12%', d: metricSparks.mem, color: '#f59e0b' },
                { l: 'Checkpoint 耗时', v: '245.6 s', c: '+156%', d: metricSparks.ckpt, color: '#ef4444' },
                { l: 'Watermark Lag', v: '32.4 s', c: '+210%', d: metricSparks.lag, color: '#f97316' },
                { l: 'Backpressure', v: '89%', c: '+36%', d: metricSparks.bp, color: '#ef4444' },
                { l: '吞吐量', v: '12.3K r/s', c: '-28%', d: metricSparks.thr, color: '#22c55e' },
              ].map((m) => (
                <div key={m.l} className="rounded-lg border border-slate-100 p-2">
                  <div className="text-[10px] text-slate-400">{m.l}</div>
                  <div className="text-[14px] font-bold text-slate-800">{m.v}</div>
                  <div className={`text-[10px] ${m.c.startsWith('+') ? 'text-red-500' : 'text-emerald-500'}`}>{m.c}</div>
                  <SparkLine data={m.d} color={m.color} height={28} />
                </div>
              ))}
            </div>
          </div>

          <div className="card p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-slate-700">
              任务拓扑 / 作业图（实时）
              <div className="flex items-center gap-2 text-[10px] font-normal text-slate-400">
                <span>布局：自动 ▾</span>
                <span>− 100% +</span>
              </div>
            </div>
            <div className="relative flex flex-wrap items-center justify-center gap-3 py-4">
              <NodeBox name="cdc_protocol_metrics_raw" sub="CDC Source · 12.3K r/s" ok />
              <span className="text-slate-300">→</span>
              <NodeBox name="dwd_protocol_tx_daily" sub="KeyBy / Window · 9.1K r/s" ok />
              <span className="text-slate-300">→</span>
              <NodeBox name="dwd_chain_net_inflow_daily" sub="Aggregation · 失败" fail />
              <span className="text-slate-300">→</span>
              <div className="flex flex-col gap-2">
                <NodeBox name="dws_l2_tvl_compare_30d" sub="Flink Table · 5.2K r/s" ok />
                <NodeBox name="ads_l2_competition_summary" sub="Doris Table · 3.1K r/s" ok />
                <NodeBox name="sr_l2_competition_dashboard" sub="StarRocks MV · 2.7K r/s" ok />
              </div>
            </div>
            <div className="flex gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />正常</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />告警</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" />严重</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300" />离线</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">影响评估</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: '受影响结果表数量', v: '6', s: '较昨日 +2' },
                { l: '受影响看板数量', v: '3', s: '较昨日 +1' },
                { l: '受影响 SLA', v: '2 项', s: 'SLA 告警中' },
                { l: '预计业务影响', v: '高', s: '用户报表延迟' },
              ].map((x) => (
                <div key={x.l} className="rounded-lg bg-slate-50 p-2 text-center">
                  <div className="text-[9px] text-slate-400">{x.l}</div>
                  <div className="text-lg font-bold text-slate-800">{x.v}</div>
                  <div className="text-[9px] text-slate-400">{x.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">血缘影响链路</div>
            <div className="space-y-1 text-[11px]">
              <div className="text-slate-400">上游</div>
              <div className="rounded border border-slate-100 px-2 py-1 text-slate-600">cdc_protocol_metrics_raw</div>
              <div className="rounded border border-slate-100 px-2 py-1 text-slate-600">ods_arbitrum_protocol_metrics</div>
              <div className="mt-1 text-slate-400">当前异常任务</div>
              <div className="rounded border border-red-200 bg-red-50 px-2 py-1 font-medium text-red-600">⚠ dwd_chain_net_inflow_daily</div>
              <div className="mt-1 text-slate-400">下游</div>
              {['dws_l2_tvl_compare_30d', 'ads_l2_competition_summary', 'sr_l2_competition_dashboard'].map((n) => (
                <div key={n} className="rounded border border-slate-100 px-2 py-1 text-slate-600">{n}</div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">最近告警</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-slate-400">
                  <th className="py-1 text-left font-medium">时间</th>
                  <th className="py-1 text-left font-medium">级别</th>
                  <th className="py-1 text-left font-medium">内容</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['10:42:31', '严重', '任务失败: Job Failover'],
                  ['10:41:58', '告警', 'Checkpoint 超时'],
                  ['10:40:12', '告警', 'Backpressure 升高'],
                  ['10:39:05', '提醒', 'Watermark Lag 升高'],
                  ['10:35:47', '提醒', 'Source 变更率突增'],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-slate-50 text-slate-600">
                    <td className="py-1">{r[0]}</td>
                    <td className="py-1">
                      <span className={r[1] === '严重' ? 'text-red-500' : r[1] === '告警' ? 'text-amber-500' : 'text-blue-500'}>{r[1]}</span>
                    </td>
                    <td className="py-1">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-1 text-[11px] text-orange-500">查看全部告警</button>
          </div>
        </aside>
      </div>

      {/* Bottom actions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button className="btn-outline !text-[12px]">发送告警</button>
        <button className="btn-outline !text-[12px]"><RotateCcw size={13} /> 自动重启任务</button>
        <button className="btn-outline !text-[12px]"><Wrench size={13} /> 生成优化方案</button>
        <button className="btn-outline !text-[12px]">回滚上一个稳定版本</button>
        <button className="btn-outline !text-[12px]">创建工单</button>
        <button className="btn-primary !text-[12px]"><Shield size={13} /> 一键执行修复</button>
      </div>
    </div>
  )
}

function NodeBox({ name, sub, ok, fail }: { name: string; sub: string; ok?: boolean; fail?: boolean }) {
  return (
    <div className={`rounded-lg border px-2.5 py-1.5 text-[10.5px] ${
      fail ? 'border-red-300 bg-red-50' : ok ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white'
    }`}>
      <div className={`font-semibold ${fail ? 'text-red-600' : 'text-slate-800'}`}>
        {fail && '⚠ '}{name}
      </div>
      <div className="text-[9px] text-slate-400">{sub}</div>
    </div>
  )
}
