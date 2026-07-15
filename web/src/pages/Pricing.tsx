import { Link } from 'react-router-dom'
import { Check, Gift, Shield, Star, Users, BarChart3 } from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'

const plans = [
  {
    name: 'Free',
    desc: '适合体验 Web3 AI 数据分析',
    price: '$0',
    period: '/ month',
    icon: Gift,
    color: 'orange',
    features: ['基础自然语言查询', '热门问题模板', '基础图表', '基础报告摘要', '公开数据集'],
    limits: ['5 queries / day', '3 charts / day', '1 report / day'],
    cta: 'Start Free',
    outline: true,
  },
  {
    name: 'Pro',
    desc: '适合研究员和链上分析师',
    price: '$29',
    period: '/ month',
    icon: BarChart3,
    color: 'orange',
    popular: true,
    features: ['自由提问', '意图识别', 'Text to SQL', '图表生成', '智能报告', '报告导出', '历史分析保存', '基础 Alpha Watchlist'],
    limits: ['1,000 queries / month', '300 charts / month', '100 reports / month'],
    cta: 'Start Pro',
    outline: false,
  },
  {
    name: 'Team',
    desc: '适合协议方、VC 和研究团队',
    price: '$199',
    period: '/ month',
    icon: Users,
    color: 'violet',
    features: ['团队空间', '共享看板', '定时日报 / 周报', '竞品监控', '数据需求卡', '权限管理', 'Webhook / Telegram 提醒'],
    limits: ['5 seats included', '10,000 queries / month', '50 data requests / month'],
    cta: 'Start Team',
    outline: true,
  },
  {
    name: 'Enterprise',
    desc: '适合数据团队和机构客户',
    price: 'Custom',
    period: '',
    icon: Shield,
    color: 'orange',
    features: ['私有数据源', '自定义指标', 'MOCE Data Agent', 'NL to Job', '血缘分析', 'AIOps', 'SLA 监控', '私有化部署', '专属支持'],
    limits: [],
    cta: 'Contact Sales',
    outline: true,
  },
]

export function Pricing() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-4 mt-1 flex justify-center">
        <ProductTabs active="none" />
      </div>

      <div className="mb-5 text-center">
        <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 sm:text-[32px]">
          Choose the right <span className="text-moce-orange">intelligence layer</span> for your Web3 data team
        </h1>
        <p className="mt-1.5 text-[13px] text-slate-500">
          从个人分析到团队协作，从数据生产到 Alpha 发现，按需选择 MOCE 能力。
        </p>
        <div className="mt-3 inline-flex items-center rounded-full border border-slate-200 bg-white p-1 text-[12px] shadow-sm">
          <span className="rounded-full bg-orange-50 px-3 py-1 font-medium text-orange-600">Monthly</span>
          <span className="px-3 py-1 text-slate-500">Yearly <span className="text-emerald-500">Save 20%</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`card relative flex flex-col p-4 ${
              p.popular ? 'ring-2 ring-orange-400 shadow-lg shadow-orange-100' : ''
            }`}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                <Star size={10} fill="white" /> Most Popular
              </span>
            )}
            <div className="mb-2 flex items-center gap-2">
              <p.icon size={16} className={p.color === 'violet' ? 'text-violet-500' : 'text-orange-500'} />
              <span className="text-[15px] font-bold text-slate-900">{p.name}</span>
            </div>
            <p className="mb-3 text-[11px] text-slate-500">{p.desc}</p>
            <div className="mb-3">
              <span className={`text-[28px] font-extrabold ${p.price === 'Custom' ? 'text-moce-orange' : 'text-slate-900'}`}>
                {p.price}
              </span>
              {p.period && <span className="text-[12px] text-slate-400">{p.period}</span>}
            </div>
            <div className="mb-1 text-[11px] font-semibold text-slate-500">Features</div>
            <ul className="mb-3 space-y-1.5 text-[11.5px] text-slate-600">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-1.5">
                  <Check size={13} className={`mt-0.5 shrink-0 ${p.color === 'violet' ? 'text-violet-500' : 'text-orange-500'}`} />
                  {f}
                </li>
              ))}
            </ul>
            {p.limits.length > 0 && (
              <>
                <div className="mb-1 text-[11px] font-semibold text-slate-500">Limits</div>
                <ul className="mb-4 space-y-1 text-[11px] text-slate-500">
                  {p.limits.map((l) => (
                    <li key={l} className="flex items-center gap-1.5">
                      <span className="text-slate-300">▣</span> {l}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-auto">
              <button
                className={`w-full !py-2 text-[12.5px] ${
                  p.outline ? 'btn-orange-outline' : 'btn-primary'
                }`}
              >
                {p.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white font-bold text-sm">A</div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold text-slate-800">MOCE Alpha Add-on</div>
            <div className="text-[11px] text-slate-500">发现预测市场、资金流和策略信号中的 Alpha 机会</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['Prediction Market Intelligence', 'Smart Money', 'Odds / Depth', 'Strategy / Quant Lab', 'Backtesting', 'Live Signals'].map((t) => (
                <span key={t} className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] text-orange-600">{t}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[18px] font-extrabold text-orange-500">+$49</div>
            <div className="text-[11px] text-slate-400">/ month</div>
          </div>
        </div>
        <div className="card flex flex-wrap items-center gap-3 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white text-sm">◈</div>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold text-slate-800">MOCE Data Agent Add-on</div>
            <div className="text-[11px] text-slate-500">把无法回答的问题变成可生产、可监控、可复用的数据资产</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {['Data Request Card', 'NL to Job', 'Lineage', 'Flink / Fluss / Paimon / StarRocks', 'AIOps'].map((t) => (
                <span key={t} className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] text-violet-600">{t}</span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[16px] font-extrabold text-violet-600">Custom</div>
            <div className="text-[11px] text-slate-400">/ Team Add-on</div>
          </div>
        </div>
      </div>

      {/* Comparison mini table */}
      <div className="card mt-4 overflow-hidden">
        <table className="data-table text-center">
          <thead>
            <tr>
              <th className="text-left">Features</th>
              <th>Free</th>
              <th>Pro</th>
              <th>Team</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['自然语言提问', true, true, true, true],
              ['Text to SQL', false, true, true, true],
              ['图表生成', true, true, true, true],
              ['报告导出', false, true, true, true],
              ['团队协作', false, false, true, true],
              ['数据需求卡', false, false, true, true],
              ['Data Agent', false, false, true, true],
              ['Prediction Market', false, false, true, true],
              ['Strategy Lab', false, false, false, true],
              ['私有数据源', false, false, false, true],
            ].map((row) => (
              <tr key={row[0] as string}>
                <td className="text-left text-slate-600">{row[0] as string}</td>
                {(row.slice(1) as boolean[]).map((v, i) => (
                  <td key={i}>
                    {v ? <Check size={14} className="mx-auto text-orange-500" /> : <span className="text-slate-300">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-slate-100 px-4 py-2 text-center">
          <Link to="/compare" className="text-[12px] font-medium text-orange-500 hover:underline">
            查看完整功能对比 →
          </Link>
        </div>
      </div>
    </div>
  )
}
