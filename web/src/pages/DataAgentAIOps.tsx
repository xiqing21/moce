import type { ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  RefreshCw,
  RotateCcw,
  Search,
  Shield,
  Wrench,
  Activity,
  Target,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { AgentStepNav, AIOPS_FLOW } from '../components/layout/AgentStepNav'
import { StepBar, type Step } from '../components/ui/StepBar'
import { SparkLine } from '../components/charts/MiniCharts'
import { metricSparks } from '../data/mock'
import { useApp } from '../context/AppContext'

const tasks = [
  { name: 'flink_job_l2_competition_realtime_v1', type: 'Flink SQL', env: 'prod', level: '严重', time: '2 分钟前', active: true },
  { name: 'flink_job_wallet_inflow_monitor_v2', type: 'Flink SQL', env: 'prod', level: '告警', time: '5 分钟前' },
  { name: 'sr_l2_competition_dashboard', type: 'StarRocks', env: 'prod', level: '告警', time: '8 分钟前' },
  { name: 'flink_job_user_activity_agg_v1', type: 'Flink SQL', env: 'prod', level: '正常', time: '12 分钟前' },
]

/** Each AIOps step is a dedicated screen (not stacked content) */
export function DataAgentAIOps() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { toast, repairing, setRepairing, setAiopsStep } = useApp()
  const step = Math.min(6, Math.max(1, Number(params.get('step') || 1)))

  const steps: Step[] = AIOPS_FLOW.map((s) => ({
    id: s.id,
    label: s.label,
    status: s.id < step ? 'done' : s.id === step ? 'active' : 'pending',
  }))

  const goStep = (n: number) => {
    const next = Math.min(6, Math.max(1, n))
    setAiopsStep(next)
    navigate(next === 1 ? '/data-agent/aiops' : `/data-agent/aiops?step=${next}`)
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="agent" />
      </div>
      <AgentStepNav activeId={0} />

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <StepBar steps={steps} />
        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            数据刷新：10s 前
          </span>
          <button
            type="button"
            className="btn-outline !py-1 !text-[11px]"
            onClick={() => toast('指标已刷新', 'success')}
          >
            <RefreshCw size={11} /> 刷新
          </button>
        </div>
      </div>

      {/* Step nav = real page switches */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
        {AIOPS_FLOW.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goStep(s.id)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
              step === s.id
                ? 'bg-orange-500 text-white shadow-sm shadow-orange-200'
                : s.id < step
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100'
                  : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-orange-600'
            }`}
          >
            {s.id < step ? '✓ ' : `${s.id}. `}
            {s.label}
          </button>
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-extrabold text-slate-900">
            MOCE Data Agent · <span className="text-moce-orange">Intelligent AIOps</span>
          </h1>
          <p className="text-[12px] text-slate-500">
            步骤 {step}/6 · {AIOPS_FLOW[step - 1]?.label} — 每一步独立页面，完成后再进入下一步
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn-outline !text-[12px]"
            disabled={step <= 1}
            onClick={() => goStep(step - 1)}
          >
            <ArrowLeft size={13} /> 上一步
          </button>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            disabled={step >= 6}
            onClick={() => {
              toast(`进入：${AIOPS_FLOW[step]?.label}`, 'info')
              goStep(step + 1)
            }}
          >
            下一步 <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Only render current step body */}
      {step === 1 && <StepDetect toast={toast} onNext={() => goStep(2)} />}
      {step === 2 && <StepRootCause toast={toast} onNext={() => goStep(3)} onPrev={() => goStep(1)} />}
      {step === 3 && <StepImpact toast={toast} onNext={() => goStep(4)} onPrev={() => goStep(2)} />}
      {step === 4 && <StepOptimize toast={toast} onNext={() => goStep(5)} onPrev={() => goStep(3)} />}
      {step === 5 && (
        <StepRepair
          toast={toast}
          repairing={repairing}
          setRepairing={setRepairing}
          onNext={() => goStep(6)}
          onPrev={() => goStep(4)}
        />
      )}
      {step === 6 && <StepRetro toast={toast} onRestart={() => goStep(1)} />}
    </div>
  )
}

function StepShell({
  icon: Icon,
  title,
  desc,
  children,
  footer,
}: {
  icon: typeof Activity
  title: string
  desc: string
  children: ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-orange-50/80 to-white px-5 py-3">
        <div className="flex items-center gap-2 text-[15px] font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Icon size={16} />
          </span>
          {title}
        </div>
        <p className="mt-1 text-[12px] text-slate-500">{desc}</p>
      </div>
      <div className="p-5">{children}</div>
      {footer && <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3">{footer}</div>}
    </div>
  )
}

function StepDetect({ toast, onNext }: { toast: (m: string, t?: 'success' | 'info') => void; onNext: () => void }) {
  return (
    <StepShell
      icon={Activity}
      title="1 · 异常检测"
      desc="实时扫描任务健康度，定位严重/告警对象。本页只做检测与选中，不混入根因或修复。"
      footer={
        <div className="flex justify-end gap-2">
          <button type="button" className="btn-outline !text-[12px]" onClick={() => toast('告警规则已静默 15 分钟', 'info')}>
            静默告警
          </button>
          <button type="button" className="btn-primary !text-[12px]" onClick={onNext}>
            确认异常并分析根因 →
          </button>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-1.5 text-center">
            {[
              { n: 1, l: '严重', c: 'text-red-600 bg-red-50' },
              { n: 2, l: '告警', c: 'text-amber-600 bg-amber-50' },
              { n: 5, l: '提醒', c: 'text-blue-600 bg-blue-50' },
              { n: 24, l: '正常', c: 'text-emerald-600 bg-emerald-50' },
            ].map((x) => (
              <button
                key={x.l}
                type="button"
                className={`rounded-lg ${x.c} py-2 transition hover:ring-2 hover:ring-orange-200`}
                onClick={() => toast(`筛选：${x.l} 级别任务`, 'info')}
              >
                <div className="text-lg font-bold">{x.n}</div>
                <div className="text-[9px]">{x.l}</div>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] text-slate-400">
            <Search size={12} /> 搜索任务名称
          </div>
          <div className="space-y-1">
            {tasks.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => toast(`已选中：${t.name}`, 'info')}
                className={`w-full rounded-lg px-2 py-1.5 text-left text-[11px] ${
                  t.active ? 'border border-red-200 bg-red-50/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between gap-1">
                  <span className="font-medium text-slate-800">{t.name}</span>
                  <span
                    className={`shrink-0 rounded px-1 text-[9px] ${
                      t.level === '严重' ? 'bg-red-100 text-red-600' : t.level === '告警' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                    }`}
                  >
                    {t.level}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {t.type} · {t.env} · {t.time}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-red-200 bg-red-50/50 p-3">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-[14px] font-bold text-slate-900">flink_job_l2_competition_realtime_v1 任务失败</span>
            <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] text-white">严重</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              { l: 'CPU 使用率', v: '86%', d: metricSparks.cpu, c: '#f97316' },
              { l: '内存使用率', v: '78%', d: metricSparks.mem, c: '#f59e0b' },
              { l: 'Checkpoint', v: '245.6 s', d: metricSparks.ckpt, c: '#ef4444' },
              { l: 'Watermark Lag', v: '32.4 s', d: metricSparks.lag, c: '#f97316' },
              { l: 'Backpressure', v: '89%', d: metricSparks.bp, c: '#ef4444' },
              { l: '吞吐量', v: '12.3K r/s', d: metricSparks.thr, c: '#22c55e' },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border border-slate-100 p-2">
                <div className="text-[10px] text-slate-400">{m.l}</div>
                <div className="text-[14px] font-bold">{m.v}</div>
                <SparkLine data={m.d} color={m.c} height={28} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StepShell>
  )
}

function StepRootCause({
  toast,
  onNext,
  onPrev,
}: {
  toast: (m: string, t?: 'success' | 'info') => void
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <StepShell
      icon={Search}
      title="2 · 根因分析"
      desc="基于异常检测结果，自动串起因果链。本页只展示根因链路与证据，不含修复动作。"
      footer={
        <div className="flex justify-between">
          <button type="button" className="btn-outline !text-[12px]" onClick={onPrev}>
            ← 返回异常检测
          </button>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            onClick={() => {
              toast('根因已确认：Checkpoint 超时由 Key 热点倾斜引起', 'success')
              onNext()
            }}
          >
            确认根因 → 影响评估
          </button>
        </div>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[
          { n: 1, t: 'Source CDC 波动', d: '变更率突增 320%' },
          { n: 2, t: 'Key 热点倾斜', d: 'Top Key 占比 78%' },
          { n: 3, t: 'Backpressure 升高', d: '背压比例 89%' },
          { n: 4, t: 'Checkpoint 超时', d: '耗时超阈值 3x' },
          { n: 5, t: 'Job Failover', d: '失败重启 3 次' },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-300">→</span>}
            <button
              type="button"
              className="rounded-xl border border-orange-200 bg-orange-50/50 px-3 py-2 text-left transition hover:border-orange-400"
              onClick={() => toast(`证据展开：${s.t} — ${s.d}`, 'info')}
            >
              <div className="text-[11px] font-bold text-orange-600">
                {s.n}. {s.t}
              </div>
              <div className="text-[10px] text-slate-500">{s.d}</div>
            </button>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-[12px]">
          <div className="mb-2 font-bold text-slate-800">主因判定</div>
          <p className="text-slate-600">
            上游 CDC 变更率突增导致 KeyBy 倾斜，Backpressure 推高后 Checkpoint 超时，最终 Job Failover。
          </p>
          <div className="mt-2 text-[11px] text-emerald-600">置信度 91% · 相似历史案例 7 起</div>
        </div>
        <div className="rounded-xl border border-slate-100 p-3 text-[12px]">
          <div className="mb-2 font-bold text-slate-800">证据日志（可点）</div>
          {[
            '10:42:31 JobFailoverException after 3 restarts',
            '10:41:58 Checkpoint expired after 245s',
            '10:40:12 Backpressure high on operator dwd_chain_net_inflow',
          ].map((l) => (
            <button
              key={l}
              type="button"
              className="mb-1 block w-full rounded-lg bg-slate-50 px-2 py-1.5 text-left font-mono text-[10px] text-slate-600 hover:bg-orange-50"
              onClick={() => toast(l, 'info')}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </StepShell>
  )
}

function StepImpact({
  toast,
  onNext,
  onPrev,
}: {
  toast: (m: string, t?: 'success' | 'info') => void
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <StepShell
      icon={Target}
      title="3 · 影响评估"
      desc="评估对结果表、看板、SLA 与业务的影响范围。本页不做修复。"
      footer={
        <div className="flex justify-between">
          <button type="button" className="btn-outline !text-[12px]" onClick={onPrev}>
            ← 返回根因
          </button>
          <button type="button" className="btn-primary !text-[12px]" onClick={onNext}>
            查看优化建议 →
          </button>
        </div>
      }
    >
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { l: '受影响结果表', v: '6', s: '较昨日 +2' },
          { l: '受影响看板', v: '3', s: '较昨日 +1' },
          { l: '受影响 SLA', v: '2 项', s: '告警中' },
          { l: '业务影响', v: '高', s: '用户报表延迟' },
        ].map((x) => (
          <button
            key={x.l}
            type="button"
            className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center hover:border-orange-200"
            onClick={() => toast(`${x.l}：${x.v}（${x.s}）`, 'info')}
          >
            <div className="text-[10px] text-slate-400">{x.l}</div>
            <div className="text-2xl font-bold text-slate-800">{x.v}</div>
            <div className="text-[10px] text-slate-400">{x.s}</div>
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-2 text-[12px] font-bold">血缘影响链路</div>
          <div className="space-y-1 text-[11px]">
            <div className="text-slate-400">上游</div>
            {['cdc_protocol_metrics_raw', 'ods_arbitrum_protocol_metrics'].map((n) => (
              <div key={n} className="rounded border border-slate-100 px-2 py-1 text-slate-600">
                {n}
              </div>
            ))}
            <div className="mt-1 text-slate-400">当前异常</div>
            <div className="rounded border border-red-200 bg-red-50 px-2 py-1 font-medium text-red-600">
              ⚠ dwd_chain_net_inflow_daily
            </div>
            <div className="mt-1 text-slate-400">下游</div>
            {['dws_l2_tvl_compare_30d', 'ads_l2_competition_summary', 'sr_l2_competition_dashboard'].map((n) => (
              <button
                key={n}
                type="button"
                className="block w-full rounded border border-slate-100 px-2 py-1 text-left text-slate-600 hover:border-orange-200"
                onClick={() => toast(`下游依赖：${n}`, 'info')}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 p-3">
          <div className="mb-2 text-[12px] font-bold">SLA 违约预估</div>
          <table className="w-full text-[11px]">
            <thead>
              <tr className="text-slate-400">
                <th className="py-1 text-left">指标</th>
                <th className="py-1 text-right">承诺</th>
                <th className="py-1 text-right">当前</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['端到端延迟', '15m', '38m ⚠'],
                ['可用性', '99.9%', '97.2% ⚠'],
                ['数据完整度', '99%', '94% ⚠'],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-slate-50">
                  <td className="py-1.5">{r[0]}</td>
                  <td className="py-1.5 text-right text-slate-500">{r[1]}</td>
                  <td className="py-1.5 text-right font-medium text-red-500">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StepShell>
  )
}

function StepOptimize({
  toast,
  onNext,
  onPrev,
}: {
  toast: (m: string, t?: 'success' | 'info') => void
  onNext: () => void
  onPrev: () => void
}) {
  const opts = [
    { id: 'repartition', t: 'Key 重分区 (salt)', d: '降低 Top Key 倾斜，预计吞吐 +35%', risk: '低' },
    { id: 'ckpt', t: 'Checkpoint 间隔 5m → 2m + 增量 CK', d: '缩短失败恢复时间', risk: '中' },
    { id: 'parallel', t: '并行度 8 → 16', d: '提高聚合算子吞吐', risk: '中' },
    { id: 'filter', t: '上游 CDC 变更过滤', d: '过滤噪声事件，降低源端压力', risk: '低' },
  ]
  return (
    <StepShell
      icon={Lightbulb}
      title="4 · 优化建议"
      desc="根据根因与影响范围，生成可执行的优化方案。选择方案后进入修复执行。"
      footer={
        <div className="flex justify-between">
          <button type="button" className="btn-outline !text-[12px]" onClick={onPrev}>
            ← 返回影响评估
          </button>
          <button
            type="button"
            className="btn-primary !text-[12px]"
            onClick={() => {
              toast('已采用方案：Key 重分区 + Checkpoint 调优', 'success')
              onNext()
            }}
          >
            <Wrench size={13} /> 采用方案并修复 →
          </button>
        </div>
      }
    >
      <div className="space-y-2">
        {opts.map((o, i) => (
          <button
            key={o.id}
            type="button"
            className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-violet-300 hover:bg-violet-50/40"
            onClick={() => toast(`已选择方案：${o.t}`, 'info')}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[12px] font-bold text-violet-700">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold text-slate-800">{o.t}</div>
              <div className="text-[11.5px] text-slate-500">{o.d}</div>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">风险 {o.risk}</span>
          </button>
        ))}
      </div>
    </StepShell>
  )
}

function StepRepair({
  toast,
  repairing,
  setRepairing,
  onNext,
  onPrev,
}: {
  toast: (m: string, t?: 'success' | 'info') => void
  repairing: boolean
  setRepairing: (v: boolean) => void
  onNext: () => void
  onPrev: () => void
}) {
  const run = async () => {
    setRepairing(true)
    toast('正在执行修复流水线…', 'info')
    await new Promise((r) => setTimeout(r, 1400))
    setRepairing(false)
    toast('修复完成：任务已恢复健康', 'success')
    onNext()
  }
  return (
    <StepShell
      icon={Shield}
      title="5 · 修复执行"
      desc="执行所选优化方案：重启任务 / 调参 / 回滚。执行完成后进入复盘。"
      footer={
        <div className="flex flex-wrap justify-between gap-2">
          <button type="button" className="btn-outline !text-[12px]" onClick={onPrev} disabled={repairing}>
            ← 返回优化建议
          </button>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="btn-outline !text-[12px]"
              onClick={() => toast('已回滚到 v1.17 稳定版本', 'success')}
            >
              <RotateCcw size={13} /> 回滚稳定版
            </button>
            <button type="button" className="btn-outline !text-[12px]" onClick={() => toast('工单 #OPS-2048 已创建', 'success')}>
              <FileText size={13} /> 创建工单
            </button>
            <button type="button" className="btn-primary !text-[12px]" disabled={repairing} onClick={run}>
              <Shield size={13} /> {repairing ? '修复中…' : '一键执行修复'}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-2">
        {[
          '应用 Key 重分区配置',
          '更新 Checkpoint / Watermark',
          '滚动重启 Flink Job',
          '校验吞吐量与 Backpressure',
          '恢复下游看板刷新',
        ].map((s, i) => (
          <div
            key={s}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] ${
              repairing && i <= 2 ? 'border-orange-200 bg-orange-50' : 'border-slate-100'
            }`}
          >
            {repairing && i <= 2 ? (
              <RefreshCw size={14} className="animate-spin text-orange-500" />
            ) : (
              <CheckCircle2 size={14} className="text-slate-300" />
            )}
            {s}
          </div>
        ))}
      </div>
    </StepShell>
  )
}

function StepRetro({
  toast,
  onRestart,
}: {
  toast: (m: string, t?: 'success' | 'info') => void
  onRestart: () => void
}) {
  return (
    <StepShell
      icon={ClipboardCheck}
      title="6 · 复盘沉淀"
      desc="沉淀根因、动作与预防措施，写入知识库供 RAG 检索。"
      footer={
        <div className="flex flex-wrap justify-between gap-2">
          <Link to="/data-agent/deploy" className="btn-outline !text-[12px]">
            返回发布页
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              className="btn-outline !text-[12px]"
              onClick={() => toast('复盘文档已写入 RAG 知识库', 'success')}
            >
              写入知识库
            </button>
            <button type="button" className="btn-primary !text-[12px]" onClick={onRestart}>
              开始新一轮巡检
            </button>
          </div>
        </div>
      }
    >
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { t: '事件摘要', d: 'flink_job_l2_competition_realtime_v1 因 Key 倾斜导致 Checkpoint 超时与 Failover，影响 6 张结果表。' },
          { t: '处置动作', d: 'Key 重分区 + Checkpoint 调优 + 滚动重启，耗时约 4 分钟恢复。' },
          { t: '预防措施', d: '对 Top Key 增加 salt 监控告警；CDC 变更率阈值；并行度弹性策略。' },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="mb-1 text-[12px] font-bold text-slate-800">{c.t}</div>
            <p className="text-[11.5px] leading-relaxed text-slate-600">{c.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-[12px] text-emerald-800">
        <CheckCircle2 size={14} className="mr-1 inline" />
        任务状态：正常 · 健康度 100% · SLA 已恢复
      </div>
    </StepShell>
  )
}
