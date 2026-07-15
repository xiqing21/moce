import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ToastType = 'success' | 'info' | 'error' | 'warning'

export type ToastItem = {
  id: string
  message: string
  type: ToastType
}

export type ModalState = {
  open: boolean
  title: string
  body: ReactNode
  wide?: boolean
} | null

type AppContextValue = {
  query: string
  setQuery: (q: string) => void
  dark: boolean
  toggleDark: () => void
  billing: 'monthly' | 'yearly'
  setBilling: (b: 'monthly' | 'yearly') => void
  toasts: ToastItem[]
  toast: (message: string, type?: ToastType) => void
  dismissToast: (id: string) => void
  modal: ModalState
  openModal: (title: string, body: ReactNode, wide?: boolean) => void
  closeModal: () => void
  savedReports: string[]
  saveReport: (name: string) => void
  watchlist: string[]
  toggleWatch: (id: string) => void
  agentStep: number
  setAgentStep: (n: number) => void
  aiopsStep: number
  setAiopsStep: (n: number) => void
  priority: '高' | '中' | '低'
  setPriority: (p: '高' | '中' | '低') => void
  cycle: string
  setCycle: (c: string) => void
  chartType: string
  setChartType: (t: string) => void
  range: '7D' | '30D' | '90D'
  setRange: (r: '7D' | '30D' | '90D') => void
  selectedNode: string
  setSelectedNode: (n: string) => void
  deploying: boolean
  setDeploying: (v: boolean) => void
  repairing: boolean
  setRepairing: (v: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

let toastSeq = 0

export function AppProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState(
    '分析过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势及资金净流入对比',
  )
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('moce-theme') === 'dark'
  })
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      root.dataset.theme = 'dark'
      localStorage.setItem('moce-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.dataset.theme = 'light'
      localStorage.setItem('moce-theme', 'light')
    }
  }, [dark])
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [modal, setModal] = useState<ModalState>(null)
  const [savedReports, setSavedReports] = useState<string[]>(['Weekly DeFi Overview'])
  const [watchlist, setWatchlist] = useState<string[]>(['fed-cut', 'eth-4k'])
  const [agentStep, setAgentStep] = useState(3)
  const [aiopsStep, setAiopsStep] = useState(1)
  const [priority, setPriority] = useState<'高' | '中' | '低'>('高')
  const [cycle, setCycle] = useState('2 – 3 个工作日')
  const [chartType, setChartType] = useState('趋势图')
  const [range, setRange] = useState<'7D' | '30D' | '90D'>('30D')
  const [selectedNode, setSelectedNode] = useState('dws_l2_tvl_compare_30d')
  const [deploying, setDeploying] = useState(false)
  const [repairing, setRepairing] = useState(false)

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `t-${++toastSeq}`
    setToasts((prev) => [...prev, { id, message, type }])
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const openModal = useCallback((title: string, body: ReactNode, wide?: boolean) => {
    setModal({ open: true, title, body, wide })
  }, [])

  const closeModal = useCallback(() => setModal(null), [])

  const saveReport = useCallback(
    (name: string) => {
      setSavedReports((prev) => (prev.includes(name) ? prev : [name, ...prev]))
      toast(`已保存到报告库：${name}`, 'success')
    },
    [toast],
  )

  const toggleWatch = useCallback(
    (id: string) => {
      setWatchlist((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        toast(prev.includes(id) ? '已移出监控' : '已加入监控', 'info')
        return next
      })
    },
    [toast],
  )

  const value = useMemo(
    () => ({
      query,
      setQuery,
      dark,
      toggleDark: () => setDark((d) => !d),
      billing,
      setBilling,
      toasts,
      toast,
      dismissToast,
      modal,
      openModal,
      closeModal,
      savedReports,
      saveReport,
      watchlist,
      toggleWatch,
      agentStep,
      setAgentStep,
      aiopsStep,
      setAiopsStep,
      priority,
      setPriority,
      cycle,
      setCycle,
      chartType,
      setChartType,
      range,
      setRange,
      selectedNode,
      setSelectedNode,
      deploying,
      setDeploying,
      repairing,
      setRepairing,
    }),
    [
      query,
      dark,
      billing,
      toasts,
      toast,
      dismissToast,
      modal,
      openModal,
      closeModal,
      savedReports,
      saveReport,
      watchlist,
      toggleWatch,
      agentStep,
      aiopsStep,
      priority,
      cycle,
      chartType,
      range,
      selectedNode,
      deploying,
      repairing,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
