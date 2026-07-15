/** Shared mock data matching prototype screens */

export const tvlSpark = Array.from({ length: 20 }, (_, i) => ({
  v: 40 + Math.sin(i / 2.2) * 8 + i * 1.8 + (i > 15 ? (i - 15) * 3 : 0),
}))

export const volumeSpark = Array.from({ length: 24 }, (_, i) => ({
  v: 30 + Math.sin(i / 1.8) * 10 + i * 0.9 + (i % 5 === 0 ? 6 : 0),
}))

export const oddsSpark = Array.from({ length: 18 }, (_, i) => 45 + Math.sin(i / 2) * 12 + i * 1.1)

export const tvlTopChains = [
  { name: 'Arbitrum', value: 18.35, change: '18.35%', color: '#3b82f6' },
  { name: 'Base', value: 12.41, change: '12.41%', color: '#2563eb' },
  { name: 'Optimism', value: 9.23, change: '9.23%', color: '#ef4444' },
  { name: 'Solana', value: 7.58, change: '7.58%', color: '#a855f7' },
  { name: 'Avalanche', value: 6.11, change: '6.11%', color: '#e11d48' },
]

export const tokenInflow = [
  { rank: 1, token: 'USDC', amount: '$126.45M', color: '#3b82f6' },
  { rank: 2, token: 'WETH', amount: '$72.31M', color: '#64748b' },
  { rank: 3, token: 'ARB', amount: '$45.68M', color: '#3b82f6' },
  { rank: 4, token: 'GMX', amount: '$23.14M', color: '#a855f7' },
  { rank: 5, token: 'RDNT', amount: '$18.72M', color: '#06b6d4' },
]

export const dailyResults = [
  { date: '2025-05-12', arbTvl: '$2.18B', opTvl: '$0.84B', arbFlow: '+$8.7M', opFlow: '-$2.1M' },
  { date: '2025-05-13', arbTvl: '$2.22B', opTvl: '$0.86B', arbFlow: '+$9.3M', opFlow: '-$1.8M' },
  { date: '2025-05-14', arbTvl: '$2.27B', opTvl: '$0.87B', arbFlow: '+$10.1M', opFlow: '-$2.4M' },
  { date: '2025-05-15', arbTvl: '$2.31B', opTvl: '$0.88B', arbFlow: '+$11.4M', opFlow: '-$2.9M' },
  { date: '2025-05-16', arbTvl: '$2.35B', opTvl: '$0.90B', arbFlow: '+$11.9M', opFlow: '-$2.7M' },
  { date: '2025-05-17', arbTvl: '$2.41B', opTvl: '$0.90B', arbFlow: '+$13.2M', opFlow: '-$3.1M' },
  { date: '2025-05-18', arbTvl: '$2.47B', opTvl: '$0.91B', arbFlow: '+$12.6M', opFlow: '-$3.2M' },
]

export const multiMetricTrend = [
  { date: '05-12', arbTvl: 2.18, opTvl: 0.84, arbFlow: 8.7, opFlow: -2.1 },
  { date: '05-13', arbTvl: 2.22, opTvl: 0.86, arbFlow: 9.3, opFlow: -1.8 },
  { date: '05-14', arbTvl: 2.27, opTvl: 0.87, arbFlow: 10.1, opFlow: -2.4 },
  { date: '05-15', arbTvl: 2.31, opTvl: 0.88, arbFlow: 11.4, opFlow: -2.9 },
  { date: '05-16', arbTvl: 2.35, opTvl: 0.9, arbFlow: 11.9, opFlow: -2.7 },
  { date: '05-17', arbTvl: 2.41, opTvl: 0.9, arbFlow: 13.2, opFlow: -3.1 },
  { date: '05-18', arbTvl: 2.47, opTvl: 0.91, arbFlow: 12.6, opFlow: -3.2 },
]

export const tvlCompare30d = Array.from({ length: 30 }, (_, i) => {
  const d = 19 + i
  const month = d <= 30 ? '04' : '05'
  const day = d <= 30 ? d : d - 30
  return {
    date: `${month}-${String(day).padStart(2, '0')}`,
    arb: 1.9 + i * 0.02 + Math.sin(i / 4) * 0.08,
    op: 0.75 + i * 0.006 + Math.sin(i / 5) * 0.04,
  }
})

export const tvlDelta = Array.from({ length: 30 }, (_, i) => {
  const d = 19 + i
  const month = d <= 30 ? '04' : '05'
  const day = d <= 30 ? d : d - 30
  return {
    date: `${month}-${String(day).padStart(2, '0')}`,
    arb: 20 + Math.sin(i / 2) * 35 + (i % 3) * 8,
    op: -10 - Math.sin(i / 2.5) * 20 - (i % 4) * 4,
  }
})

export const oddsTrend = Array.from({ length: 14 }, (_, i) => ({
  date: `May ${12 + Math.floor(i / 2)}`,
  poly: 48 + i * 1.2 + Math.sin(i / 2) * 4,
  predict: 42 + i * 1.6 + Math.cos(i / 2.5) * 5,
}))

export const volumeBars = Array.from({ length: 7 }, (_, i) => ({
  name: `May ${12 + i}`,
  poly: 2.1 + Math.random() * 2,
  predict: 1.2 + Math.random() * 1.5,
}))

export const liquidityTrend = Array.from({ length: 14 }, (_, i) => ({
  date: `M${12 + Math.floor(i / 2)}`,
  liq: 4 + Math.sin(i / 2) * 2 + i * 0.15,
  spread: 1.2 + Math.cos(i / 3) * 0.8,
}))

export const smartMoneyBars = Array.from({ length: 14 }, (_, i) => ({
  date: `M${12 + Math.floor(i / 2)}`,
  net: (Math.sin(i / 1.8) * 1.5 + (i % 3 === 0 ? 0.8 : -0.3)) * 1e6,
}))

export const equityCurve = Array.from({ length: 40 }, (_, i) => ({
  date: i < 10 ? `May` : i < 20 ? `Jul` : i < 30 ? `Nov` : `Mar`,
  strategy: -5 + i * 2.9 + Math.sin(i / 3) * 8,
  btc: -2 + i * 1.1 + Math.sin(i / 4) * 6,
  eth: -8 + i * 0.9 + Math.cos(i / 3) * 7,
  equal: -4 + i * 0.7 + Math.sin(i / 5) * 5,
}))

export const drawdownCurve = Array.from({ length: 40 }, (_, i) => ({
  date: i < 10 ? `May` : i < 20 ? `Jul` : i < 30 ? `Nov` : `Mar`,
  strategy: -Math.abs(Math.sin(i / 5) * 13),
  btc: -Math.abs(Math.sin(i / 4) * 22),
  eth: -Math.abs(Math.cos(i / 5) * 28),
  equal: -Math.abs(Math.sin(i / 6) * 32),
}))

export const factorBuckets = [
  { name: '1', ret: -0.68, win: 42 },
  { name: '2', ret: 0.35, win: 48 },
  { name: '3', ret: 1.24, win: 55 },
  { name: '4', ret: 2.58, win: 63 },
  { name: '5', ret: 4.32, win: 72 },
]

export const metricSparks = {
  cpu: [40, 45, 50, 55, 62, 70, 78, 82, 86, 84, 86],
  mem: [50, 52, 55, 58, 60, 65, 70, 74, 76, 78, 78],
  ckpt: [40, 50, 60, 80, 100, 140, 180, 200, 220, 240, 245],
  lag: [5, 6, 8, 10, 12, 15, 18, 22, 28, 30, 32],
  bp: [30, 35, 40, 50, 55, 60, 70, 75, 80, 85, 89],
  thr: [14, 13.5, 13, 12.8, 12.5, 12.2, 12.0, 12.1, 12.3, 12.4, 12.3],
}
