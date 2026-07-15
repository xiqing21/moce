import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Activity,
  Brain,
  CheckCircle2,
  Database,
  Flame,
  Globe2,
  Search,
  Send,
  Shield,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { InsightLeftStickers, InsightRightStickers } from '../components/effects/InsightSideStickers'
import { useApp } from '../context/AppContext'

const CAPABILITIES = [
  { icon: Activity, label: '活跃地址', q: '统计过去 7 天多链活跃地址趋势' },
  { icon: Zap, label: 'TVL 趋势', q: '对比过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势' },
  { icon: Search, label: '鲸鱼监控', q: '找出近 24 小时异常活跃的链上地址' },
  { icon: Database, label: '链上交易量', q: '统计 Uniswap 最近 30 天每日交易量趋势' },
  { icon: Wallet, label: '协议收入', q: '生成某协议日活、交易额与协议收入分析' },
  { icon: Flame, label: 'Gas 分析', q: '对比 L2 近 7 天平均 Gas 成本' },
  { icon: Globe2, label: '跨链流量', q: '分析跨链桥过去 7 天净流入 Top 链' },
  { icon: Shield, label: '钱包画像', q: '生成某地址的链上行为画像' },
]

const FEATURES = [
  { icon: Globe2, color: 'text-orange-500 bg-orange-50', title: '多链覆盖', desc: '覆盖 30+ 链与 L2，持续扩展全面支持多链数据分析需求。', tag: '30+ 链' },
  { icon: Database, color: 'text-violet-500 bg-violet-50', title: '海量数据', desc: 'PB 级链上数据存储与处理毫秒级查询，秒级返回结果。', tag: 'PB 级数据' },
  { icon: Brain, color: 'text-amber-500 bg-amber-50', title: '大模型驱动', desc: '自研 AI 模型理解链上语义更懂 Web3 的智能分析引擎。', tag: 'AI 增强' },
  { icon: Shield, color: 'text-emerald-500 bg-emerald-50', title: '安全可靠', desc: '企业级安全架构与隐私保护多重审计，数据安全合规。', tag: 'SOC 2 认证' },
]

export function InsightLanding() {
  const navigate = useNavigate()
  const { query, setQuery, toast } = useApp()
  const [input, setInput] = useState(query || '查询过去 7 天 Arbitrum 上净流入最高的 20 个代币')

  const submit = (q?: string) => {
    const text = (q ?? input).trim()
    if (!text) {
      toast('请输入分析问题', 'warning')
      return
    }
    setQuery(text)
    toast('正在理解问题并匹配数据资产…', 'info')
    navigate('/insight/feasibility')
  }

  return (
    <div className="mx-auto max-w-[1360px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <div className="hero-with-stickers">
        <InsightLeftStickers />

        <div className="hero-center pt-1 text-center">
          <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 sm:text-[36px]">
            从自然语言到 <span className="text-moce-orange">Web3 洞察</span>
          </h1>
          <p className="mt-2 text-[13px] text-slate-500">
            面向链上分析、协议运营与研究团队的 AI 数据分析入口。
          </p>

          <div className="sticker-mobile-strip mt-3 lg:hidden">
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Arbitrum TVL</b>
              <div className="text-lg font-bold">$2.48B</div>
            </div>
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Query Result</b>
              <div className="text-lg font-bold text-emerald-600">1.32s</div>
            </div>
            <div className="card-soft p-3 text-left text-[11px]">
              <b>Token 净流入</b>
              <div className="text-slate-600">USDC $126M</div>
            </div>
          </div>

          <div className="card mt-5 p-4 text-left">
            <div className="flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50/40 px-3 py-2.5">
              <input
                className="flex-1 bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                placeholder="用自然语言描述你的数据问题…"
              />
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-sm hover:bg-orange-600"
                onClick={() => submit()}
              >
                <Send size={14} />
              </button>
            </div>

            <div className="mt-3">
              <div className="mb-2 flex items-center gap-1 text-[11px] font-medium text-orange-500">
                <Sparkles size={12} /> 推荐问题
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  '对比 Optimism 与 Arbitrum 的 TVL 周环比',
                  '找出近 24 小时异常活跃的链上地址',
                  '统计 Uniswap 最近 30 天每日活跃地址与交易量趋势',
                  '生成某协议日活、交易额与留存分析',
                ].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => {
                      setInput(q)
                      submit(q)
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-600 hover:border-orange-200 hover:text-orange-600"
                  >
                    <Search size={11} className="text-slate-400" />
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-amber-400" />
                命中模板 / 向量缓存，可秒级返回
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                平均返回时间 &lt; 2s <CheckCircle2 size={12} />
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {CAPABILITIES.map((c) => (
              <button
                key={c.label}
                type="button"
                onClick={() => {
                  setInput(c.q)
                  submit(c.q)
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11.5px] text-slate-600 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
              >
                <c.icon size={13} className="text-orange-400" />
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {FEATURES.map((f) => (
              <button
                key={f.title}
                type="button"
                className="card p-3.5 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => toast(`${f.title}：${f.desc}`, 'info')}
              >
                <div className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon size={16} />
                </div>
                <div className="text-[13px] font-bold text-slate-800">{f.title}</div>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{f.desc}</p>
                <div className="mt-2 text-[11px] font-semibold text-orange-500">{f.tag}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2">
            <Link to="/insight/feasibility" className="btn-outline !text-[11px]">
              跳过：看可行性判断
            </Link>
            <Link to="/data-request" className="btn-outline !text-[11px]">
              缺数据？生成需求卡
            </Link>
          </div>
        </div>

        <InsightRightStickers />
      </div>
    </div>
  )
}
