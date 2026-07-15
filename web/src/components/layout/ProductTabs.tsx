import { Link, useLocation } from 'react-router-dom'
import { AlphaIcon, DataAgentIcon, InsightIcon } from '../ui/MoceLogo'

const TABS = [
  {
    key: 'insight',
    label: 'MOCE Insight',
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
    icon: DataAgentIcon,
    match: (p: string) => p.startsWith('/data-agent'),
    to: '/data-agent',
  },
  {
    key: 'alpha',
    label: 'MOCE Alpha',
    icon: AlphaIcon,
    match: (p: string) => p.startsWith('/alpha'),
    to: '/alpha',
  },
]

export function ProductTabs({ active }: { active?: 'insight' | 'agent' | 'alpha' | 'none' }) {
  const { pathname } = useLocation()

  return (
    <div className="mx-auto flex w-fit items-center gap-0.5 rounded-full border border-slate-200/80 bg-white/90 p-1 shadow-sm backdrop-blur">
      {TABS.map((tab) => {
        const Icon = tab.icon
        const forcedOff = active === 'none'
        const on = forcedOff ? false : active ? active === tab.key : tab.match(pathname)

        return (
          <Link
            key={tab.key}
            to={tab.to}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-all ${
              on
                ? 'bg-orange-50 text-slate-800 shadow-sm ring-1 ring-orange-100'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-4 h-4 !rounded-md" />
            <span className={on ? 'text-slate-800' : ''}>{tab.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
