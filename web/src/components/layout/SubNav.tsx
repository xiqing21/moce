import { Link, useLocation } from 'react-router-dom'

/** Floating page switcher so every prototype screen is reachable 1:1 */
const PAGES = [
  { path: '/', label: '01 产品矩阵' },
  { path: '/insight', label: '02 Insight 入口' },
  { path: '/insight/feasibility', label: '03 可行性判断' },
  { path: '/insight/query', label: '04 查询结果' },
  { path: '/insight/charts', label: '05 NL to Chart' },
  { path: '/insight/report', label: '06 智能报告' },
  { path: '/data-request', label: '07 数据需求卡' },
  { path: '/data-agent', label: '08 NL to Job' },
  { path: '/data-agent/aiops', label: '09 AIOps' },
  { path: '/alpha', label: '10 Prediction' },
  { path: '/alpha/strategy', label: '11 Strategy Lab' },
  { path: '/pricing', label: '12 定价' },
  { path: '/compare', label: '13 方案对比' },
]

export function SubNav() {
  const { pathname } = useLocation()

  return (
    <div className="fixed bottom-3 left-1/2 z-[100] max-w-[95vw] -translate-x-1/2">
      <div className="flex max-w-[960px] items-center gap-1 overflow-x-auto rounded-full border border-slate-200/80 bg-white/95 px-2 py-1.5 shadow-lg backdrop-blur">
        {PAGES.map((p) => {
          const on = pathname === p.path
          return (
            <Link
              key={p.path}
              to={p.path}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-medium transition ${
                on
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {p.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
