import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

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
    <header className="relative z-50 border-b border-transparent">
      <div className="flex h-14 items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5">
          <MoceLogo />
          <div className="leading-tight">
            <div className="text-[16px] font-extrabold tracking-tight text-moce-ink sm:text-[18px]">MOCE</div>
            <div className="-mt-0.5 hidden text-[10px] text-slate-400 xs:block sm:block">Ask. Analyze. Discover.</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7">
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

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="theme-toggle flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-1 shadow-sm">
            <button
              type="button"
              className={`flex h-7 w-7 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
                !dark ? 'bg-orange-50 text-moce-orange' : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => {
                if (dark) {
                  toggleDark()
                  toast('已切换到浅色模式', 'info')
                }
              }}
              aria-label="浅色"
            >
              <Sun size={13} />
            </button>
            <button
              type="button"
              className={`flex h-7 w-7 items-center justify-center rounded-full sm:h-6 sm:w-6 ${
                dark ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-slate-600'
              }`}
              onClick={() => {
                if (!dark) {
                  toggleDark()
                  toast('已切换到深色模式', 'info')
                }
              }}
              aria-label="深色"
            >
              <Moon size={13} />
            </button>
          </div>

          <button
            type="button"
            className="btn-primary hidden !rounded-lg !px-3 !py-1.5 text-[12px] md:inline-flex lg:hidden"
            onClick={() => {
              toast('欢迎使用 MOCE，正在进入 Insight 工作台', 'success')
              navigate('/insight')
            }}
          >
            开始使用
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-[2px] lg:hidden"
            aria-label="关闭菜单遮罩"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-[70] border-b border-slate-200 bg-white/98 px-3 pb-4 pt-2 shadow-xl backdrop-blur lg:hidden dark:border-slate-700">
            <nav className="flex flex-col gap-0.5">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`rounded-xl px-3 py-3 text-[14px] font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-50 text-moce-orange'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                className="rounded-xl px-3 py-3 text-left text-[14px] font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setMenuOpen(false)
                  toast('已打开登录面板（Mock）— 演示账号 demo@moce.ai', 'info')
                }}
              >
                登录
              </button>
              <button
                type="button"
                className="btn-primary mt-2 w-full !rounded-xl !py-3 text-[14px]"
                onClick={() => {
                  setMenuOpen(false)
                  toast('欢迎使用 MOCE，正在进入 Insight 工作台', 'success')
                  navigate('/insight')
                }}
              >
                开始使用
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
