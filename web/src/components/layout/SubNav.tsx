import { Link, useLocation } from 'react-router-dom'

/** Floating page switcher — full mock journey coverage */
const PAGES = [
  { path: '/', label: '01 产品矩阵' },
  { path: '/insight', label: '02 Insight' },
  { path: '/insight/feasibility', label: '03 可行性' },
  { path: '/insight/query', label: '04 查询' },
  { path: '/insight/charts', label: '05 图表' },
  { path: '/insight/report', label: '06 报告' },
  { path: '/data-request', label: '07 需求卡' },
  { path: '/data-agent/intake', label: '08 接收' },
  { path: '/data-agent/planning', label: '09 规划' },
  { path: '/data-agent/lineage', label: '10 Job' },
  { path: '/data-agent/warehouse', label: '11 分层' },
  { path: '/data-agent/deploy', label: '12 发布' },
  { path: '/data-agent/aiops', label: '13 AIOps' },
  { path: '/alpha', label: '14 预测' },
  { path: '/alpha/strategy', label: '15 策略' },
  { path: '/pricing', label: '16 定价' },
  { path: '/compare', label: '17 对比' },
]

export function SubNav() {
  const { pathname } = useLocation()

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 sm:bottom-3 sm:left-1/2 sm:right-auto sm:max-w-[98vw] sm:-translate-x-1/2 sm:px-0 sm:pb-0 sm:pt-0"
    >
      <div className="mx-auto flex max-w-[1100px] items-center gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200/80 bg-white/95 px-1.5 py-1.5 shadow-lg backdrop-blur sm:rounded-full sm:px-2 [-webkit-overflow-scrolling:touch]">
        {PAGES.map((p) => {
          const on = pathname === p.path
          return (
            <Link
              key={p.path}
              to={p.path}
              className={`shrink-0 rounded-full px-2 py-1.5 text-[10px] font-medium transition active:scale-95 sm:py-1 ${
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
