import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  to?: string
  onClick?: () => void
  style?: CSSProperties
}

/** Soft floating card with idle bob animation — used for side “cool” widgets */
export function FloatCard({
  children,
  delay = 0,
  duration = 5.5,
  className = '',
  to,
  onClick,
  style,
}: Props) {
  const animStyle: CSSProperties = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    ...style,
  }

  const cls = `float-card card-soft pointer-events-auto transition-shadow hover:shadow-lg hover:shadow-orange-100/60 ${className}`

  if (to) {
    return (
      <Link to={to} className={`block ${cls}`} style={animStyle}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`w-full text-left ${cls}`} style={animStyle}>
        {children}
      </button>
    )
  }

  return (
    <div className={cls} style={animStyle}>
      {children}
    </div>
  )
}

export function FloatBadge({
  children,
  delay = 0,
  className = '',
  onClick,
  to,
}: {
  children: ReactNode
  delay?: number
  className?: string
  onClick?: () => void
  to?: string
}) {
  const cls = `float-card pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 px-2.5 py-1 text-[11px] text-slate-600 shadow-sm backdrop-blur hover:border-orange-200 hover:text-orange-600 ${className}`
  const style = { animationDelay: `${delay}s`, animationDuration: '6s' } as CSSProperties

  if (to) {
    return (
      <Link to={to} className={cls} style={style}>
        {children}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} style={style}>
        {children}
      </button>
    )
  }
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  )
}

/** Orbiting chain / particle dots around a hero */
export function OrbitDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-dot orbit-dot-1" />
      <div className="orbit-dot orbit-dot-2" />
      <div className="orbit-dot orbit-dot-3" />
      <div className="orbit-dot orbit-dot-4" />
    </div>
  )
}
