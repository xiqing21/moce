# MOCE — Ask. Analyze. Discover.

Web3 数据分析平台 **MOCE** 产品原型 1:1 高保真复刻。

## 原型页面（13 屏）

| # | 路由 | 说明 |
|---|------|------|
| 01 | `/` | 产品矩阵 — One Brand, Three Intelligence Layers |
| 02 | `/insight` | MOCE Insight 自然语言入口 |
| 03 | `/insight/feasibility` | 智能理解与可行性判断 |
| 04 | `/insight/query` | 查询执行与结果 |
| 05 | `/insight/charts` | NL to Chart 图表推荐 |
| 06 | `/insight/report` | 智能总结报告 (SCQA / MECE) |
| 07 | `/data-request` | 数据需求卡提交 |
| 08 | `/data-agent` | NL to Job & 数仓血缘 |
| 09 | `/data-agent/aiops` | Intelligent AIOps |
| 10 | `/alpha` | Prediction Market Intelligence |
| 11 | `/alpha/strategy` | Strategy / Quant Research Lab |
| 12 | `/pricing` | 定价方案 |
| 13 | `/compare` | Compare Plans 功能对比 |

底部浮动导航可在 13 个原型页之间快速切换。

## 技术栈

- **Bun** — 包管理与脚本运行
- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**
- **Recharts** — 折线 / 柱状 / 面积 / 环形图
- **Lucide React** — 图标
- **React Router** — 路由

## 开发

```bash
cd web
bun install
bun dev
```

## 构建

```bash
bun run build
bun run preview
```

## 设计还原说明

- 背景：橙色粒子网络 / 星座连线 + 暖色径向光晕（CSS + SVG 生成）
- 配色：主色 `#f97316`，Data Agent 紫 `#8b5cf6`，卡片白底软阴影
- 图表：TVL 对比、净流入、赔率、回测收益/回撤、AIOps 指标 sparkline 等
- 布局：桌面端 1280px 内容宽，对齐 1672×941 原型比例
