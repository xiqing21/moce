import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  CheckCircle2,
  Download,
  FileText,
  Flame,
  LineChart as LineIcon,
  MessageSquare,
  PieChart as PieIcon,
  RefreshCw,
  Star,
  Users,
  Wallet,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'
import {
  AreaDeltaChart,
  DonutChart,
  DualLineChart,
  SimpleBarChart,
} from '../components/charts/MiniCharts'
import { tvlCompare30d, tvlDelta } from '../data/mock'
import { useApp } from '../context/AppContext'

const chartTypes = [
  { icon: LineIcon, label: '趋势图' },
  { icon: BarChart3, label: '柱状图' },
  { icon: PieIcon, label: '饼图' },
  { icon: BarChart3, label: '多维对比' },
  { icon: Wallet, label: '资金流向' },
  { icon: Wallet, label: '协议收入' },
  { icon: Users, label: '用户增长' },
  { icon: Flame, label: 'Gas 分析' },
]

export function InsightCharts() {
  const navigate = useNavigate()
  const { chartType, setChartType, toast, query } = useApp()

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <StepBar
        className="mb-4"
        steps={[
          { id: 1, label: '提问', status: 'done' },
          { id: 2, label: '理解问题', status: 'done' },
          { id: 3, label: '执行查询', status: 'done' },
          { id: 4, label: 'NL to Chart', status: 'active' },
          { id: 5, label: '输出报告', status: 'pending' },
        ]}
      />

      <div className="mb-4 text-center">
        <h1 className="text-[26px] font-extrabold text-slate-900">
          从自然语言到图表，一键洞察 <span className="text-moce-orange">Web3 趋势</span>
        </h1>
        <p className="mt-1 text-[12.5px] text-slate-500">
          系统已根据查询结果自动推荐最适合的图表类型，你也可以继续调整图表并导出分享。
        </p>
      </div>

      {/* Question bar */}
      <div className="card mb-4 flex flex-wrap items-center gap-3 px-4 py-2.5 text-[12px]">
        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <MessageSquare size={13} className="text-orange-500" />
          当前问题
        </div>
        <span className="text-slate-600">{query || '生成过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势对比图'}</span>
        <span className="ml-auto flex flex-wrap items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">
            <CheckCircle2 size={11} /> 查询完成
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-amber-600">
            <Star size={11} /> 已推荐图表
          </span>
          <span className="text-slate-400">数据源：StarRocks</span>
          <span className="text-slate-400">查询耗时：2.34s</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Chart 1 */}
          <div className="card p-3">
            <div className="mb-1 flex items-center justify-between text-[12.5px] font-semibold">
              <span>① TVL 趋势对比</span>
              <span className="flex items-center gap-1">
                <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">推荐</span>
                <span className="text-slate-300">···</span>
              </span>
            </div>
            <DualLineChart
              data={tvlCompare30d.map((d) => ({ date: d.date, arb: d.arb, op: d.op }))}
              lines={[
                { key: 'arb', color: '#3b82f6', name: 'Arbitrum TVL (USD)' },
                { key: 'op', color: '#ef4444', name: 'Optimism TVL (USD)' },
              ]}
              height={170}
            />
            <div className="mt-1 flex justify-end gap-3 text-[11px]">
              <span className="text-blue-600 font-medium">$2.47B</span>
              <span className="text-red-500 font-medium">$0.92B</span>
            </div>
          </div>

          {/* Chart 2 */}
          <div className="card p-3">
            <div className="mb-1 flex items-center justify-between text-[12.5px] font-semibold">
              <span>② 当前 TVL 对比</span>
              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">推荐</span>
            </div>
            <SimpleBarChart
              data={[
                { name: 'Arbitrum', v: 2.47 },
                { name: 'Optimism', v: 0.92 },
              ]}
              bars={[{ key: 'v', color: '#3b82f6', name: 'TVL' }]}
              height={170}
            />
            {/* Override second bar color via note */}
            <div className="flex justify-around text-[11px] font-medium -mt-1">
              <span className="text-blue-600">$2.47B</span>
              <span className="text-red-500">$0.92B</span>
            </div>
          </div>

          {/* Chart 3 */}
          <div className="card p-3">
            <div className="mb-1 flex items-center justify-between text-[12.5px] font-semibold">
              <span>③ TVL 市场份额</span>
              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">推荐</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[55%]">
                <DonutChart
                  data={[
                    { name: 'Arbitrum', value: 72.8 },
                    { name: 'Optimism', value: 27.2 },
                  ]}
                  colors={['#3b82f6', '#ef4444']}
                  centerLabel="总 TVL"
                  centerValue="$3.39B"
                  height={150}
                />
              </div>
              <div className="flex-1 space-y-2 text-[11.5px]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="flex-1">Arbitrum</span>
                  <span className="font-medium">72.8%</span>
                  <span className="text-slate-500">$2.47B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="flex-1">Optimism</span>
                  <span className="font-medium">27.2%</span>
                  <span className="text-slate-500">$0.92B</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 4 */}
          <div className="card p-3">
            <div className="mb-1 flex items-center justify-between text-[12.5px] font-semibold">
              <span>④ 每日 TVL 增量</span>
              <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] text-orange-600">推荐</span>
            </div>
            <AreaDeltaChart data={tvlDelta} height={170} />
          </div>
        </div>

        {/* Config panel */}
        <aside className="card p-4">
          <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-slate-800">
            图表配置
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-medium text-orange-500"
              onClick={() => {
                setChartType('趋势图')
                toast('图表配置已重置', 'info')
              }}
            >
              <RefreshCw size={12} /> 重置
            </button>
          </div>
          <div className="space-y-3 text-[12px]">
            {[
              { label: '图表类型', value: '趋势图（折线）' },
              { label: 'X 轴', value: '日期 (day)' },
              { label: 'Y 轴', value: 'TVL (USD)' },
              { label: '分组字段', value: '链 (Arbitrum, Optimism)' },
              { label: '时间粒度', value: '按天 (1d)' },
              { label: '排序方式', value: '按日期升序' },
            ].map((f) => (
              <label key={f.label} className="block">
                <span className="mb-1 block text-[11px] text-slate-500">{f.label}</span>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700">
                  {f.value}
                  <span className="text-slate-300">▾</span>
                </div>
              </label>
            ))}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">是否显示异常点</span>
              <div className="relative h-5 w-9 rounded-full bg-orange-500">
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="btn-outline flex-1 !py-1.5 !text-[11px]"
                onClick={() => {
                  const next = chartType === '趋势图' ? '柱状图' : chartType === '柱状图' ? '饼图' : '趋势图'
                  setChartType(next)
                  toast(`已切换图表类型：${next}`, 'info')
                }}
              >
                更换图表类型
              </button>
              <button
                type="button"
                className="btn-outline flex-1 !py-1.5 !text-[11px]"
                onClick={() => toast('高级配置面板已打开（Mock）', 'info')}
              >
                编辑图表配置
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {chartTypes.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                setChartType(c.label)
                toast(`已选择：${c.label}`, 'info')
              }}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[11px] ${
                chartType === c.label
                  ? 'border-orange-300 bg-orange-50 text-orange-600'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-orange-200'
              }`}
            >
              <c.icon size={12} />
              {c.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toast('已导出 PNG（Mock）', 'success')}
          >
            <Download size={12} /> 导出 PNG
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toast('已导出 SVG（Mock）', 'success')}
          >
            <Download size={12} /> 导出 SVG
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toast('已导出 PDF（Mock）', 'success')}
          >
            <Download size={12} /> 导出 PDF
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => navigate('/insight/report')}
          >
            <FileText size={12} /> 生成报告
          </button>
          <button
            type="button"
            className="btn-primary !py-1.5 !text-[11px]"
            onClick={() => {
              toast('正在生成图文报告…', 'info')
              navigate('/insight/report')
            }}
          >
            一键生成图文报告 ✨
          </button>
        </div>
      </div>
    </div>
  )
}
