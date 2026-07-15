import { useMemo, useState } from 'react'
import {
  Play,
  RefreshCw,
  Save,
  Star,
  FileText,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { useApp } from '../context/AppContext'
import {
  DonutChart,
  EquityChart,
  SimpleBarChart,
  SparkLine,
} from '../components/charts/MiniCharts'
import { drawdownCurve, equityCurve, factorBuckets } from '../data/mock'

export function AlphaStrategy() {
  const { toast, toggleWatch } = useApp()
  const [hypothesis, setHypothesis] = useState(
    '当某协议 TVL 连续 3 天增长，且鲸鱼净流入增加时，相关代币未来 7 天表现如何？',
  )
  const [timeRange, setTimeRange] = useState('2024-05-01 – 2025-05-18')
  const [universe, setUniverse] = useState('Top 200 协议代币')
  const [factors, setFactors] = useState('TVL, 鲸鱼净流入, 链上活跃度…')
  const [horizon, setHorizon] = useState('7 天')
  const [method, setMethod] = useState('事件驱动回测 (Event Study)')
  const [benchmark, setBenchmark] = useState('BTC, ETH, 等权组合')
  const [note, setNote] = useState('')
  const [ran, setRan] = useState(false)

  const scale = horizon.includes('14') ? 1.2 : horizon.includes('30') ? 1.45 : 1
  const equity = useMemo(
    () =>
      equityCurve.map((d) => ({
        ...d,
        strategy: Number(d.strategy) * scale,
      })),
    [scale],
  )

  const runBacktest = () => {
    setRan(true)
    toast(
      `回测完成：${universe} · 窗口 ${horizon} · ${method} · 样本 2,842 · Sharpe ${(1.72 * scale).toFixed(2)}`,
      'success',
    )
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="alpha" />
      </div>

      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[20px] font-extrabold text-slate-900">
            MOCE Alpha · <span className="text-moce-orange">Strategy / Quant Research Lab</span>
          </h1>
          <p className="mt-0.5 text-[12px] text-slate-500">
            把自然语言策略假设转成可验证的因子研究、回测分析与实时信号监控。
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            className="btn-primary !py-1.5 !text-[11px]"
            onClick={runBacktest}
          >
            <Play size={12} /> 运行回测
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toast('策略报告已生成 PDF', 'success')}
          >
            <FileText size={12} /> 生成策略报告
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toast('已保存为监控模板', 'success')}
          >
            <Save size={12} /> 保存为监控模板
          </button>
          <button
            type="button"
            className="btn-outline !py-1.5 !text-[11px]"
            onClick={() => toggleWatch('strategy-tvl-whale')}
          >
            <Star size={12} /> 加入 Alpha Watchlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[230px_1fr_220px]">
        {/* Left */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">1 策略假设（自然语言）</div>
            <div className="rounded-xl border border-orange-200 bg-orange-50/30 p-2.5">
              <textarea
                className="min-h-[80px] w-full resize-none bg-transparent text-[12px] leading-relaxed text-slate-700 outline-none"
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500 text-[10px] text-white hover:bg-orange-600"
                  onClick={() => {
                    toast('已解析策略假设并填充默认参数', 'success')
                    runBacktest()
                  }}
                >
                  ✦
                </button>
              </div>
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">2 参数配置</div>
            <div className="space-y-2 text-[11px]">
              <Field
                label="时间范围"
                value={timeRange}
                options={['2024-05-01 – 2025-05-18', '2024-01-01 – 2024-12-31', '2023-01-01 – 2025-05-18', '近 180 天']}
                onChange={(v) => {
                  setTimeRange(v)
                  toast(`时间范围：${v}`, 'info')
                }}
              />
              <Field
                label="研究对象"
                value={universe}
                options={['Top 200 协议代币', 'Top 50 协议代币', 'L2 原生代币', 'DeFi Bluechips']}
                onChange={(v) => {
                  setUniverse(v)
                  toast(`研究对象：${v}`, 'info')
                }}
              />
              <Field
                label="因子集合"
                value={factors}
                options={[
                  'TVL, 鲸鱼净流入, 链上活跃度…',
                  'TVL only',
                  '鲸鱼净流入 + 资金费率',
                  '活跃地址 + Gas + TVL',
                ]}
                onChange={(v) => {
                  setFactors(v)
                  toast(`因子：${v}`, 'info')
                }}
              />
              <Field
                label="预测窗口"
                value={horizon}
                options={['3 天', '7 天', '14 天', '30 天']}
                onChange={(v) => {
                  setHorizon(v)
                  toast(`预测窗口：${v}`, 'info')
                }}
              />
              <Field
                label="回测方式"
                value={method}
                options={['事件驱动回测 (Event Study)', '滚动窗口回测', 'Walk-forward', '蒙特卡洛模拟']}
                onChange={(v) => {
                  setMethod(v)
                  toast(`回测方式：${v}`, 'info')
                }}
              />
              <Field
                label="基准对照"
                value={benchmark}
                options={['BTC, ETH, 等权组合', '仅 BTC', '仅 ETH', '等权组合', '市场中性']}
                onChange={(v) => {
                  setBenchmark(v)
                  toast(`基准：${v}`, 'info')
                }}
              />
              <button type="button" className="btn-primary w-full !py-1.5 !text-[11px]" onClick={runBacktest}>
                应用参数并回测
              </button>
              {ran && (
                <div className="rounded-lg bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                  ✓ 收益曲线已按窗口 {horizon} 重算
                </div>
              )}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
              3 已保存模板
              <button
                type="button"
                className="text-[10px] font-normal text-orange-500"
                onClick={() => toast('模板管理：3 个模板（Mock）', 'info')}
              >
                管理 ›
              </button>
            </div>
            <button
              type="button"
              className="w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-left hover:border-orange-200"
              onClick={() => {
                setHypothesis('当某协议 TVL 连续 3 天增长，且鲸鱼净流入增加时，相关代币未来 7 天表现如何？')
                setHorizon('7 天')
                toast('已加载模板：TVL 增长 + 鲸鱼净流入', 'success')
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] font-medium text-slate-800">TVL 增长 + 鲸鱼净流入 (7D)</span>
                <span className="rounded bg-emerald-50 px-1 text-[9px] text-emerald-600">公开</span>
              </div>
              <div className="mt-1 text-[10px] text-slate-400">创建于 2025-05-12 14:32</div>
              <div className="mt-0.5 text-[10px] text-slate-500">捕捉协议资金面改善信号，验证对代币短期表现预测能力。</div>
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">最近运行：2025-05-17 22:15</span>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-600">回测完成</span>
              </div>
            </button>
            <div className="mt-2">
              <div className="mb-0.5 text-[11px] text-slate-400">策略备注（可选）</div>
              <textarea
                className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-[11px] text-slate-600 outline-none focus:border-orange-300"
                rows={2}
                placeholder="记录策略思路、假设依据或特殊说明…"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 500))}
              />
              <div className="text-right text-[9px] text-slate-300">{note.length} / 500</div>
            </div>
          </div>
        </aside>

        {/* Center workspace */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">研究工作区</span>
            <span>回测区间：2024-05-01 – 2025-05-18 · 样本事件 2,842</span>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">1 累计收益曲线</div>
              <EquityChart data={equity} height={140} />
              <div className="text-right text-[10px] font-medium text-orange-600">
                +{(112.35 * scale).toFixed(2)}%
              </div>
            </div>
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">2 回撤曲线</div>
              <EquityChart data={drawdownCurve} height={140} />
              <div className="text-right text-[10px] font-medium text-red-500">-13.27%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">3 因子分层收益（未来 7 天）</div>
              <SimpleBarChart
                data={factorBuckets.map((b) => ({ name: b.name, ret: b.ret, win: b.win }))}
                bars={[{ key: 'ret', color: '#f97316', name: '平均收益' }]}
                height={130}
              />
            </div>
            <div className="card p-2.5">
              <div className="mb-1 flex items-center justify-between text-[11.5px] font-semibold">
                4 信号触发时间线
                <div className="text-[10px] font-normal text-slate-400">
                  总事件数 <b className="text-slate-700">2,842</b> · 当前持仓事件 <b className="text-slate-700">58</b>
                </div>
              </div>
              <SimpleBarChart
                data={Array.from({ length: 20 }, (_, i) => ({
                  name: String(i),
                  v: 20 + Math.sin(i / 2) * 30 + (i % 4) * 10,
                }))}
                bars={[{ key: 'v', color: '#fb923c', name: '信号触发' }]}
                height={110}
              />
              <div className="text-[10px] text-slate-400">平均持仓有期收益 <span className="font-medium text-emerald-600">+2.13%</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">5 策略构成与样本分布</div>
              <div className="flex items-center gap-2">
                <div className="w-[45%]">
                  <DonutChart
                    data={[
                      { name: 'DeFi', value: 48.6 },
                      { name: 'L1/L2', value: 24.7 },
                      { name: 'Infra', value: 13.2 },
                      { name: 'NFT/G', value: 7.1 },
                      { name: '其他', value: 6.4 },
                    ]}
                    colors={['#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e', '#94a3b8']}
                    centerLabel="2,842"
                    centerValue="事件"
                    height={120}
                  />
                </div>
                <div className="flex-1 space-y-1 text-[10.5px]">
                  {[
                    ['DeFi', '48.6%', 'bg-blue-500'],
                    ['L1/L2', '24.7%', 'bg-violet-500'],
                    ['Infra', '13.2%', 'bg-amber-500'],
                    ['NFT/GameFi', '7.1%', 'bg-emerald-500'],
                    ['其他', '6.4%', 'bg-slate-400'],
                  ].map((r) => (
                    <div key={r[0]} className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${r[2]}`} />
                      <span className="flex-1 text-slate-600">{r[0]}</span>
                      <span className="font-medium">{r[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card p-2.5">
              <div className="mb-1 flex items-center justify-between text-[11.5px] font-semibold">
                6 AI 研究结论摘要
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-normal text-emerald-600">置信度：高</span>
              </div>
              <p className="mb-1.5 text-[11px] text-slate-500">在样本区间内，该策略在 7 天预测窗口下表现显著优于基准。</p>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• 策略年化收益 68.27%，超额收益稳定，最大回撤可控。</li>
                <li>• 因子分层呈单调递增关系，高分组优势明显。</li>
                <li>• 策略在中小市值资产中信号质量更高，适合捕捉早期资金面改善。</li>
                <li>• 建议结合链上活跃度与资金费率过滤，进一步提升胜率。</li>
              </ul>
              <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-400">
                <span>显著性（检验）：p &lt; 0.01</span>
                <span>信息比率 (IR)：1.72</span>
                <span>样本稳健性：良好</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">策略表现概览</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: '总收益', v: '+112.35%', c: 'text-emerald-600' },
                { l: '年化收益', v: '+68.27%', c: 'text-emerald-600' },
                { l: '最大回撤', v: '-13.27%', c: 'text-red-500' },
                { l: 'Sharpe Ratio', v: '1.72', c: 'text-slate-800' },
                { l: '胜率', v: '62.41%', c: 'text-slate-800' },
                { l: '盈亏比', v: '2.48', c: 'text-slate-800' },
              ].map((k) => (
                <div key={k.l} className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[10px] text-slate-400">{k.l}</div>
                  <div className={`text-[14px] font-bold ${k.c}`}>{k.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
              实时信号监控
              <span className="flex items-center gap-1 text-[10px] font-normal text-slate-400">
                <RefreshCw size={10} /> 1 分钟前
              </span>
            </div>
            <div className="mb-2">
              <div className="text-[10px] text-slate-400">当前活跃信号数</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-slate-900">58</span>
                <span className="text-[11px] text-emerald-500">较昨日 +12 (+26.09%)</span>
              </div>
              <SparkLine data={[30, 32, 35, 38, 42, 40, 45, 48, 52, 55, 58]} height={36} />
            </div>
            <div className="text-[11px] font-medium text-slate-600 mb-1">最近触发信号</div>
            {[
              ['GMX', '12:43', 'bg-blue-500'],
              ['LDO', '12:31', 'bg-violet-500'],
              ['PENDLE', '12:18', 'bg-emerald-500'],
              ['RDNT', '12:07', 'bg-amber-500'],
              ['VELO', '11:52', 'bg-pink-500'],
            ].map((s) => (
              <div key={s[0]} className="flex items-center gap-2 border-b border-slate-50 py-1 text-[11px]">
                <span className={`h-2 w-2 rounded-full ${s[2]}`} />
                <span className="flex-1 font-medium">{s[0]}</span>
                <span className="text-slate-400">{s[1]}</span>
              </div>
            ))}
            <button className="mt-1 text-[11px] text-orange-500">查看更多 ›</button>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold">高优先级观察对象</div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-slate-400">
                  <th className="py-1 text-left font-medium">代币</th>
                  <th className="py-1 text-left font-medium">协议</th>
                  <th className="py-1 text-right font-medium">强度</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['GMX', 'GMX', 92],
                  ['LDO', 'Lido', 88],
                  ['PENDLE', 'Pendle', 85],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-slate-50">
                    <td className="py-1.5 font-medium">{r[0]}</td>
                    <td className="py-1.5 text-slate-500">{r[1]}</td>
                    <td className="py-1.5 text-right">
                      <div className="inline-flex items-center gap-1">
                        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${r[2]}%` }} />
                        </div>
                        <span className="font-medium text-emerald-600">{r[2]}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 space-y-1 rounded-lg bg-amber-50/50 p-2 text-[10px] text-amber-800">
              <div className="font-semibold">风险提示</div>
              <div>⚠ 市场整体波动率上升（24h 年化波动 68.3%）</div>
              <div>⚠ 部分代币流动性较低，注意滑点风险</div>
              <div>⚠ 事件集中度可能影响回测稳健性</div>
            </div>
          </div>
        </aside>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-400">
        ℹ 研究工作台用于发现与验证策略假设，不直接自动执行交易。
      </p>
    </div>
  )
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <div className="mb-0.5 text-slate-400">{label}</div>
      <select
        className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
