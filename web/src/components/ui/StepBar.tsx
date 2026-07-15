import { Fragment } from 'react'

export type Step = {
  id: number
  label: string
  status?: 'done' | 'active' | 'pending'
}

export function StepBar({ steps, className = '' }: { steps: Step[]; className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 ${className}`}
    >
      {steps.map((step, i) => {
        const status = step.status ?? (i === 0 ? 'active' : 'pending')
        return (
          <Fragment key={step.id}>
            {i > 0 && (
              <span
                className={`mx-0.5 h-px w-4 shrink-0 sm:w-8 ${
                  status === 'pending' ? 'bg-slate-200' : 'bg-orange-300'
                }`}
              />
            )}
            <div
              className={`flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10.5px] font-medium sm:gap-1.5 sm:px-2.5 sm:text-[11.5px] ${
                status === 'active'
                  ? 'border-orange-500 bg-orange-500 text-white'
                  : status === 'done'
                    ? 'border-orange-200 bg-white text-orange-500'
                    : 'border-slate-200 bg-white text-slate-400'
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                  status === 'active'
                    ? 'bg-white/20 text-white'
                    : status === 'done'
                      ? 'bg-orange-50 text-orange-500'
                      : 'bg-slate-50 text-slate-400'
                }`}
              >
                {status === 'done' ? '✓' : step.id}
              </span>
              <span className="max-w-[4.5rem] truncate sm:max-w-none">{step.label}</span>
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
