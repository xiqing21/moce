import { Outlet } from 'react-router-dom'
import { Background } from './Background'
import { Header } from './Header'
import { ToastHost } from '../ui/Toast'
import { ModalHost } from '../ui/Modal'
import { useApp } from '../../context/AppContext'

export function Layout() {
  const { dark } = useApp()

  return (
    <div className={`relative min-h-screen ${dark ? 'dark-mode' : ''}`}>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col pb-16">
        <Header />
        <main className="flex-1 overflow-x-auto px-4 pb-8 pt-2 sm:px-6">
          <Outlet />
        </main>
      </div>
      <ToastHost />
      <ModalHost />
    </div>
  )
}
