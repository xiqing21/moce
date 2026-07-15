export type NodeField = { name: string; type: string; desc: string }

export type NodeDetail = {
  type: string
  upstream: string
  downstream: string
  refresh: string
  pk: string
  owner: string
  status: string
  health: string
  fields: NodeField[]
  job: { k: string; v: string }[]
}

const defaultJob = (name: string, engine = 'Flink 1.18'): NodeDetail['job'] => [
  { k: 'Job Name', v: name },
  { k: 'DAG ID', v: `dag_${name.slice(0, 12)}_${Math.abs(hash(name) % 9000)}` },
  { k: 'Engine', v: engine },
  { k: 'Storage', v: engine.includes('StarRocks') ? 'StarRocks 3.3' : 'Fluss 0.6.0' },
  { k: 'Serving', v: 'StarRocks 3.3' },
  { k: 'SLA', v: '15m 延迟 / 99.9%' },
  { k: 'Checkpoint', v: '5m' },
  { k: 'Watermark', v: 'event_time + 5m' },
  { k: 'Join Strategy', v: 'Broadcast + Shuffle' },
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return h
}

export const NODE_DETAILS: Record<string, NodeDetail> = {
  metadata_catalog: {
    type: 'RAG / 元数据目录',
    upstream: '—',
    downstream: 'Agent Planner, Job Generator',
    refresh: '实时',
    pk: 'asset_id',
    owner: 'platform-meta',
    status: '健康',
    health: '100%',
    fields: [
      { name: 'asset_id', type: 'UUID', desc: '资产 ID' },
      { name: 'table_name', type: 'VARCHAR', desc: '表名' },
      { name: 'embedding', type: 'VECTOR', desc: '语义向量' },
      { name: 'layer', type: 'VARCHAR', desc: '数仓分层' },
    ],
    job: defaultJob('metadata_catalog_sync', 'PostgreSQL / Vector'),
  },
  cdc_wallet_txn_raw: {
    type: 'CDC 接入层',
    upstream: 'Kafka / Chain RPC',
    downstream: 'ods_arbitrum_protocol_metrics',
    refresh: '实时流',
    pk: 'tx_hash, log_index',
    owner: 'streaming-team',
    status: '运行中',
    health: '98%',
    fields: [
      { name: 'tx_hash', type: 'VARCHAR(66)', desc: '交易哈希' },
      { name: 'block_time', type: 'TIMESTAMP', desc: '出块时间' },
      { name: 'from_addr', type: 'VARCHAR(42)', desc: '发送地址' },
      { name: 'value_usd', type: 'DECIMAL', desc: '金额 USD' },
    ],
    job: defaultJob('cdc_wallet_txn_raw', 'Flink CDC'),
  },
  ods_arbitrum_protocol_metrics: {
    type: 'ODS 层（原始明细）',
    upstream: 'cdc_wallet_txn_raw',
    downstream: 'dwd_protocol_tvl_daily',
    refresh: '5 分钟',
    pk: 'dt, chain, protocol_id',
    owner: 'ods-owner',
    status: '运行中',
    health: '99%',
    fields: [
      { name: 'dt', type: 'DATE', desc: '业务日期' },
      { name: 'chain', type: 'VARCHAR', desc: '链' },
      { name: 'protocol_id', type: 'VARCHAR', desc: '协议 ID' },
      { name: 'raw_tvl', type: 'DECIMAL', desc: '原始 TVL' },
    ],
    job: defaultJob('ods_arbitrum_protocol_metrics'),
  },
  dwd_protocol_tvl_daily: {
    type: 'DWD 层（明细事实）',
    upstream: 'ods_arbitrum_protocol_metrics, dim_protocol',
    downstream: 'dws_l2_tvl_compare_30d',
    refresh: '15 分钟',
    pk: 'date, chain, protocol',
    owner: 'dwd-analyst',
    status: '运行中',
    health: '100%',
    fields: [
      { name: 'date', type: 'DATE', desc: '统计日期' },
      { name: 'chain', type: 'VARCHAR(16)', desc: '链名' },
      { name: 'protocol', type: 'VARCHAR(64)', desc: '协议' },
      { name: 'tvl_usd', type: 'DECIMAL(38,6)', desc: 'TVL USD' },
      { name: 'net_inflow_usd', type: 'DECIMAL', desc: '净流入' },
    ],
    job: defaultJob('dwd_protocol_tvl_daily'),
  },
  dim_date: {
    type: '维度表 · 日期',
    upstream: 'calendar seed',
    downstream: 'dwd_*, dws_*',
    refresh: '日批',
    pk: 'date_key',
    owner: 'dim-owner',
    status: '就绪',
    health: '100%',
    fields: [
      { name: 'date_key', type: 'DATE', desc: '日期主键' },
      { name: 'week_id', type: 'INT', desc: '周序号' },
      { name: 'month_id', type: 'INT', desc: '月序号' },
      { name: 'is_weekend', type: 'BOOLEAN', desc: '是否周末' },
    ],
    job: defaultJob('dim_date_build', 'Batch'),
  },
  dim_protocol: {
    type: '维度表 · 协议',
    upstream: 'metadata_catalog',
    downstream: 'dwd_protocol_tvl_daily',
    refresh: '1 小时',
    pk: 'protocol_id',
    owner: 'dim-owner',
    status: '就绪',
    health: '100%',
    fields: [
      { name: 'protocol_id', type: 'VARCHAR', desc: '协议 ID' },
      { name: 'protocol_name', type: 'VARCHAR', desc: '名称' },
      { name: 'category', type: 'VARCHAR', desc: '赛道' },
      { name: 'chain', type: 'VARCHAR', desc: '主链' },
    ],
    job: defaultJob('dim_protocol_sync', 'Batch'),
  },
  dws_l2_tvl_compare_30d: {
    type: 'DWS 层（汇总表）',
    upstream: 'dwd_protocol_tvl_daily',
    downstream: 'ads_l2_competition_summary',
    refresh: '15 分钟',
    pk: 'date, chain, protocol',
    owner: 'data-analyst',
    status: '运行中',
    health: '100%',
    fields: [
      { name: 'date', type: 'DATE', desc: '统计日期' },
      { name: 'chain', type: 'VARCHAR(16)', desc: '链名' },
      { name: 'protocol', type: 'VARCHAR(64)', desc: '协议名称' },
      { name: 'tvl_usd', type: 'DECIMAL(38,6)', desc: 'TVL (USD)' },
      { name: 'tvl_change_7d_usd', type: 'DECIMAL', desc: '7 日 TVL 变化' },
      { name: 'net_inflow_7d_usd', type: 'DECIMAL', desc: '7 日净流入' },
      { name: 'tvl_rank', type: 'INT', desc: 'TVL 排名' },
    ],
    job: defaultJob('dws_l2_tvl_compare_30d'),
  },
  dws_l2_tvl_history: {
    type: 'DWS 层（历史快照）',
    upstream: 'dws_l2_tvl_compare_30d',
    downstream: 'sr_l2_competition_dashboard',
    refresh: '日批',
    pk: 'snapshot_dt, chain',
    owner: 'dws-owner',
    status: '运行中',
    health: '99%',
    fields: [
      { name: 'snapshot_dt', type: 'DATE', desc: '快照日' },
      { name: 'chain', type: 'VARCHAR', desc: '链' },
      { name: 'tvl_usd', type: 'DECIMAL', desc: 'TVL' },
      { name: 'rank', type: 'INT', desc: '排名' },
    ],
    job: defaultJob('dws_l2_tvl_history'),
  },
  ads_l2_competition_summary: {
    type: 'ADS / Result 层',
    upstream: 'dws_l2_tvl_compare_30d',
    downstream: 'sr_l2_competition_dashboard',
    refresh: '15 分钟',
    pk: 'stat_date, chain',
    owner: 'ads-team',
    status: '运行中',
    health: '100%',
    fields: [
      { name: 'stat_date', type: 'DATE', desc: '统计日' },
      { name: 'chain', type: 'VARCHAR', desc: '链' },
      { name: 'tvl_usd', type: 'DECIMAL', desc: 'TVL' },
      { name: 'share_pct', type: 'DECIMAL', desc: '份额 %' },
      { name: 'net_inflow_usd', type: 'DECIMAL', desc: '净流入' },
    ],
    job: defaultJob('ads_l2_competition_summary', 'Paimon'),
  },
  sr_l2_competition_dashboard: {
    type: 'StarRocks Serving',
    upstream: 'ads_l2_competition_summary, dws_l2_tvl_history',
    downstream: 'BI / Insight 查询',
    refresh: '近实时 MV',
    pk: 'stat_date, chain',
    owner: 'serving-team',
    status: '已注册',
    health: '100%',
    fields: [
      { name: 'stat_date', type: 'DATE', desc: '日期' },
      { name: 'chain', type: 'VARCHAR', desc: '链' },
      { name: 'metric_json', type: 'JSON', desc: '看板指标包' },
      { name: 'updated_at', type: 'TIMESTAMP', desc: '更新时间' },
    ],
    job: defaultJob('sr_l2_competition_dashboard', 'StarRocks 3.3'),
  },
}

export function getNodeDetail(id: string): NodeDetail {
  return (
    NODE_DETAILS[id] ?? {
      type: '未知节点',
      upstream: '—',
      downstream: '—',
      refresh: '—',
      pk: '—',
      owner: 'unassigned',
      status: '未知',
      health: '—',
      fields: [{ name: 'id', type: 'STRING', desc: id }],
      job: defaultJob(id),
    }
  )
}
