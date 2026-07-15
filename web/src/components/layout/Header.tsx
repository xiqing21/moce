import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { MoceLogo } from '../ui/MoceLogo'

const NAV = [
  { label: '产品矩阵', path: '/' },
  { label: '解决方案', path: '/insight' },
  { label: '定价', path: '/pricing' },
  { label: '文档', path: '#' },
]

export function Header() {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    if (path === '/pricing') return pathname.startsWith('/pricing') || pathname.startsWith('/compare')
    if (path === '/insight') return pathname !== '/' && !pathname.startsWith('/pricing') && !pathname.startsWith('/compare')
    return false
  }

  return (
    <header className="relative z-50 flex h-14 items-center justify-between px-8">
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <MoceLogo />
        <div className="leading-tight">
          <div className="text-[18px] font-extrabold tracking-tight">
            <span className="text-moce-ink">MOCE</span>
          </div>
          <div className="text-[10px] text-slate-400 -mt-0.5">Ask. Analyze. Discover.</div>
        </div>
      </Link>

      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-7">
        {NAV.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`text-[13.5px] font-medium transition-colors relative py-1 ${
              isActive(item.path)
                ? 'text-moce-orange'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
            {isActive(item.path) && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-moce-orange" />
            )}
          </Link>
        ))}
        <button className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900">
          登录
        </button>
        <button className="btn-primary text-[13px] !px-4 !py-2 !rounded-lg">
          开始使用
        </button>
      </nav>

      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-1 shadow-sm">
        <button className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-50 text-moce-orange">
          <Sun size={13} />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:text-slate-600">
          <Moon size={13} />
        </button>
      </div>
    </header>
  )
}
