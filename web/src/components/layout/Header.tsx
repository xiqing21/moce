import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { MoceLogo } from '../ui/MoceLogo'
import { useApp } from '../../context/AppContext'

const NAV = [
  { label: '产品矩阵', path: '/' },
  { label: '解决方案', path: '/insight' },
  { label: '定价', path: '/pricing' },
  { label: '文档', path: '/docs' },
]

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { dark, toggleDark, toast } = useApp()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    if (path === '/pricing') return pathname.startsWith('/pricing') || pathname.startsWith('/compare')
    if (path === '/docs') return pathname.startsWith('/docs')
    if (path === '/insight')
      return (
        pathname !== '/' &&
        !pathname.startsWith('/pricing') &&
        !pathname.startsWith('/compare') &&
        !pathname.startsWith('/docs')
      )
    return false
  }

  return (
    <header className="relative z-50 flex h-14 items-center justify-between px-8">
      <Link to="/" className="flex shrink-0 items-center gap-2.5">
        <MoceLogo />
        <div className="leading-tight">
          <div className="text-[18px] font-extrabold tracking-tight text-moce-ink">MOCE</div>
          <div className="-mt-0.5 text-[10px] text-slate-400">Ask. Analyze. Discover.</div>
        </div>
      </Link>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-7">
        {NAV.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`relative py-1 text-[13.5px] font-medium transition-colors ${
              isActive(item.path) ? 'text-moce-orange' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
            {isActive(item.path) && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-moce-orange" />
            )}
          </Link>
        ))}
        <button
          type="button"
          className="text-[13.5px] font-medium text-slate-600 hover:text-slate-900"
          onClick={() => toast('已打开登录面板（Mock）— 演示账号 demo@moce.ai', 'info')}
        >
          登录
        </button>
        <button
          type="button"
          className="btn-primary !rounded-lg !px-4 !py-2 text-[13px]"
          onClick={() => {
            toast('欢迎使用 MOCE，正在进入 Insight 工作台', 'success')
            navigate('/insight')
          }}
        >
          开始使用
        </button>
      </nav>

      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-1 shadow-sm">
        <button
          type="button"
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            !dark ? 'bg-orange-50 text-moce-orange' : 'text-slate-400 hover:text-slate-600'
          }`}
          onClick={() => {
            if (dark) toggleDark()
            toast('已切换到浅色模式', 'info')
          }}
          aria-label="浅色"
        >
          <Sun size={13} />
        </button>
        <button
          type="button"
          className={`flex h-6 w-6 items-center justify-center rounded-full ${
            dark ? 'bg-slate-800 text-amber-300' : 'text-slate-400 hover:text-slate-600'
          }`}
          onClick={() => {
            if (!dark) toggleDark()
            toast('已切换到深色模式（演示）', 'info')
          }}
          aria-label="深色"
        >
          <Moon size={13} />
        </button>
      </div>
    </header>
  )
}
