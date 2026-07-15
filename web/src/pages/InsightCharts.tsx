import { useMemo, useState } from 'react'
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
  MultiMetricChart,
  SimpleBarChart,
} from '../components/charts/MiniCharts'
import { multiMetricTrend, tvlCompare30d, tvlDelta } from '../data/mock'
import { useApp } from '../context/AppContext'

const CHART_TYPES = [
  { icon: LineIcon, label: '趋势图', desc: 'TVL 双链折线对比' },
  { icon: BarChart3, label: '柱状图', desc: '当前 TVL 对比' },
  { icon: PieIcon, label: '饼图', desc: '市场份额环形图' },
  { icon: BarChart3, label: '多维对比', desc: 'TVL + 净流入组合图' },
  { icon: Wallet, label: '资金流向', desc: '每日净流入面积图' },
  { icon: Wallet, label: '协议收入', desc: '协议费用/收入柱状（Mock）' },
  { icon: Users, label: '用户增长', desc: '活跃地址增长趋势（Mock）' },
  { icon: Flame, label: 'Gas 分析', desc: '平均 Gas 成本对比（Mock）' },
] as const

type ChartLabel = (typeof CHART_TYPES)[number]['label']

const X_OPTIONS = ['日期 (day)', '周 (week)', '月 (month)']
const Y_OPTIONS = ['TVL (USD)', '净流入 (USD)', '活跃地址', 'Gas (USD)']
const GROUP_OPTIONS = ['链 (Arbitrum, Optimism)', '仅 Arbitrum', '仅 Optimism', '协议 Top5']
const GRAIN_OPTIONS = ['按天 (1d)', '按小时 (1h)', '按周 (1w)']
const SORT_OPTIONS = ['按日期升序', '按日期降序', '按数值降序']

function downloadBlob(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function InsightCharts() {
  const navigate = useNavigate()
  const { chartType, setChartType, toast, query } = useApp()
  const active = (CHART_TYPES.find((c) => c.label === chartType)?.label ?? '趋势图') as ChartLabel

  const [xAxis, setXAxis] = useState(X_OPTIONS[0])
  const [yAxis, setYAxis] = useState(Y_OPTIONS[0])
  const [group, setGroup] = useState(GROUP_OPTIONS[0])
  const [grain, setGrain] = useState(GRAIN_OPTIONS[0])
  const [sort, setSort] = useState(SORT_OPTIONS[0])
  const [anomaly, setAnomaly] = useState(true)
  const [cfgVersion, setCfgVersion] = useState(0)

  /** Build series that visibly changes with X 轴 + 时间粒度 */
  const trendData = useMemo(() => {
    const base = tvlCompare30d
    let data: { date: string; arb: number; op: number }[] = []

    // Prefer grain, then xAxis — make labels obviously different
    const mode =
      grain.includes('小时') || xAxis.includes('日期') && grain.includes('小时')
        ? 'hour'
        : grain.includes('周') || xAxis.includes('周')
          ? 'week'
          : xAxis.includes('月')
            ? 'month'
            : 'day'

    if (mode === 'hour') {
      data = Array.from({ length: 24 }, (_, h) => ({
        date: `${String(h).padStart(2, '0')}:00`,
        arb: 2.2 + Math.sin(h / 3) * 0.15 + h * 0.008,
        op: 0.85 + Math.cos(h / 4) * 0.08 + h * 0.003,
      }))
    } else if (mode === 'week') {
      // Aggregate ~7 days → week labels
      for (let w = 0; w < 5; w++) {
        const slice = base.slice(w * 6, w * 6 + 6)
        if (!slice.length) continue
        const arb = slice.reduce((s, d) => s + d.arb, 0) / slice.length
        const op = slice.reduce((s, d) => s + d.op, 0) / slice.length
        data.push({ date: `第${w + 1}周`, arb, op })
      }
    } else if (mode === 'month') {
      data = [
        { date: '2025-03', arb: 1.95, op: 0.72 },
        { date: '2025-04', arb: 2.15, op: 0.8 },
        { date: '2025-05', arb: 2.47, op: 0.91 },
      ]
    } else {
      // day — full labels like 05-12
      data = base.map((d) => ({ date: d.date, arb: d.arb, op: d.op }))
    }

    // Y-axis mock transform
    if (yAxis.includes('净流入')) {
      data = data.map((d, i) => ({
        ...d,
        arb: 5 + Math.sin(i / 2) * 4 + i * 0.3,
        op: -2 + Math.cos(i / 2.5) * 2 - i * 0.15,
      }))
    } else if (yAxis.includes('活跃')) {
      data = data.map((d, i) => ({
        ...d,
        arb: 80 + i * 2 + Math.sin(i) * 5,
        op: 45 + i * 1.2 + Math.cos(i) * 4,
      }))
    } else if (yAxis.includes('Gas')) {
      data = data.map((d, i) => ({
        ...d,
        arb: 0.12 + Math.sin(i / 3) * 0.03,
        op: 0.08 + Math.cos(i / 3) * 0.02,
      }))
    }

    if (group.includes('仅 Arbitrum')) data = data.map((d) => ({ ...d, op: 0 }))
    if (group.includes('仅 Optimism')) data = data.map((d) => ({ ...d, arb: 0 }))
    if (sort.includes('降序') && sort.includes('日期')) data = [...data].reverse()
    if (sort.includes('数值')) data = [...data].sort((a, b) => b.arb - a.arb)

    return data
  }, [group, sort, grain, xAxis, yAxis, cfgVersion])

  const chartMeta = useMemo(() => {
    const mode = grain.includes('小时')
      ? '小时'
      : grain.includes('周') || xAxis.includes('周')
        ? '周'
        : xAxis.includes('月')
          ? '月'
          : '天'
    return {
      mode,
      points: trendData.length,
      first: trendData[0]?.date ?? '—',
      last: trendData[trendData.length - 1]?.date ?? '—',
    }
  }, [trendData, grain, xAxis])

  const revenueData = useMemo(
    () =>
      Array.from({ length: grain.includes('周') ? 8 : 12 }, (_, i) => ({
        name: grain.includes('周') ? `W${i + 1}` : grain.includes('小时') ? `${i * 2}h` : `D${i + 1}`,
        arb: 1.2 + Math.sin(i / 2) * 0.4 + i * 0.05 + (categoryBump(group)),
        op: 0.6 + Math.cos(i / 3) * 0.2 + i * 0.02,
      })),
    [grain, group],
  )

  const userData = useMemo(
    () =>
      Array.from({ length: grain.includes('小时') ? 24 : 14 }, (_, i) => ({
        date: grain.includes('小时') ? `${String(i).padStart(2, '0')}:00` : `D${i + 1}`,
        arb: 80 + i * 3 + Math.sin(i) * 8,
        op: 50 + i * 2 + Math.cos(i) * 6,
      })),
    [grain],
  )

  const gasData = useMemo(
    () => [
      { name: 'Arbitrum', v: group.includes('仅 Optimism') ? 0 : 0.11 },
      { name: 'Optimism', v: group.includes('仅 Arbitrum') ? 0 : 0.08 },
    ],
    [group],
  )

  function categoryBump(g: string) {
    return g.includes('Top5') ? 0.3 : 0
  }

  const bumpCfg = (msg: string) => {
    setCfgVersion((v) => v + 1)
    toast(msg, 'success')
  }

  const selectType = (label: ChartLabel) => {
    setChartType(label)
    toast(`图表已切换为：${label}`, 'success')
  }

  const exportPng = () => {
    // Generate a simple SVG snapshot as stand-in PNG binary marker + real file download
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
      <rect fill="#fff" width="100%" height="100%"/>
      <text x="40" y="40" font-size="18" fill="#0f172a">MOCE Chart Export — ${active}</text>
      <text x="40" y="70" font-size="12" fill="#64748b">${query || 'TVL chart'}</text>
      <text x="40" y="100" font-size="12" fill="#f97316">X: ${xAxis} · Y: ${yAxis} · ${group}</text>
      <polyline fill="none" stroke="#3b82f6" stroke-width="2" points="40,300 120,260 200,240 280,200 360,180 440,160 520,150 600,140 680,130"/>
      <polyline fill="none" stroke="#ef4444" stroke-width="2" points="40,320 120,310 200,300 280,295 360,290 440,285 520,280 600,275 680,270"/>
    </svg>`
    downloadBlob(`moce-chart-${active}.svg`, svg, 'image/svg+xml')
    // Also offer png-named file with same payload for mock UX
    downloadBlob(`moce-chart-${active}.png.txt`, `PNG export placeholder for ${active}\n${query}\n`, 'text/plain')
    toast('已导出 PNG（演示文件已下载）', 'success')
  }

  const exportSvg = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
      <rect fill="#fafafa" width="100%" height="100%"/>
      <text x="40" y="48" font-family="Inter,sans-serif" font-size="20" font-weight="700" fill="#0f172a">MOCE · ${active}</text>
      <text x="40" y="78" font-family="Inter,sans-serif" font-size="12" fill="#64748b">${query || 'Web3 chart'}</text>
      <rect x="40" y="120" width="12" height="12" fill="#3b82f6"/><text x="58" y="131" font-size="11" fill="#334155">Arbitrum</text>
      <rect x="140" y="120" width="12" height="12" fill="#ef4444"/><text x="158" y="131" font-size="11" fill="#334155">Optimism</text>
      <polyline fill="none" stroke="#3b82f6" stroke-width="2.5" points="40,320 100,280 180,250 260,220 340,200 420,190 500,170 580,160 660,150 740,145"/>
      <polyline fill="none" stroke="#ef4444" stroke-width="2.5" points="40,340 100,330 180,320 260,315 340,310 420,305 500,300 580,295 660,290 740,288"/>
    </svg>`
    downloadBlob(`moce-chart-${Date.now()}.svg`, svg, 'image/svg+xml')
    toast('已导出 SVG 文件', 'success')
  }

  const exportPdf = () => {
    const content = `%PDF-1.1
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources<< /Font<< /F1 5 0 R >> >> >>endobj
4 0 obj<< /Length 120 >>stream
BT /F1 18 Tf 50 720 Td (MOCE Chart Report - ${active}) Tj 0 -30 Td /F1 12 Tf (${query || 'TVL analysis'}) Tj ET
endstream endobj
5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj
xref
0 6
trailer<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF`
    downloadBlob(`moce-report-${active}.pdf`, content, 'application/pdf')
    toast('已导出 PDF 报告', 'success')
  }

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
          点击底部图表类型或右侧配置，主图会立即切换；导出将真实下载文件。
        </p>
      </div>

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
            <Star size={11} /> 当前：{active}
          </span>
          <span className="text-slate-400">数据源：StarRocks · 2.34s</span>
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        {/* Main chart area — switches with chart type */}
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <div className="text-[14px] font-bold text-slate-900">{active}</div>
              <div className="text-[11px] text-slate-500">
                {CHART_TYPES.find((c) => c.label === active)?.desc}
              </div>
              <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
                <span className="rounded-full bg-orange-50 px-2 py-0.5 font-semibold text-orange-600">
                  粒度：{chartMeta.mode} · {chartMeta.points} 个点
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                  X：{xAxis}（{chartMeta.first} → {chartMeta.last}）
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">Y：{yAxis}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{group}</span>
                {anomaly && (
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">异常点 ON</span>
                )}
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              配置 v{cfgVersion + 1} 已生效
            </span>
          </div>

          <div className="min-h-[320px] rounded-xl border border-slate-100 bg-slate-50/40 p-2">
            {active === '趋势图' && (
              <DualLineChart
                data={trendData}
                lines={[
                  { key: 'arb', color: '#3b82f6', name: yAxis.includes('Gas') ? 'Arb Gas' : 'Arbitrum' },
                  { key: 'op', color: '#ef4444', name: yAxis.includes('Gas') ? 'OP Gas' : 'Optimism' },
                ]}
                height={300}
              />
            )}
            {active === '柱状图' && (
              <SimpleBarChart
                data={[
                  { name: 'Arbitrum', v: group.includes('仅 Optimism') ? 0 : 2.47 },
                  { name: 'Optimism', v: group.includes('仅 Arbitrum') ? 0 : 0.92 },
                ]}
                bars={[{ key: 'v', color: '#3b82f6', name: yAxis }]}
                height={300}
              />
            )}
            {active === '饼图' && (
              <div className="mx-auto max-w-md">
                <DonutChart
                  data={[
                    { name: 'Arbitrum', value: group.includes('仅 Optimism') ? 0 : 72.8 },
                    { name: 'Optimism', value: group.includes('仅 Arbitrum') ? 0 : 27.2 },
                  ].filter((d) => d.value > 0)}
                  colors={['#3b82f6', '#ef4444']}
                  centerLabel="总 TVL"
                  centerValue="$3.39B"
                  height={300}
                />
              </div>
            )}
            {active === '多维对比' && <MultiMetricChart data={multiMetricTrend} height={300} />}
            {active === '资金流向' && <AreaDeltaChart data={tvlDelta} height={300} />}
            {active === '协议收入' && (
              <DualLineChart
                data={revenueData.map((d) => ({ date: d.name, arb: d.arb, op: d.op }))}
                lines={[
                  { key: 'arb', color: '#f97316', name: 'Arb 协议收入 ($M)' },
                  { key: 'op', color: '#8b5cf6', name: 'OP 协议收入 ($M)' },
                ]}
                height={300}
              />
            )}
            {active === '用户增长' && (
              <DualLineChart
                data={userData}
                lines={[
                  { key: 'arb', color: '#22c55e', name: 'Arb 活跃地址 (K)' },
                  { key: 'op', color: '#3b82f6', name: 'OP 活跃地址 (K)' },
                ]}
                height={300}
              />
            )}
            {active === 'Gas 分析' && (
              <SimpleBarChart
                data={gasData}
                bars={[{ key: 'v', color: '#f59e0b', name: 'Avg Gas (USD)' }]}
                height={300}
              />
            )}
          </div>

          {/* Secondary grid for recommended variants when on 趋势图 default */}
          {active === '趋势图' && (
            <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
              <button type="button" className="rounded-xl border border-slate-100 p-2 text-left hover:border-orange-200" onClick={() => selectType('柱状图')}>
                <div className="mb-1 text-[11px] font-semibold">② 当前 TVL 对比</div>
                <SimpleBarChart data={[{ name: 'Arb', v: 2.47 }, { name: 'OP', v: 0.92 }]} bars={[{ key: 'v', color: '#3b82f6', name: 'TVL' }]} height={100} />
              </button>
              <button type="button" className="rounded-xl border border-slate-100 p-2 text-left hover:border-orange-200" onClick={() => selectType('饼图')}>
                <div className="mb-1 text-[11px] font-semibold">③ 市场份额</div>
                <DonutChart data={[{ name: 'A', value: 73 }, { name: 'O', value: 27 }]} colors={['#3b82f6', '#ef4444']} height={100} centerValue="73%" />
              </button>
              <button type="button" className="rounded-xl border border-slate-100 p-2 text-left hover:border-orange-200" onClick={() => selectType('资金流向')}>
                <div className="mb-1 text-[11px] font-semibold">④ 每日增量</div>
                <AreaDeltaChart data={tvlDelta.slice(-14)} height={100} />
              </button>
            </div>
          )}
        </div>

        {/* Config panel — real controls */}
        <aside className="card p-4">
          <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-slate-800">
            图表配置
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-medium text-orange-500"
              onClick={() => {
                setXAxis(X_OPTIONS[0])
                setYAxis(Y_OPTIONS[0])
                setGroup(GROUP_OPTIONS[0])
                setGrain(GRAIN_OPTIONS[0])
                setSort(SORT_OPTIONS[0])
                setAnomaly(true)
                setChartType('趋势图')
                toast('配置已重置为默认', 'info')
              }}
            >
              <RefreshCw size={12} /> 重置
            </button>
          </div>

          <div className="space-y-3 text-[12px]">
            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">图表类型</span>
              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={active}
                onChange={(e) => selectType(e.target.value as ChartLabel)}
              >
                {CHART_TYPES.map((c) => (
                  <option key={c.label} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">X 轴</span>
              <select
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={xAxis}
                onChange={(e) => {
                  const v = e.target.value
                  setXAxis(v)
                  // Sync grain for visible X labels
                  if (v.includes('周')) setGrain('按周 (1w)')
                  else if (v.includes('月')) setGrain('按天 (1d)')
                  else setGrain('按天 (1d)')
                  bumpCfg(`X 轴已改为 ${v}，刻度已重绘`)
                }}
              >
                {X_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">Y 轴</span>
              <select
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={yAxis}
                onChange={(e) => {
                  setYAxis(e.target.value)
                  if (e.target.value.includes('Gas')) selectType('Gas 分析')
                  else if (e.target.value.includes('活跃')) selectType('用户增长')
                  else if (e.target.value.includes('净流入')) selectType('资金流向')
                  else if (active !== '趋势图' && active !== '柱状图' && active !== '多维对比') selectType('趋势图')
                  bumpCfg(`Y 轴：${e.target.value}，序列已重算`)
                }}
              >
                {Y_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">分组字段</span>
              <select
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={group}
                onChange={(e) => {
                  setGroup(e.target.value)
                  bumpCfg(`分组：${e.target.value}`)
                }}
              >
                {GROUP_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">时间粒度</span>
              <select
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={grain}
                onChange={(e) => {
                  const v = e.target.value
                  setGrain(v)
                  if (v.includes('周')) setXAxis('周 (week)')
                  else if (v.includes('小时')) setXAxis('日期 (day)')
                  else setXAxis('日期 (day)')
                  bumpCfg(`时间粒度：${v} → X 轴标签已切换（${v.includes('周') ? '第N周' : v.includes('小时') ? 'HH:00' : 'MM-DD'}）`)
                }}
              >
                {GRAIN_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-[11px] text-slate-500">排序方式</span>
              <select
                className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 outline-none focus:border-orange-300"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value)
                  bumpCfg(`排序：${e.target.value}`)
                }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-slate-500">是否显示异常点</span>
              <button
                type="button"
                role="switch"
                aria-checked={anomaly}
                onClick={() => {
                  setAnomaly((v) => !v)
                  toast(anomaly ? '已隐藏异常点' : '已显示异常点', 'info')
                }}
                className={`relative h-5 w-9 rounded-full transition ${anomaly ? 'bg-orange-500' : 'bg-slate-300'}`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                    anomaly ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                className="btn-outline flex-1 !py-1.5 !text-[11px]"
                onClick={() => {
                  const i = CHART_TYPES.findIndex((c) => c.label === active)
                  selectType(CHART_TYPES[(i + 1) % CHART_TYPES.length].label)
                }}
              >
                更换图表类型
              </button>
              <button
                type="button"
                className="btn-outline flex-1 !py-1.5 !text-[11px]"
                onClick={() => toast(`当前配置：${active} / ${xAxis} / ${yAxis} / ${group}`, 'info')}
              >
                查看配置摘要
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom type switcher + exports */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {CHART_TYPES.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => selectType(c.label)}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-[11px] transition ${
                active === c.label
                  ? 'border-orange-300 bg-orange-50 font-semibold text-orange-600 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-orange-200 hover:text-orange-600'
              }`}
            >
              <c.icon size={12} />
              {c.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={exportPng}>
            <Download size={12} /> 导出 PNG
          </button>
          <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={exportSvg}>
            <Download size={12} /> 导出 SVG
          </button>
          <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={exportPdf}>
            <Download size={12} /> 导出 PDF
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => {
              toast('正在生成报告…', 'info')
              navigate('/insight/report')
            }}
          >
            <FileText size={12} /> 生成报告
          </button>
          <button
            type="button"
            className="btn-primary !py-1.5 !text-[11px]"
            onClick={() => {
              toast('一键生成图文报告…', 'success')
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
