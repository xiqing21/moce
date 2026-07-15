import { useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  Database,
  Link2,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  XCircle,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'
import { useApp } from '../context/AppContext'

export function InsightFeasibility() {
  const navigate = useNavigate()
  const { query, toast } = useApp()

  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <StepBar
        className="mb-5"
        steps={[
          { id: 1, label: '提问', status: 'done' },
          { id: 2, label: '理解问题', status: 'active' },
          { id: 3, label: '资产匹配', status: 'pending' },
          { id: 4, label: '可行性判断', status: 'pending' },
          { id: 5, label: '执行查询', status: 'pending' },
        ]}
      />

      <div className="mb-5 text-center">
        <h1 className="text-[28px] font-extrabold text-slate-900">
          智能理解与<span className="text-moce-orange">可行性判断</span>
        </h1>
        <p className="mt-1.5 text-[12.5px] text-slate-500">
          ✦ 系统先理解你的问题，再判断是直接分析、临时计算，还是提交数据需求。 ✦
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Panel 1 */}
        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-[11px] text-white">1</span>
            <MessageSquare size={14} className="text-orange-500" />
            用户提问 & 意图识别
          </div>

          <div className="mb-3 text-[11px] text-slate-500">用户问题</div>
          <div className="rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2.5 text-[12.5px] leading-relaxed text-slate-700">
            {query || '分析过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势及资金净流入对比'}
          </div>

          <div className="mt-4 text-[11px] font-medium text-slate-500">意图识别结果</div>
          <div className="mt-2 space-y-2">
            {[
              { icon: BarChart3, k: '分析类型', v: '趋势分析' },
              { icon: Target, k: '指标', v: 'TVL、资金净流入' },
              { icon: Link2, k: '链', v: 'Arbitrum、Optimism' },
              { icon: Calendar, k: '时间范围', v: '过去 30 天' },
              { icon: Calendar, k: '粒度', v: '按天' },
              { icon: BarChart3, k: '输出', v: '图表 + 报告' },
            ].map((row) => (
              <div key={row.k} className="flex items-center gap-2 text-[12px]">
                <row.icon size={13} className="text-slate-400" />
                <span className="w-16 text-slate-400">{row.k}</span>
                <span className="rounded-md bg-slate-50 px-2 py-0.5 font-medium text-slate-700">{row.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2 */}
        <div className="card p-4">
          <div className="mb-3 flex items-center gap-2 text-[13px] font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500 text-[11px] text-white">2</span>
            <Database size={14} className="text-blue-500" />
            数据资产匹配
          </div>

          <div className="space-y-2 text-[12px]">
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-slate-400">命中指标：</span>
              <span className="font-medium text-slate-700">TVL、Net Inflow</span>
            </div>
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-slate-400">命中结果表：</span>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">ads_chain_tvl_daily</span>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">ads_chain_net_inflow_daily</span>
                <CheckCircle2 size={14} className="text-emerald-500" />
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-slate-400">候选明细表：</span>
              <div className="flex flex-wrap gap-1">
                <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-700">dwd_protocol_tvl_daily</span>
                <span className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-700">dwd_chain_capital_flow_daily</span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-slate-400">匹配方式：</span>
              <span className="text-slate-600">向量检索 + 指标目录 + 历史查询模板</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            {[
              { icon: Search, title: '意图识别', desc: 'NLP 解析用户问题 提取关键要素', color: 'bg-violet-50 text-violet-500' },
              { icon: Database, title: '资产匹配', desc: '语义检索 + 指标目录 匹配最优数据资产', color: 'bg-blue-50 text-blue-500' },
              { icon: CheckCircle2, title: '生成判断', desc: '结合资产覆盖度 产出可行性判断', color: 'bg-orange-50 text-orange-500' },
            ].map((s, i) => (
              <div key={s.title} className="flex flex-1 flex-col items-center text-center">
                <div className={`mb-1.5 flex h-9 w-9 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon size={16} />
                </div>
                <div className="text-[11px] font-semibold text-slate-700">{s.title}</div>
                <div className="mt-0.5 text-[9.5px] leading-snug text-slate-400">{s.desc}</div>
                {i < 2 && <span className="sr-only">→</span>}
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
            {[
              { title: '向量检索', desc: '语义理解，精准匹配' },
              { title: '血缘与目录', desc: '全链路血缘，可信可追溯' },
              { title: '历史查询模板', desc: '复用最佳实践，加速分析' },
            ].map((x) => (
              <div key={x.title} className="rounded-lg bg-slate-50 px-2 py-2 text-center">
                <div className="text-[10.5px] font-semibold text-slate-700">{x.title}</div>
                <div className="mt-0.5 text-[9px] text-slate-400">{x.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3 */}
        <div className="card space-y-3 p-4">
          <div className="mb-1 flex items-center gap-2 text-[13px] font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500 text-[11px] text-white">3</span>
            <Sparkles size={14} className="text-orange-500" />
            可行性判断
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[13px] font-bold text-emerald-700">
              <CheckCircle2 size={16} /> 可以直接分析
              <span className="ml-1 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] font-medium text-white">推荐</span>
            </div>
            <p className="text-[11.5px] text-emerald-800/80">已匹配结果表，数据完整，可直接生成分析。</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">预计耗时：<b className="text-slate-700">2.3s</b></span>
              <button
                type="button"
                className="btn-primary !py-1.5 !text-[12px]"
                onClick={() => {
                  toast('开始执行查询…', 'info')
                  navigate('/insight/query')
                }}
              >
                开始查询 <ArrowRight size={13} />
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[13px] font-bold text-amber-700">
              <AlertTriangle size={16} /> 可临时分析
            </div>
            <p className="text-[11.5px] text-amber-900/70">没有结果表但有底层明细，建议缩小范围。</p>
            <p className="mt-1 text-[11px] text-slate-500">建议：缩小时间范围或聚焦单链</p>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="btn-orange-outline !py-1 !text-[11px]"
                onClick={() => {
                  toast('已缩小范围并进入查询（Mock）', 'info')
                  navigate('/insight/query')
                }}
              >
                缩小范围并执行 &gt;
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50/40 p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[13px] font-bold text-red-600">
              <XCircle size={16} /> 当前无法直接回答
            </div>
            <p className="text-[11.5px] text-red-800/70">缺少底层数据，需先补充数据资产。</p>
            <p className="mt-1 text-[11px] text-slate-500">缺失：链级资金标注维度明细</p>
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                className="btn-orange-outline !py-1 !text-[11px]"
                onClick={() => {
                  toast('已生成数据需求卡', 'warning')
                  navigate('/data-request')
                }}
              >
                生成数据需求卡 &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-orange-100 bg-orange-50/40 px-5 py-3 text-center text-[12px] text-slate-600">
        <Sparkles size={14} className="mr-1 inline text-orange-500" />
        <b className="text-slate-800">MOCE Insight</b> 不只是聊天，它先理解你的数据意图，再结合企业数据资产，做出专业的可行性判断，给出最优的下一步建议。
      </div>
    </div>
  )
}
