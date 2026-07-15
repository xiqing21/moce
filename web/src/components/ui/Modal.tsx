import { X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function ModalHost() {
  const { modal, closeModal } = useApp()
  if (!modal?.open) return null

  return (
    <div className="fixed inset-0 z-[190] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        aria-label="关闭"
        onClick={closeModal}
      />
      <div
        className={`modal-enter relative max-h-[85vh] overflow-auto rounded-2xl border border-slate-200 bg-white shadow-2xl ${
          modal.wide ? 'w-full max-w-3xl' : 'w-full max-w-lg'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-3 backdrop-blur">
          <h3 className="text-[15px] font-bold text-slate-900">{modal.title}</h3>
          <button
            type="button"
            onClick={closeModal}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{modal.body}</div>
      </div>
    </div>
  )
}
