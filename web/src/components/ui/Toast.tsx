import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react'
import { useApp, type ToastType } from '../../context/AppContext'

const iconMap: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
}

const colorMap: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-red-200 bg-red-50 text-red-800',
}

export function ToastHost() {
  const { toasts, dismissToast } = useApp()
  if (!toasts.length) return null

  return (
    <div className="fixed right-4 top-16 z-[200] flex w-[320px] max-w-[92vw] flex-col gap-2">
      {toasts.map((t) => {
        const Icon = iconMap[t.type]
        return (
          <div
            key={t.id}
            className={`toast-enter flex items-start gap-2 rounded-xl border px-3 py-2.5 shadow-lg backdrop-blur ${colorMap[t.type]}`}
          >
            <Icon size={16} className="mt-0.5 shrink-0" />
            <p className="flex-1 text-[12.5px] font-medium leading-snug">{t.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              className="shrink-0 opacity-50 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
