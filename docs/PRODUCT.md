# MOCE 产品说明与交互文档

## 产品定位

**MOCE**（Ask. Analyze. Discover.）是 Web3 数据智能品牌，三条产品线：

| 层 | 名称 | 能力 |
|----|------|------|
| Insight | 自然语言分析 | 提问 → 可行性 → SQL → 图表 → 智能报告 |
| Data Agent | 数据生产 | 需求卡 → 规划 → NL to Job → 分层 → 发布 → AIOps |
| Alpha | 市场与策略 | 预测市场情报 + Strategy / Quant Lab |

## 页面地图

| 路由 | 说明 |
|------|------|
| `/` | 产品矩阵（图1） |
| `/insight` | Insight 入口（图2） |
| `/insight/feasibility` | 智能理解与可行性 |
| `/insight/query` | 查询执行与结果 |
| `/insight/charts` | NL to Chart |
| `/insight/report` | 智能总结报告 |
| `/data-request` | 数据需求卡 |
| `/data-agent/intake` … `/deploy` | Data Agent 全流程 |
| `/data-agent/aiops?step=1..6` | AIOps 六步独立页 |
| `/alpha` | Prediction Market |
| `/alpha/strategy` | Quant Research Lab |
| `/pricing` `/compare` | 定价与对比 |
| `/docs` | 文档中心 |

## 关键交互约定

1. **筛选 / 因子 / 参数**  
   下拉只改「草稿」；点 **应用筛选并分析** / **应用参数并刷新数据** 后才刷新图表与 KPI。

2. **图表配置**  
   X 轴 / 粒度切换会重算序列：天=`MM-DD`、周=`第N周`、小时=`HH:00`。

3. **血缘**  
   点击 DAG 节点 → 右侧详情与 Job Spec 全量切换。

4. **AIOps**  
   六个步骤为独立内容屏，不是一页堆叠。

5. **贴画（图1 / 图2）**  
   ≥1024px 三栏布局；侧栏垂直居中、低透明度（~0.42），不抢中间主操作；多帧轮询。

6. **深色模式**  
   顶栏 ☀/🌙；状态写入 `localStorage`（`moce-theme`）与 `html.dark`。

## 技术栈

- Bun + Vite + React 19 + TypeScript  
- Tailwind CSS v4  
- Recharts、React Router、Lucide  

## 本地与部署

```bash
cd web && bun install && bun dev
cd web && bun run build
cd web && vercel --prod
```

线上：见根目录 README 当前 Vercel 地址。
