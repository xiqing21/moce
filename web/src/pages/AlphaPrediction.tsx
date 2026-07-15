import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  Plus,
  Send,
  Share2,
  Star,
  TrendingUp,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { useApp } from '../context/AppContext'
import {
  DualLineChart,
  SimpleBarChart,
  SparkArea,
} from '../components/charts/MiniCharts'
import { liquidityTrend, oddsSpark, smartMoneyBars } from '../data/mock'
import { resolveAlphaScenario } from '../data/alphaScenarios'

export function AlphaPrediction() {
  const { toast, toggleWatch, setQuery } = useApp()
  const [prompt, setPrompt] = useState(
    '分析某预测市场过去 7 天的赔率变化、成交量放大原因与大户布局行为',
  )
  // Draft selects vs applied (charts only update on 应用)
  const [draftCategory, setDraftCategory] = useState('加密市场')
  const [draftPlatform, setDraftPlatform] = useState('Polymarket, Predict.fun, 其他')
  const [draftTimeRange, setDraftTimeRange] = useState('过去 7 天')
  const [draftEventType, setDraftEventType] = useState('宏观事件')
  const [draftRisk, setDraftRisk] = useState('中等风险')
  const [applied, setApplied] = useState({
    category: '加密市场',
    platform: 'Polymarket, Predict.fun, 其他',
    timeRange: '过去 7 天',
    eventType: '宏观事件',
    risk: '中等风险',
  })
  const [analyzed, setAnalyzed] = useState(false)
  const [scenarioKey, setScenarioKey] = useState(0)

  const scenario = useMemo(
    () =>
      resolveAlphaScenario(
        applied.category,
        applied.platform,
        applied.timeRange,
        applied.eventType,
        applied.risk,
      ),
    [applied, scenarioKey],
  )

  const runAnalysis = () => {
    setQuery(prompt)
    setApplied({
      category: draftCategory,
      platform: draftPlatform,
      timeRange: draftTimeRange,
      eventType: draftEventType,
      risk: draftRisk,
    })
    setAnalyzed(true)
    setScenarioKey((k) => k + 1)
    toast(
      `分析完成并已刷新全页数据：${draftCategory} · ${draftTimeRange} · ${draftEventType} · ${draftRisk}`,
      'success',
    )
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="alpha" />
      </div>

      <div className="relative mb-3">
        {/* Floating odds cards */}
        <div className="pointer-events-none absolute -left-2 top-0 z-10 hidden w-[150px] xl:block">
          <div className="card-soft pointer-events-auto p-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>Polymarket</span>
              <span className="text-emerald-500">YES</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">62.4%</span>
              <span className="text-[10px] text-emerald-500">+3.21%</span>
            </div>
            <SparkArea data={oddsSpark.map((v) => ({ v }))} height={36} />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-2 top-0 z-10 hidden w-[150px] xl:block">
          <div className="card-soft pointer-events-auto p-2.5">
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>Predict.fun</span>
              <span className="text-emerald-500">YES</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold">65.8%</span>
              <span className="text-[10px] text-emerald-500">+4.11%</span>
            </div>
            <SparkArea data={oddsSpark.map((v, i) => ({ v: v + 5 + i * 0.3 }))} color="#22c55e" height={36} />
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3 px-0 xl:px-40">
          <div>
            <h1 className="text-[22px] font-extrabold text-slate-900">
              MOCE Alpha · <span className="text-moce-orange">Prediction Market Intelligence</span>
            </h1>
            <p className="mt-0.5 text-[12px] text-slate-500">
              追踪赔率变化、成交量、流动性、大户行为与跨市场价差，发现预测市场中的 Alpha 信号。
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={() => toast('市场报告已生成（Mock）', 'success')}>
              <TrendingUp size={12} /> 生成市场报告
            </button>
            <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={() => toggleWatch('market-main')}>
              <Plus size={12} /> 加入监控
            </button>
            <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={() => toast('分析已导出 CSV', 'success')}>
              <Download size={12} /> 导出分析
            </button>
            <button type="button" className="btn-outline !py-1.5 !text-[11px]" onClick={() => toast('分享链接已复制', 'info')}>
              <Share2 size={12} /> 分享洞察
            </button>
            <Link to="/alpha/strategy" className="btn-primary !py-1.5 !text-[11px]">
              打开 Strategy Lab →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[200px_1fr_220px]">
        {/* Left filters */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">分析入口</div>
            <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-2.5">
              <textarea
                className="min-h-[72px] w-full resize-none bg-transparent text-[11.5px] leading-relaxed text-slate-700 outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600"
                  onClick={runAnalysis}
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
            {analyzed && (
              <div className="mt-2 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700">
                ✓ 已按当前筛选刷新图表
              </div>
            )}
            <div className="mt-2 space-y-2 text-[11px]">
              <label className="block">
                <div className="mb-0.5 text-slate-400">市场分类</div>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value)}
                >
                  {['加密市场', '政治选举', '体育赛事', '宏观宏观', '科技产品'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="mb-0.5 text-slate-400">平台</div>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
                  value={draftPlatform}
                  onChange={(e) => setDraftPlatform(e.target.value)}
                >
                  {[
                    'Polymarket, Predict.fun, 其他',
                    'Polymarket',
                    'Predict.fun',
                    'Augur',
                    '全部平台',
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="mb-0.5 text-slate-400">时间范围</div>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
                  value={draftTimeRange}
                  onChange={(e) => setDraftTimeRange(e.target.value)}
                >
                  {['过去 24 小时', '过去 7 天', '过去 30 天', '过去 90 天'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="mb-0.5 text-slate-400">事件类型</div>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
                  value={draftEventType}
                  onChange={(e) => setDraftEventType(e.target.value)}
                >
                  {['宏观事件', '协议升级', '监管新闻', '链上异动', '社交媒体'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="mb-0.5 text-slate-400">风险等级</div>
                <select
                  className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700 outline-none focus:border-orange-300"
                  value={draftRisk}
                  onChange={(e) => setDraftRisk(e.target.value)}
                >
                  {['低风险', '中等风险', '高风险', '全部'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
              <p className="text-[10px] text-slate-400">下拉仅改草稿，点下方按钮后全页数据才更新</p>
              <button type="button" className="btn-primary w-full !py-1.5 !text-[11px]" onClick={runAnalysis}>
                应用筛选并分析
              </button>
            </div>
          </div>
          <div className="card-soft p-3">
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-700">我的监控 / 保存的查询</span>
              <span className="rounded-full bg-orange-50 px-1.5 text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-[11px]">
              <span className="text-slate-700">美国大选相关事件追踪</span>
              <Star size={12} className="text-amber-400" />
            </div>
            <div className="mt-1 text-[10px] text-slate-400">更新于 2 小时前</div>
          </div>
        </aside>

        {/* Center */}
        <div className="space-y-3">
          {/* KPI insight card — bound to scenario */}
          <div className="card p-3" key={`kpi-${scenario.key}`}>
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-slate-700">
              市场结构洞察卡
              <span className="text-[10px] font-normal text-orange-500">
                {applied.category} · {applied.timeRange}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
              {[
                { l: '当前概率', v: scenario.probability, s: `YES · ${applied.platform.split(',')[0]}`, c: 'text-slate-900' },
                { l: '24h 变幅', v: scenario.change24h, s: scenario.change24h, c: scenario.change24h.startsWith('+') ? 'text-emerald-600' : 'text-red-500' },
                { l: '成交量', v: scenario.volume, s: applied.timeRange, c: 'text-slate-900' },
                { l: '流动性', v: scenario.liquidity, s: applied.risk, c: 'text-slate-900' },
                { l: '最大地址集中度', v: scenario.concentration, s: applied.risk, c: 'text-amber-600' },
                { l: '价差异常', v: scenario.spread, s: '跨平台', c: 'text-emerald-600' },
              ].map((k) => (
                <div key={k.l} className="rounded-lg bg-slate-50 p-2">
                  <div className="text-[10px] text-slate-400">{k.l}</div>
                  <div className={`text-[15px] font-bold ${k.c}`}>{k.v}</div>
                  <div className="text-[10px] text-slate-400">{k.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">1 赔率趋势图</div>
              <DualLineChart
                data={scenario.odds}
                lines={[
                  { key: 'poly', color: '#f97316', name: 'Polymarket (YES)' },
                  { key: 'predict', color: '#3b82f6', name: 'Predict.fun (YES)' },
                ]}
                height={130}
              />
            </div>
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">2 成交量变化图</div>
              <SimpleBarChart
                data={scenario.volumeBars}
                bars={[
                  { key: 'poly', color: '#f97316', name: 'Polymarket' },
                  { key: 'predict', color: '#3b82f6', name: 'Predict.fun' },
                ]}
                height={130}
              />
            </div>
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">3 流动性 / 深度变化图</div>
              <DualLineChart
                data={liquidityTrend}
                lines={[
                  { key: 'liq', color: '#8b5cf6', name: '流动性 (USD)' },
                  { key: 'spread', color: '#f59e0b', name: '买卖价差 (%)' },
                ]}
                height={130}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="card p-2.5">
              <div className="mb-1 text-[11.5px] font-semibold">4 大户地址净买入图</div>
              <SimpleBarChart
                data={smartMoneyBars.map((d, i) => ({
                  name: String(i + 1),
                  net: Math.abs(d.net) / 1e6 * (d.net > 0 ? 1 : -1),
                }))}
                bars={[{ key: 'net', color: '#22c55e', name: '净买入 (USD)' }]}
                height={120}
              />
            </div>
            <div className="card p-2.5">
              <div className="mb-1 flex items-center justify-between text-[11.5px] font-semibold">
                5 市场情绪 / 新闻事件时间线
                <div className="flex gap-1 text-[9px] font-normal">
                  {['全部', '新闻', '社交媒体', '链上异动', '事件'].map((t, i) => (
                    <span key={t} className={`rounded px-1 py-0.5 ${i === 0 ? 'bg-orange-50 text-orange-600' : 'text-slate-400'}`}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {[
                  { t: 'May 18 14:32', d: '大户地址 0x8f3a…c2d4 增持 YES $1.24M', c: 'bg-blue-400' },
                  { t: 'May 18 11:07', d: 'Reuters: 美联储官员暗示降息可能性上升', c: 'bg-emerald-400' },
                  { t: 'May 17 22:51', d: 'Twitter (X) 讨论量激增 230%', c: 'bg-violet-400' },
                  { t: 'May 17 18:23', d: '大户地址 0x7ac1…9b12 减持 YES $2.31M', c: 'bg-red-400' },
                ].map((e) => (
                  <div key={e.t} className="flex gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${e.c}`} />
                    <div>
                      <span className="text-slate-400">{e.t}</span>
                      <p className="text-slate-700">{e.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-1 text-[11px] text-orange-500">查看完整时间线 →</button>
            </div>
            <div className="card p-2.5">
              <div className="mb-1 flex items-center justify-between text-[11.5px] font-semibold">
                6 AI 洞察摘要
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-normal text-emerald-600">
                  置信度：{scenario.confidence}
                </span>
              </div>
              <div className="mb-2 text-[12px] font-bold text-orange-600">Alpha 机会信号</div>
              <p className="text-[11px] leading-relaxed text-slate-600">{scenario.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {[applied.category, applied.eventType, applied.risk, '价差机会'].map((t) => (
                  <span key={t} className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] text-orange-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — scenario bound */}
        <aside className="space-y-3" key={`right-${scenario.key}`}>
          <div className="card-soft p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
              Top Market Watchlist
              <span className="text-[10px] font-normal text-orange-500">{applied.category}</span>
            </div>
            <div className="space-y-1.5">
              {scenario.watchlist.map((m) => (
                <div key={m.n + m.t} className="flex items-start gap-1.5 text-[11px]">
                  <span className="w-3 text-slate-400">{m.n}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-slate-700">{m.t}</div>
                    <div className="text-[9px] text-slate-400">{m.src}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{m.p}</div>
                    <div className={m.c.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}>{m.c}</div>
                  </div>
                  <Star size={11} className="mt-0.5 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
              Smart Money 活跃地址
              <span className="text-[10px] font-normal text-orange-500">{applied.risk}</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              {scenario.smartMoney.map((r) => (
                <div key={r[0]} className="flex items-center gap-2">
                  <span className="flex-1 font-mono text-slate-600">{r[0]}</span>
                  <span className="font-medium">{r[1]}</span>
                  <span className="w-8 text-right text-emerald-600">{r[2]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold">跨平台价差卡 (YES 价格)</div>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-slate-400">
                  <th className="py-1 text-left font-medium">市场</th>
                  <th className="py-1 text-right font-medium">价格</th>
                  <th className="py-1 text-right font-medium">价差</th>
                </tr>
              </thead>
              <tbody>
                {scenario.spreads.map((r) => (
                  <tr key={r[0]} className="border-t border-slate-50">
                    <td className="py-1.5 font-medium text-slate-700">{r[0]}</td>
                    <td className="py-1.5 text-right">{r[1]}</td>
                    <td
                      className={`py-1.5 text-right ${
                        r[2].startsWith('+')
                          ? 'text-emerald-600'
                          : r[2].startsWith('-')
                            ? 'text-red-500'
                            : 'text-slate-400'
                      }`}
                    >
                      {r[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 space-y-1 rounded-lg bg-amber-50/60 p-2 text-[10.5px] text-amber-800">
              <div className="font-semibold">风险提示</div>
              <div>⚠ 流动性警告：部分市场流动性低于 $100K，请谨慎交易</div>
              <div>⚠ 集中度风险：最大地址集中度 28.7%，高于历史均值</div>
              <div>⚠ 事件风险：事件受宏观政策影响大，波动可能加剧</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
