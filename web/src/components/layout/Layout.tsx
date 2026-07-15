import { Outlet } from 'react-router-dom'
import { Background } from './Background'
import { Header } from './Header'
import { ToastHost } from '../ui/Toast'
import { ModalHost } from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export function Layout() {
  const { dark } = useApp()

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${dark ? 'dark-mode' : ''}`}>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col pb-16">
        <Header />
        <main className="flex-1 px-6 pb-8 pt-2">
          <Outlet />
        </main>
      </div>
      <ToastHost />
      <ModalHost />
    </div>
  )
}
