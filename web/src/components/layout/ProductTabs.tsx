import { Link, useLocation } from 'react-router-dom'
import { AlphaIcon, DataAgentIcon, InsightIcon } from '../ui/MoceLogo'

const TABS = [
  {
    key: 'insight',
    label: 'MOCE Insight',
    short: 'Insight',
    icon: InsightIcon,
    match: (p: string) =>
      p === '/insight' ||
      p.startsWith('/insight/') ||
      p === '/data-request' ||
      p === '/',
    to: '/insight',
  },
  {
    key: 'agent',
    label: 'MOCE Data Agent',
    short: 'Data Agent',
    icon: DataAgentIcon,
    match: (p: string) => p.startsWith('/data-agent') || p === '/data-request',
    to: '/data-agent/intake',
  },
  {
    key: 'alpha',
    label: 'MOCE Alpha',
    short: 'Alpha',
    icon: AlphaIcon,
    match: (p: string) => p.startsWith('/alpha'),
    to: '/alpha',
  },
]

export function ProductTabs({ active }: { active?: 'insight' | 'agent' | 'alpha' | 'none' }) {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto w-full max-w-full overflow-x-auto px-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mx-auto flex w-max min-w-0 items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/90 p-1 shadow-sm backdrop-blur">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const forcedOff = active === 'none'
          const on = forcedOff ? false : active ? active === tab.key : tab.match(pathname)

          return (
            <Link
              key={tab.key}
              to={tab.to}
              className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[11.5px] font-medium transition-all sm:gap-1.5 sm:px-3.5 sm:text-[12.5px] ${
                on
                  ? 'bg-orange-50 text-slate-800 shadow-sm ring-1 ring-orange-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5 !rounded-md sm:h-4 sm:w-4" />
              <span className={`sm:hidden ${on ? 'text-slate-800' : ''}`}>{tab.short}</span>
              <span className={`hidden sm:inline ${on ? 'text-slate-800' : ''}`}>{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
