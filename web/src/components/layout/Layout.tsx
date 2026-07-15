import { Outlet } from 'react-router-dom'
import { Background } from './Background'
import { Header } from './Header'

export function Layout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-6 pb-8 pt-2">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
