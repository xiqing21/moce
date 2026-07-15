import { Check, Clock, Gift, Minus, Plus, Shield, Users, BarChart3 } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'

type Cell = 'yes' | 'no' | 'limited' | 'addon' | 'included'

const sections: {
  name: string
  icon: string
  rows: { feature: string; free: Cell; pro: Cell; team: Cell; enterprise: Cell }[]
}[] = [
  {
    name: 'MOCE Insight',
    icon: '💬',
    rows: [
      { feature: '自然语言提问', free: 'yes', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '热门问题模板', free: 'yes', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '自由输入问题', free: 'yes', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '意图识别', free: 'limited', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '数据资产匹配', free: 'limited', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: 'Text to SQL', free: 'limited', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: 'SQL 查看 / 复制', free: 'no', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '图表生成', free: 'limited', pro: 'yes', team: 'yes', enterprise: 'included' },
      { feature: '多图表推荐', free: 'no', pro: 'limited', team: 'yes', enterprise: 'included' },
      { feature: '智能报告', free: 'no', pro: 'limited', team: 'yes', enterprise: 'included' },
      { feature: '报告导出', free: 'limited', pro: 'limited', team: 'yes', enterprise: 'included' },
    ],
  },
  {
    name: 'Team Collaboration',
    icon: '👥',
    rows: [
      { feature: '团队空间', free: 'no', pro: 'no', team: 'included', enterprise: 'included' },
      { feature: '共享看板', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
      { feature: '定时日报 / 周报', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
      { feature: '竞品监控', free: 'no', pro: 'no', team: 'limited', enterprise: 'included' },
      { feature: '权限管理', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
      { feature: 'Webhook / Telegram 提醒', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
    ],
  },
  {
    name: 'MOCE Data Agent',
    icon: '◈',
    rows: [
      { feature: '数据需求卡', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
      { feature: 'Data Dev Agent', free: 'no', pro: 'addon', team: 'included', enterprise: 'included' },
      { feature: 'NL to Job', free: 'no', pro: 'addon', team: 'included', enterprise: 'included' },
      { feature: '数仓分层', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: '血缘分析', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: '任务 DAG', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: 'AIOps', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '异常检测', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '根因分析', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
    ],
  },
  {
    name: 'MOCE Alpha',
    icon: 'A',
    rows: [
      { feature: 'Alpha Watchlist', free: 'no', pro: 'limited', team: 'included', enterprise: 'included' },
      { feature: 'Prediction Market Intelligence', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: '赔率与盘口分析', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: 'Smart Money 追踪', free: 'no', pro: 'addon', team: 'limited', enterprise: 'included' },
      { feature: '跨市场价差', free: 'no', pro: 'addon', team: 'addon', enterprise: 'included' },
      { feature: 'Strategy / Quant Lab', free: 'no', pro: 'addon', team: 'addon', enterprise: 'included' },
      { feature: '回测', free: 'no', pro: 'addon', team: 'addon', enterprise: 'included' },
      { feature: '实时信号监控', free: 'no', pro: 'addon', team: 'addon', enterprise: 'included' },
    ],
  },
  {
    name: 'Enterprise',
    icon: '🛡',
    rows: [
      { feature: '私有数据源', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '自定义指标', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '审计日志', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: 'SLA', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '私有化部署', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
      { feature: '专属支持', free: 'no', pro: 'no', team: 'addon', enterprise: 'included' },
    ],
  },
]

function CellIcon({ v }: { v: Cell }) {
  if (v === 'yes' || v === 'included')
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600">
        <Check size={14} strokeWidth={2.5} />
        {v === 'included' && <span className="text-[10px] text-slate-400">Included</span>}
      </span>
    )
  if (v === 'limited')
    return (
      <span className="inline-flex items-center gap-1 text-amber-500">
        <Clock size={13} />
        <span className="text-[10px]">Limited</span>
      </span>
    )
  if (v === 'addon')
    return (
      <span className="inline-flex items-center gap-1 text-violet-500">
        <Plus size={13} />
        <span className="text-[10px]">Add-on</span>
      </span>
    )
  return <Minus size={14} className="text-slate-300" />
}

export function ComparePlans() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-4 mt-1 flex justify-center">
        <ProductTabs active="none" />
      </div>

      <div className="mb-4 text-center">
        <h1 className="text-[28px] font-extrabold text-slate-900">
          Compare <span className="text-moce-orange">Plans</span>
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">根据你的使用场景，选择合适的 MOCE 能力层。</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
          <span className="flex items-center gap-1"><Check size={12} className="text-emerald-500" /> Included 包含</span>
          <span className="flex items-center gap-1"><Clock size={12} className="text-amber-500" /> Limited 有限制</span>
          <span className="flex items-center gap-1"><Plus size={12} className="text-violet-500" /> Add-on 需额外付费</span>
          <span className="flex items-center gap-1"><Minus size={12} className="text-slate-300" /> Not available 不可用</span>
        </div>
      </div>

      {/* Plan headers */}
      <div className="mb-2 grid grid-cols-[180px_1fr_1fr_1fr_1fr] gap-2">
        <div />
        {[
          { name: 'Free', desc: '基础体验与入门使用', price: '$0', period: '/ month', icon: Gift, dark: false, highlight: false },
          { name: 'Pro', desc: '个人与专业分析', price: '$29', period: '/ month', icon: BarChart3, dark: false, highlight: true },
          { name: 'Team', desc: '团队协作与运营', price: '$199', period: '/ month', icon: Users, dark: false, highlight: false },
          { name: 'Enterprise', desc: '企业级安全与定制', price: 'Custom', period: '', icon: Shield, dark: true, highlight: false },
        ].map((p) => (
          <div
            key={p.name}
            className={`rounded-xl p-3 text-center ${
              p.dark
                ? 'bg-slate-900 text-white'
                : p.highlight
                  ? 'border-2 border-orange-400 bg-white shadow-md'
                  : 'border border-slate-200 bg-white'
            }`}
          >
            {p.highlight && (
              <span className="mb-1 inline-block rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-semibold text-white">推荐</span>
            )}
            <div className="flex items-center justify-center gap-1 text-[13px] font-bold">
              <p.icon size={14} className={p.dark ? 'text-white' : 'text-orange-500'} />
              {p.name}
            </div>
            <div className={`text-[10px] ${p.dark ? 'text-slate-300' : 'text-slate-400'}`}>{p.desc}</div>
            <div className={`mt-1 text-[18px] font-extrabold ${p.dark ? 'text-white' : p.price === 'Custom' ? 'text-slate-800' : 'text-slate-900'}`}>
              {p.price}
              {p.period && <span className="text-[11px] font-normal text-slate-400">{p.period}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Feature matrix */}
      <div className="card overflow-hidden">
        {sections.map((sec) => (
          <div key={sec.name}>
            <div className="grid grid-cols-[180px_1fr_1fr_1fr_1fr] border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-bold text-slate-700">
                <span>{sec.icon}</span> {sec.name}
              </div>
              <div /><div /><div /><div />
            </div>
            {sec.rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-[180px_1fr_1fr_1fr_1fr] border-b border-slate-50 text-[12px] hover:bg-orange-50/20"
              >
                <div className="px-3 py-2 text-slate-600">{row.feature}</div>
                {(['free', 'pro', 'team', 'enterprise'] as const).map((k) => (
                  <div
                    key={k}
                    className={`flex items-center justify-center px-2 py-2 ${
                      k === 'pro' ? 'bg-orange-50/30' : ''
                    }`}
                  >
                    <CellIcon v={row[k]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
