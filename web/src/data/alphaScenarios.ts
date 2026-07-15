/** Scenario packs so Alpha filters visibly refresh the whole page */

export type AlphaScenario = {
  key: string
  probability: string
  change24h: string
  volume: string
  liquidity: string
  concentration: string
  spread: string
  summary: string
  confidence: string
  watchlist: { n: number; t: string; p: string; c: string; src: string }[]
  smartMoney: [string, string, string][]
  spreads: [string, string, string][]
  odds: { date: string; poly: number; predict: number }[]
  volumeBars: { name: string; poly: number; predict: number }[]
}

function series(seed: number, base: number, len = 14) {
  return Array.from({ length: len }, (_, i) => ({
    date: `M${12 + Math.floor(i / 2)}`,
    poly: base + Math.sin((i + seed) / 2) * 6 + i * 0.8,
    predict: base - 4 + Math.cos((i + seed) / 2.5) * 5 + i * 1.1,
  }))
}

function bars(seed: number) {
  return Array.from({ length: 7 }, (_, i) => ({
    name: `May ${12 + i}`,
    poly: 1.5 + ((seed + i) % 5) * 0.4 + Math.random() * 0.3,
    predict: 1 + ((seed + i * 2) % 4) * 0.35,
  }))
}

export function resolveAlphaScenario(
  category: string,
  platform: string,
  timeRange: string,
  eventType: string,
  risk: string,
): AlphaScenario {
  const key = `${category}|${timeRange}|${eventType}|${risk}|${platform}`
  const timeMul = timeRange.includes('30') ? 1.4 : timeRange.includes('90') ? 1.8 : timeRange.includes('24') ? 0.5 : 1
  const riskMul = risk.includes('高') ? 1.25 : risk.includes('低') ? 0.85 : 1
  const catSeed =
    category.includes('政治') ? 3 : category.includes('体育') ? 7 : category.includes('科技') ? 11 : category.includes('宏观') ? 5 : 1

  const baseP = category.includes('政治')
    ? 48.2
    : category.includes('体育')
      ? 55.6
      : category.includes('科技')
        ? 41.3
        : 62.4

  const vol = (18.42 * timeMul * riskMul).toFixed(2)
  const liq = (6.73 * timeMul).toFixed(2)

  return {
    key,
    probability: `${(baseP * (platform.includes('Predict.fun') && !platform.includes('Polymarket') ? 1.05 : 1)).toFixed(1)}%`,
    change24h: risk.includes('高') ? '+5.84%' : category.includes('政治') ? '-1.12%' : '+3.21%',
    volume: `$${vol}M`,
    liquidity: `$${liq}M`,
    concentration: risk.includes('高') ? '41.2%' : risk.includes('低') ? '18.5%' : '28.7%',
    spread: platform.includes('Augur') ? '+4.80%' : '+2.14%',
    confidence: risk.includes('高') ? '61%' : '78%',
    summary: category.includes('政治')
      ? `【${category} · ${timeRange}】赔率波动加大，事件类型「${eventType}」下 Smart Money 净流入分化；${platform.split(',')[0]} 与竞品存在可交易价差，风险等级「${risk}」。`
      : category.includes('体育')
        ? `【体育赛季】${timeRange} 成交量放大 ${vol}M，大户在 YES 侧布局，关注开赛前 24h 流动性枯竭风险。`
        : `过去筛选窗口内 YES 概率约 ${(baseP).toFixed(1)}%，成交量 $${vol}M，主要驱动：${eventType} + ${risk}。平台 ${platform.split(',')[0]} 流动性相对充裕。`,
    watchlist: category.includes('政治')
      ? [
          { n: 1, t: '美国大选共和党胜出？', p: '51.2%', c: '+2.10%', src: 'Polymarket' },
          { n: 2, t: '美联储 6 月降息？', p: '38.4%', c: '-1.50%', src: 'Predict.fun' },
          { n: 3, t: '国会通过预算案？', p: '44.0%', c: '+0.80%', src: 'Polymarket' },
          { n: 4, t: '关键州翻盘？', p: '29.1%', c: '-0.40%', src: 'Augur' },
          { n: 5, t: '弹劾相关议案？', p: '12.6%', c: '+1.20%', src: 'Polymarket' },
        ]
      : category.includes('体育')
        ? [
            { n: 1, t: '湖人进入总决赛？', p: '34.5%', c: '+4.20%', src: 'Polymarket' },
            { n: 2, t: '皇马夺欧冠？', p: '28.0%', c: '-0.90%', src: 'Predict.fun' },
            { n: 3, t: 'C 罗赛季进球>20？', p: '61.3%', c: '+1.10%', src: 'Polymarket' },
            { n: 4, t: '某队降级？', p: '19.8%', c: '-2.00%', src: 'Augur' },
            { n: 5, t: 'MVP 花落谁家？', p: '22.4%', c: '+0.50%', src: 'Polymarket' },
          ]
        : [
            { n: 1, t: '美联储是否在 6 月降息？', p: '62.4%', c: '+3.21%', src: 'Polymarket' },
            { n: 2, t: 'ETH 是否在 7 月突破 $4000？', p: '54.7%', c: '-1.12%', src: 'Predict.fun' },
            { n: 3, t: '比特币本月收盘价 > $70K？', p: '48.3%', c: '+0.84%', src: 'Polymarket' },
            { n: 4, t: '美国大选共和党胜出？', p: '35.6%', c: '-2.43%', src: 'Predict.fun' },
            { n: 5, t: 'SOL ETF 今年获批？', p: '28.9%', c: '+1.02%', src: 'Polymarket' },
          ],
    smartMoney:
      risk.includes('高')
        ? [
            ['0xaa11…ff01', '$4.12M', '72%'],
            ['0xbb22…ee02', '$3.01M', '69%'],
            ['0xcc33…dd03', '$2.44M', '65%'],
            ['0xdd44…cc04', '$1.90M', '61%'],
            ['0xee55…bb05', '$1.55M', '58%'],
          ]
        : [
            ['0x8f3a…c2d4', '$2.74M', '68%'],
            ['0x7ac1…9b12', '$1.86M', '64%'],
            ['0x5d2e…af33', '$1.23M', '61%'],
            ['0xaf90…3e11', '$967K', '59%'],
            ['0x9b7c…1cde', '$812K', '58%'],
          ],
    spreads: platform.includes('Augur')
      ? [
          ['Polymarket', '60.1%', '—'],
          ['Predict.fun', '63.4%', '+3.3%'],
          ['Augur', '58.0%', '-2.1%'],
        ]
      : [
          ['Polymarket', `${baseP.toFixed(1)}%`, '—'],
          ['Predict.fun', `${(baseP + 3.4).toFixed(1)}%`, '+3.4%'],
          ['Augur', `${(baseP - 2.3).toFixed(1)}%`, '-2.3%'],
        ],
    odds: series(catSeed, baseP * 0.7, timeRange.includes('30') ? 20 : 14).map((d) => ({
      date: d.date,
      poly: d.poly,
      predict: d.predict,
    })),
    volumeBars: bars(catSeed).map((b) => ({
      ...b,
      poly: b.poly * timeMul,
      predict: b.predict * timeMul,
    })),
  }
}

export type StrategyScenario = {
  totalReturn: string
  annReturn: string
  maxDd: string
  sharpe: string
  winRate: string
  plRatio: string
  samples: number
  equityScale: number
  conclusion: string[]
}

export function resolveStrategyScenario(
  universe: string,
  horizon: string,
  method: string,
  factors: string,
): StrategyScenario {
  const hMul = horizon.includes('30') ? 1.5 : horizon.includes('14') ? 1.25 : horizon.includes('3') ? 0.7 : 1
  const uMul = universe.includes('50') ? 1.15 : universe.includes('L2') ? 1.3 : universe.includes('Blue') ? 0.9 : 1
  const mMul = method.includes('Walk') ? 0.95 : method.includes('蒙特') ? 1.1 : 1
  const scale = hMul * uMul * mMul
  const samples = Math.round(2842 * (universe.includes('50') ? 0.4 : universe.includes('L2') ? 0.55 : 1))

  return {
    totalReturn: `+${(112.35 * scale).toFixed(2)}%`,
    annReturn: `+${(68.27 * scale).toFixed(2)}%`,
    maxDd: `-${(13.27 * (2 - scale * 0.3)).toFixed(2)}%`,
    sharpe: (1.72 * scale * 0.9).toFixed(2),
    winRate: `${(62.41 * Math.min(scale, 1.15)).toFixed(2)}%`,
    plRatio: (2.48 * scale * 0.85).toFixed(2),
    samples,
    equityScale: scale,
    conclusion: [
      `研究对象「${universe}」、窗口「${horizon}」、方式「${method}」下，策略显著优于基准。`,
      `因子集合「${factors.slice(0, 24)}…」分层单调，高分组优势明显。`,
      `样本事件 ${samples} 个，信息比率约 ${(1.72 * scale * 0.9).toFixed(2)}。`,
      scale > 1.2
        ? '高波动窗口收益抬升，注意回撤与流动性风险。'
        : '收益稳健，适合作为监控模板持续跟踪。',
    ],
  }
}
