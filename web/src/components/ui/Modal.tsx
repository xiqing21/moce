import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function ModalHost() {
  const { modal, closeModal } = useApp()
  if (!modal?.open) return null

  return (
    <div className="fixed inset-0 z-[190] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        aria-label="关闭"
        onClick={closeModal}
      />
      <div
        className={`modal-enter relative max-h-[90vh] w-full overflow-auto rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[85vh] sm:rounded-2xl ${
          modal.wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:px-5">
          <h3 className="min-w-0 flex-1 truncate pr-2 text-[15px] font-bold text-slate-900">{modal.title}</h3>
          <button
            type="button"
            onClick={closeModal}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 sm:h-8 sm:w-8"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-4 sm:p-5">{modal.body}</div>
      </div>
    </div>
  )
}
