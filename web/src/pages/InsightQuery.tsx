import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Database,
  FileText,
  MessageSquare,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'
import { MultiMetricChart } from '../components/charts/MiniCharts'
import { dailyResults, multiMetricTrend } from '../data/mock'
import { useApp } from '../context/AppContext'

export function InsightQuery() {
  const { query, toast } = useApp()
  const [sqlOpen, setSqlOpen] = useState(true)
  const [validateOpen, setValidateOpen] = useState(false)
  const [explainOpen, setExplainOpen] = useState(false)

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
              <MessageSquare size={13} className="text-orange-500" />
              分析请求
            </div>
            <p className="text-[12px] leading-relaxed text-slate-600">
              {query || '比较 Arbitrum 和 Optimism 过去 7 天的 TVL 及净流入趋势。'}
            </p>
            <div className="mt-2 text-[10px] text-slate-400">今天 10:24</div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600">
              <CheckCircle2 size={13} /> 资产匹配结果
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700 hover:ring-1 hover:ring-emerald-200"
                onClick={() => toast('Arbitrum 资产已匹配 ads_chain_tvl_daily', 'info')}
              >
                Arbitrum <span className="text-emerald-500">已匹配</span>
              </button>
              <button
                type="button"
                className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700 hover:ring-1 hover:ring-emerald-200"
                onClick={() => toast('Optimism 资产已匹配 ads_chain_net_inflow_daily', 'info')}
              >
                Optimism <span className="text-emerald-500">已匹配</span>
              </button>
            </div>
          </div>

          {/* SQL expandable */}
          <div className="card-soft overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between p-3 text-[12px] font-semibold text-slate-700"
              onClick={() => setSqlOpen((v) => !v)}
            >
              <span className="flex items-center gap-1">
                <span className="text-slate-400">&lt;/&gt;</span> 自动生成 SQL
              </span>
              {sqlOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </button>
            {sqlOpen && (
              <div className="border-t border-slate-100 px-3 pb-3">
                <pre className="code-block text-[10px] leading-relaxed">{`SELECT
  date,
  SUM(tvl_usd) AS tvl_usd,
  SUM(net_inflow_usd) AS net_inflow_usd
FROM defi.daily_metrics
WHERE chain IN ('Arbitrum','Optimism')
  AND date >= CURRENT_DATE - INTERVAL 6 DAY
GROUP BY date, chain
ORDER BY date ASC, chain;`}</pre>
                <button
                  type="button"
                  className="btn-outline mt-2 w-full !py-1 !text-[11px]"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        "SELECT date, SUM(tvl_usd) FROM defi.daily_metrics WHERE chain IN ('Arbitrum','Optimism') GROUP BY date",
                      )
                    } catch {
                      /* ignore */
                    }
                    toast('SQL 已复制', 'success')
                  }}
                >
                  复制 SQL
                </button>
              </div>
            )}
          </div>

          {/* SQL 校验 — expandable */}
          <div className="card-soft overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between p-3 text-[12px]"
              onClick={() => setValidateOpen((v) => !v)}
            >
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-500" />
                SQL 校验状态
                <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] text-emerald-600">通过</span>
              </span>
              {validateOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </button>
            {validateOpen && (
              <div className="space-y-2 border-t border-slate-100 px-3 pb-3 text-[11.5px]">
                {[
                  { k: '语法检查', v: '通过', ok: true },
                  { k: '表权限', v: 'defi.daily_metrics · SELECT OK', ok: true },
                  { k: '分区裁剪', v: '命中 date 分区 · 7 天', ok: true },
                  { k: '注入防护', v: '参数化绑定 · 安全', ok: true },
                  { k: '危险操作', v: '未检测到 DROP/DELETE', ok: true },
                ].map((r) => (
                  <div key={r.k} className="flex items-start justify-between gap-2 border-b border-slate-50 py-1.5 last:border-0">
                    <span className="text-slate-500">{r.k}</span>
                    <span className="text-right font-medium text-emerald-600">{r.v}</span>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn-outline w-full !py-1 !text-[11px]"
                  onClick={() => toast('已重新运行 SQL 校验', 'success')}
                >
                  重新校验
                </button>
              </div>
            )}
          </div>

          {/* Explain — expandable */}
          <div className="card-soft overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between p-3 text-[12px]"
              onClick={() => setExplainOpen((v) => !v)}
            >
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 size={13} className="text-emerald-500" />
                Explain 成本评估
              </span>
              {explainOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </button>
            {explainOpen && (
              <div className="space-y-2 border-t border-slate-100 px-3 pb-3 text-[11.5px]">
                <div className="rounded-lg bg-emerald-50 px-2 py-1.5 text-emerald-700">
                  低成本 · 估算扫描 ~ 38.6 MB
                </div>
                {[
                  { k: '预估行数', v: '1.2M rows' },
                  { k: '预估 CPU', v: '0.8 vCore·s' },
                  { k: '预估内存', v: '256 MB' },
                  { k: 'Join 策略', v: 'Broadcast Hash Join' },
                  { k: '聚合', v: 'Streaming Aggregate' },
                  { k: '并行度', v: '16' },
                ].map((r) => (
                  <div key={r.k} className="flex justify-between border-b border-slate-50 py-1">
                    <span className="text-slate-500">{r.k}</span>
                    <span className="font-medium text-slate-700">{r.v}</span>
                  </div>
                ))}
                <pre className="max-h-28 overflow-auto rounded-lg bg-slate-900 p-2 font-mono text-[9px] text-slate-300">
{`OLAP SCAN defi.daily_metrics
  partitions: p20250512..p20250518
  predicates: chain IN (...)
HASH AGGREGATE
  group by: date, chain
  functions: sum(tvl_usd), sum(net_inflow_usd)
EXCHANGE GATHER`}
                </pre>
                <button
                  type="button"
                  className="btn-outline w-full !py-1 !text-[11px]"
                  onClick={() => toast('已刷新 Explain 计划', 'info')}
                >
                  刷新 Explain
                </button>
              </div>
            )}
          </div>

          <div className="card-soft space-y-2 p-3 text-[12px]">
            <div className="flex justify-between">
              <span className="text-slate-500">执行状态</span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-600">已完成</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">数据源</span>
              <span className="font-medium text-slate-700">StarRocks</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">查询耗时</span>
              <span className="font-medium text-slate-700">2.34s</span>
            </div>
          </div>
        </aside>

        <div>
          <StepBar
            className="mb-4 justify-start"
            steps={[
              { id: 1, label: '提问', status: 'done' },
              { id: 2, label: '理解问题', status: 'done' },
              { id: 3, label: '执行查询', status: 'active' },
              { id: 4, label: '生成图表', status: 'pending' },
              { id: 5, label: '输出报告', status: 'pending' },
            ]}
          />

          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-[22px] font-extrabold text-slate-900">查询执行与结果</h1>
              <p className="mt-0.5 text-[12px] text-slate-500">
                系统已自动生成 SQL 并执行查询，你可以继续生成图表、报告或一键输出图文分析。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/insight/charts"
                className="btn-outline !text-[12px]"
                onClick={() => toast('进入 NL to Chart', 'info')}
              >
                <BarChart3 size={13} /> 生成图表
              </Link>
              <Link
                to="/insight/report"
                className="btn-outline !text-[12px]"
                onClick={() => toast('生成智能报告', 'info')}
              >
                <FileText size={13} /> 生成报告
              </Link>
              <Link
                to="/insight/report"
                className="btn-primary !text-[12px]"
                onClick={() => toast('一键生成图文报告…', 'success')}
              >
                <FileText size={13} /> 一键生成图文报告
              </Link>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Arbitrum TVL', value: '$2.47B', sub: '最新（2025-05-18）', icon: <Database size={16} className="text-blue-500" />, tone: '' },
              { label: 'Optimism TVL', value: '$0.91B', sub: '最新（2025-05-18）', icon: <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">OP</span>, tone: '' },
              { label: 'Arbitrum 净流入', value: '+$12.6M', sub: '最新（2025-05-18）', icon: <span className="text-emerald-500">↗</span>, tone: 'text-emerald-600' },
              { label: 'Optimism 净流入', value: '-$3.2M', sub: '最新（2025-05-18）', icon: <span className="text-red-500">↘</span>, tone: 'text-red-500' },
            ].map((k) => (
              <button
                key={k.label}
                type="button"
                className="card p-3 text-left transition hover:border-orange-200"
                onClick={() => toast(`${k.label}：${k.value}`, 'info')}
              >
                <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  {k.icon}
                  {k.label}
                </div>
                <div className={`text-xl font-bold ${k.tone || 'text-slate-900'}`}>{k.value}</div>
                <div className="text-[10px] text-slate-400">{k.sub}</div>
              </button>
            ))}
          </div>

          <div className="card mb-4 overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5 text-[13px] font-semibold text-slate-800">
              每日结果（最近 7 天）
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>Arbitrum TVL (USD)</th>
                  <th>Optimism TVL (USD)</th>
                  <th>Arbitrum 净流入 (USD)</th>
                  <th>Optimism 净流入 (USD)</th>
                </tr>
              </thead>
              <tbody>
                {dailyResults.map((r) => (
                  <tr
                    key={r.date}
                    className="cursor-pointer hover:bg-orange-50/40"
                    onClick={() => toast(`查看 ${r.date} 明细`, 'info')}
                  >
                    <td>{r.date}</td>
                    <td>{r.arbTvl}</td>
                    <td>{r.opTvl}</td>
                    <td className="font-medium text-emerald-600">{r.arbFlow}</td>
                    <td className="font-medium text-red-500">{r.opFlow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-4">
            <div className="mb-2 flex items-center justify-between text-[13px] font-semibold text-slate-800">
              TVL 与净流入趋势（最近 7 天）
              <button
                type="button"
                className="text-slate-400 hover:text-orange-500"
                onClick={() => toast('已全屏图表（Mock）', 'info')}
              >
                ⛶
              </button>
            </div>
            <MultiMetricChart data={multiMetricTrend} height={220} />
          </div>
        </div>
      </div>
    </div>
  )
}
