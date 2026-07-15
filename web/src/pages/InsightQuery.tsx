import { Link } from 'react-router-dom'
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
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

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
        {/* Left sidebar */}
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
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                Arbitrum <span className="text-emerald-500">已匹配</span>
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                Optimism <span className="text-emerald-500">已匹配</span>
              </span>
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-slate-700">
              <span className="flex items-center gap-1">
                <span className="text-slate-400">&lt;/&gt;</span> 自动生成 SQL
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            <pre className="code-block text-[10px] leading-relaxed">{`SELECT
  date,
  SUM(tvl_usd) AS tvl_usd,
  SUM(net_inflow_usd) AS net_inflow_usd
FROM defi.daily_metrics
WHERE chain IN ('Arbitrum','Optimism')
  AND date >= CURRENT_DATE - INTERVAL 6 DAY
GROUP BY date, chain
ORDER BY date ASC, chain;`}</pre>
          </div>

          {[
            { title: 'SQL 校验状态', value: '通过', ok: true },
            { title: 'Explain 成本评估', value: '低成本（估算扫描 ~ 38.6 MB）', ok: true },
          ].map((item) => (
            <div key={item.title} className="card-soft flex items-center justify-between p-3 text-[12px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <CheckCircle2 size={13} className="text-emerald-500" />
                {item.title}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          ))}

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

        {/* Main */}
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

          {/* KPI cards */}
          <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'Arbitrum TVL', value: '$2.47B', sub: '最新（2025-05-18）', icon: <Database size={16} className="text-blue-500" />, tone: '' },
              { label: 'Optimism TVL', value: '$0.91B', sub: '最新（2025-05-18）', icon: <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">OP</span>, tone: '' },
              { label: 'Arbitrum 净流入', value: '+$12.6M', sub: '最新（2025-05-18）', icon: <span className="text-emerald-500">↗</span>, tone: 'text-emerald-600' },
              { label: 'Optimism 净流入', value: '-$3.2M', sub: '最新（2025-05-18）', icon: <span className="text-red-500">↘</span>, tone: 'text-red-500' },
            ].map((k) => (
              <div key={k.label} className="card p-3">
                <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  {k.icon}
                  {k.label}
                </div>
                <div className={`text-xl font-bold ${k.tone || 'text-slate-900'}`}>{k.value}</div>
                <div className="text-[10px] text-slate-400">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Table */}
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
                  <tr key={r.date}>
                    <td>{r.date}</td>
                    <td>{r.arbTvl}</td>
                    <td>{r.opTvl}</td>
                    <td className="text-emerald-600 font-medium">{r.arbFlow}</td>
                    <td className="text-red-500 font-medium">{r.opFlow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Chart */}
          <div className="card p-4">
            <div className="mb-2 flex items-center justify-between text-[13px] font-semibold text-slate-800">
              TVL 与净流入趋势（最近 7 天）
              <button className="text-slate-400">⛶</button>
            </div>
            <MultiMetricChart data={multiMetricTrend} height={220} />
          </div>
        </div>
      </div>
    </div>
  )
}
