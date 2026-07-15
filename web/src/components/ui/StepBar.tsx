import { Fragment } from 'react'

export type Step = {
  id: number
  label: string
  status?: 'done' | 'active' | 'pending'
}

export function StepBar({ steps, className = '' }: { steps: Step[]; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 flex-wrap ${className}`}>
      {steps.map((step, i) => {
        const status = step.status ?? (i === 0 ? 'active' : 'pending')
        return (
          <Fragment key={step.id}>
            {i > 0 && (
              <span
                className={`mx-0.5 h-px w-6 sm:w-8 ${
                  status === 'pending' ? 'bg-slate-200' : 'bg-orange-300'
                }`}
              />
            )}
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium border ${
                status === 'active'
                  ? 'bg-orange-500 text-white border-orange-500'
                  : status === 'done'
                    ? 'bg-white text-orange-500 border-orange-200'
                    : 'bg-white text-slate-400 border-slate-200'
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
              {step.label}
            </div>
          </Fragment>
        )
      })}
    </div>
  )
}
