import { Outlet } from 'react-router-dom'
import { Background } from './Background'
import { Header } from './Header'
import { ToastHost } from '../ui/Toast'
import { ModalHost } from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export function Layout() {
  const { dark } = useApp()

  return (
    <div className={`app-shell relative min-h-screen overflow-x-hidden ${dark ? 'is-dark' : 'is-light'}`}>
      <Background />
      <div className="relative z-10 flex min-h-screen min-w-0 flex-col pb-20 sm:pb-16">
        <Header />
        <main className="min-w-0 flex-1 overflow-x-auto px-3 pb-8 pt-2 sm:px-6">
          <Outlet />
        </main>
      </div>
      <ToastHost />
      <ModalHost />
    </div>
  )
}
