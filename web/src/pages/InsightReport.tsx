import {
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Lightbulb,
  MessageSquare,
  Share2,
  Trophy,
} from 'lucide-react'
import { ProductTabs } from '../components/layout/ProductTabs'
import { StepBar } from '../components/ui/StepBar'
import { DonutChart, SimpleBarChart, SparkArea } from '../components/charts/MiniCharts'
import { tvlSpark } from '../data/mock'

export function InsightReport() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="mb-3 mt-1 flex justify-center">
        <ProductTabs active="insight" />
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <StepBar
          steps={[
            { id: 1, label: '提问', status: 'done' },
            { id: 2, label: '理解问题', status: 'done' },
            { id: 3, label: '执行查询', status: 'done' },
            { id: 4, label: 'NL to Chart', status: 'done' },
            { id: 5, label: '智能总结报告', status: 'active' },
          ]}
        />
        <div className="flex flex-wrap gap-2">
          <button className="btn-outline !text-[11px] !py-1.5"><Download size={12} /> 导出 PDF</button>
          <button className="btn-outline !text-[11px] !py-1.5"><Share2 size={12} /> 分享报告</button>
          <button className="btn-outline !text-[11px] !py-1.5"><Copy size={12} /> 复制摘要</button>
          <button className="btn-primary !text-[11px] !py-1.5"><FileText size={12} /> 保存到报告库</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
        {/* Left */}
        <aside className="space-y-3">
          <div className="card-soft p-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-slate-700">
              <MessageSquare size={13} className="text-orange-500" /> 分析请求
            </div>
            <p className="text-[12px] leading-relaxed text-slate-600">
              生成过去 30 天 Arbitrum 与 Optimism 的 TVL 趋势及资金净流入分析报告
            </p>
            <div className="mt-2 text-[10px] text-slate-400">提交时间：2025-05-18 10:24</div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">SQL 结果摘要</div>
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between"><span className="text-blue-600">● Arbitrum TVL:</span><b>$2.47B</b></div>
              <div className="flex justify-between"><span className="text-slate-500">增长率:</span><span className="text-emerald-600 font-medium">+12.6%</span></div>
              <div className="flex justify-between"><span className="text-red-500">● Optimism TVL:</span><b>$0.91B</b></div>
              <div className="flex justify-between"><span className="text-slate-500">增长率:</span><span className="text-emerald-600 font-medium">+8.3%</span></div>
              <div className="flex justify-between border-t border-slate-100 pt-1.5"><span className="text-slate-500">合计 TVL:</span><b>$3.38B</b></div>
            </div>
          </div>

          <div className="card-soft p-3">
            <div className="mb-2 text-[12px] font-semibold text-slate-700">图表预览</div>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="rounded-lg border border-slate-100 p-1">
                <SparkArea data={tvlSpark} height={36} />
                <div className="text-center text-[9px] text-slate-400">趋势图</div>
              </div>
              <div className="rounded-lg border border-slate-100 p-1">
                <SimpleBarChart data={[{ name: 'A', v: 2 }, { name: 'O', v: 1 }]} bars={[{ key: 'v', color: '#3b82f6', name: '' }]} height={36} />
                <div className="text-center text-[9px] text-slate-400">柱状图</div>
              </div>
              <div className="rounded-lg border border-slate-100 p-1">
                <DonutChart data={[{ name: 'A', value: 73 }, { name: 'O', value: 27 }]} colors={['#3b82f6', '#ef4444']} height={36} />
                <div className="text-center text-[9px] text-slate-400">环形图</div>
              </div>
            </div>
          </div>

          <div className="card-soft p-3 text-[11.5px]">
            <div className="mb-1.5 font-semibold text-slate-700">数据范围</div>
            <div className="text-slate-500">时间范围：过去 30 天 (2025-04-18 – 2025-05-18)</div>
            <div className="mt-1 flex items-center gap-2 text-slate-600">
              链：
              <span className="rounded-full bg-blue-50 px-1.5 py-0.5 text-blue-600">Arbitrum</span>
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-red-500">Optimism</span>
            </div>
          </div>
        </aside>

        {/* Report body */}
        <div className="space-y-3">
          {/* SCQA */}
          <div className="card p-4">
            <div className="mb-3 text-[13px] font-bold text-slate-800">1 SCQA 开篇</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { t: 'S（情境）', d: 'Layer 2 竞争加剧，资本更偏向高效、低费、高流动性的网络生态。', icon: '◎' },
                { t: 'C（冲突）', d: 'Arbitrum 与 Optimism 谁更具规模优势、增长潜力与资金吸引力？', icon: '⚡' },
                { t: 'Q（问题）', d: '近 30 天两者在 TVL 规模、增长与资金净流入方面的表现如何？', icon: '?' },
                { t: 'A（答案预告）', d: 'Arbitrum 在规模、增长与资金流入方面全面领先 Optimism。', icon: '✓' },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5">
                  <div className="mb-1 text-[11px] font-semibold text-orange-600">{x.t}</div>
                  <p className="text-[11px] leading-relaxed text-slate-600">{x.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core conclusion */}
          <div className="card p-4">
            <div className="mb-2 text-[13px] font-bold text-slate-800">2 核心结论横幅</div>
            <div className="flex items-start gap-2 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3">
              <Trophy size={18} className="mt-0.5 shrink-0 text-orange-500" />
              <p className="text-[13.5px] font-semibold text-orange-800">
                Arbitrum 在规模、增长与资金流入方面领先 Optimism，是当前更具竞争优势的 Layer 2。
              </p>
            </div>
          </div>

          {/* Pyramid */}
          <div className="card p-4">
            <div className="mb-3 text-[13px] font-bold text-slate-800">3 金字塔主体（三大支撑论据）</div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                { title: '规模领先', d: 'Arbitrum TVL 是 Optimism 的 2.7 倍', a: '$2.47B', b: '$0.91B', sub: '占比 73.1% vs 26.9%' },
                { title: '增长更快', d: 'Arbitrum 增长率高于 Optimism 4.3 个百分点', a: '+12.6%', b: '+8.3%', sub: '30 天增长率' },
                { title: '资金净流入更强', d: 'Arbitrum 净流入为正，Optimism 净流出为负', a: '+$12.6M', b: '-$3.2M', sub: '30 天净流入' },
              ].map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-100 p-3">
                  <div className="mb-1 text-[12px] font-bold text-slate-800">{c.title}</div>
                  <p className="mb-2 text-[11px] text-slate-500">{c.d}</p>
                  <div className="flex items-baseline gap-2 text-[16px] font-extrabold">
                    <span className="text-slate-900">{c.a}</span>
                    <span className="text-[11px] font-medium text-slate-400">vs</span>
                    <span className="text-slate-500">{c.b}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MECE */}
          <div className="card p-4">
            <div className="mb-3 text-[13px] font-bold text-slate-800">4 MECE 数据拆解</div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 text-[11px]">
              {[
                {
                  title: '规模 (Scale)', color: 'border-blue-100',
                  rows: [['TVL', '$2.47B', '$0.91B', '+171%'], ['日均 TVL', '$2.31B', '$0.84B', '+175%'], ['峰值 TVL', '$2.61B', '$0.96B', '+172%']],
                },
                {
                  title: '增速 (Growth)', color: 'border-emerald-100',
                  rows: [['30 天增长率', '+12.6%', '+8.3%', '+4.3pp'], ['7 天增长率', '+3.1%', '+1.9%', '+1.2pp'], ['日均增速', '+0.42%', '+0.27%', '+0.15pp']],
                },
                {
                  title: '结构 (Structure)', color: 'border-violet-100',
                  rows: [['DeFi 占比', '78.4%', '71.2%', ''], ['稳定币占比', '14.7%', '18.3%', ''], ['头部协议占比', '61.2%', '53.6%', '']],
                },
                {
                  title: '成本 / 风险', color: 'border-amber-100',
                  rows: [['平均 Gas (USD)', '$0.11', '$0.08', ''], ['TPS (峰值)', '1,750', '1,050', ''], ['安全模型', 'Rollup', 'Rollup', '']],
                },
              ].map((block) => (
                <div key={block.title} className={`rounded-xl border ${block.color} overflow-hidden`}>
                  <div className="bg-slate-50 px-2 py-1.5 font-semibold text-slate-700">{block.title}</div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-slate-400">
                        <th className="px-2 py-1 text-left font-medium">指标</th>
                        <th className="px-1 py-1 text-right font-medium">Arb</th>
                        <th className="px-1 py-1 text-right font-medium">OP</th>
                        {block.rows[0][3] !== '' && <th className="px-1 py-1 text-right font-medium">对比</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((r) => (
                        <tr key={r[0]} className="border-t border-slate-50">
                          <td className="px-2 py-1 text-slate-500">{r[0]}</td>
                          <td className="px-1 py-1 text-right font-medium">{r[1]}</td>
                          <td className="px-1 py-1 text-right">{r[2]}</td>
                          {r[3] !== '' && <td className="px-1 py-1 text-right text-emerald-600">{r[3]}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

          {/* Insights + Actions */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
                <CheckCircle2 size={14} className="text-blue-500" /> 关键洞见
              </div>
              <ul className="space-y-2 text-[12px] text-slate-600">
                <li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-500" />Arbitrum 在 TVL 规模、增长率与资金净流入方面均显著领先，显示更强的资本吸引力与生态动能。</li>
                <li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-500" />Optimism 虽成本更低，但资金净流出表明短期资金偏好不足，生态活跃度相对承压。</li>
                <li className="flex gap-2"><CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-500" />Arbitrum 的 DeFi 占比与头部协议集中度更高，生态护城河更深，长期竞争优势更稳固。</li>
              </ul>
            </div>
            <div className="card p-4">
              <div className="mb-2 flex items-center gap-1.5 text-[13px] font-bold text-slate-800">
                <Lightbulb size={14} className="text-amber-500" /> 行动建议
              </div>
              <ul className="space-y-2 text-[12px] text-slate-600">
                <li><b className="text-orange-600">短期：</b>关注 Arbitrum 上资金持续流入的头部协议与新兴赛道机会。</li>
                <li><b className="text-orange-600">中期：</b>关注 Optimism 生态激励计划进展，择机布局潜在反弹机会。</li>
                <li><b className="text-orange-600">长期：</b>优先配置 Arbitrum 生态核心资产，跟踪 TVL 与资金流向变化。</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-400">
            数据来源：DeFiLlama, Dune Analytics, Nansen　|　数据更新：2025-05-18 10:24　|　报告生成：MOCE Insight
          </div>
        </div>
      </div>
    </div>
  )
}
