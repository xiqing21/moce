---
name: prototype-to-interactive
description: >
  将产品原型图（PNG/JPG/Figma 导出）1:1 复刻为可交互 Web Mock（非静态截图站）。
  覆盖：逐屏分析 → 技术选型 → 布局贴画 → 全链路按钮/筛选/图表联动 → 深色模式 →
  文档与 Vercel/GitHub 发布。触发词：原型复刻、1:1 复刻、PRD-images、贴画、
  交互 Mock、图转页面、prototype to interactive、高保真演示站、/prototype-to-interactive。
---

# Prototype → Interactive Mock

把「设计稿/原型图」做成**可点可走的演示产品**。目标不是静态还原，而是：

1. 视觉对齐原型（布局、配色、图表、侧边贴画）
2. 每个按钮/下拉有反馈与业务逻辑（Mock 数据足够丰富）
3. 完整流程可串（多步向导、跨页面状态）

## When to use

- 用户给一批 `PRD-images/*.png` 或设计截图，要求「1:1 复刻」
- 要求「不只是原型图」「要能点」「要完整 Mock」
- 营销站 + 产品工作台混合演示（Insight / Agent / Alpha 类）

## Stack default（可改）

- **Bun + Vite + React + TypeScript + Tailwind v4 + React Router + Recharts + Lucide**
- 包管理优先 bun；部署 Vercel（`vercel.json` + SPA rewrite）

## Phase 0 — 分析（先做，再写码）

对每张原型图输出：

| 项 | 内容 |
|----|------|
| 页面名 / 路由 | 如 `/insight/query` |
| 主流程步骤 | 步骤条 id + 状态 |
| 布局 | 顶栏 / 侧栏 / 主区 / 浮动贴画 |
| 可交互控件 | 按钮、Tab、Select、表格行、节点 |
| 图表 | 类型、序列、需随配置变化的维度 |
| 跨页依赖 | 查询文案、选中节点、主题 |

汇总为路由表，再动手。

## Phase 1 — 骨架

1. 脚手架（Bun Vite React-TS + Tailwind）
2. `AppContext`：query、theme、toast、modal、业务草稿/已应用状态
3. `Layout`：Header + Outlet + Toast + Modal + Background
4. 路由表与底部/侧边 **全页导航**（方便验收 13 屏）

## Phase 2 — 视觉 1:1

- 主色 / 卡片 / 按钮样式对齐截图
- **背景**：网络粒子/光晕用 CSS+SVG 生成（无依赖设计源文件）
- **图表**：Recharts 封装；数值可用确定性 mock

### 侧边贴画（极易翻车 — 必读）

详见 [references/stickers.md](references/stickers.md)。

硬规则：

- **禁止** `hidden xl:block` + 纯 `absolute` 当唯一方案
- 用 **Grid 三栏**：`左贴画 | 主内容 | 右贴画`，`≥1024px` 显示侧栏
- 侧栏 **垂直居中**（`justify-content: center`）
- 默认 **opacity ~0.4**，hover 略升；贴画不抢主操作
- 多帧业务池轮询（≥6 帧），每次堆 2–3 张
- 窄屏：横向 strip 兜底

## Phase 3 — 交互完整性（核心）

### 3.1 每个控件必须有结果

| 控件 | 最低反馈 |
|------|----------|
| 导航/CTA | `navigate` 或打开真实流程页 |
| 次要按钮 | Toast + 可选 Modal / 下载 |
| 导出 | 真实下载 Blob（SVG/PDF/文本） |
| 步骤条 | 切换**不同内容**，禁止假高亮 |

### 3.2 Draft vs Applied（筛选/因子）

```
draft*  = 表单当前值（select 只改 draft）
applied = 驱动图表/KPI/表格
点「应用」→ setApplied(draft) → 数据才变
```

禁止：`useMemo` 直接依赖 select，导致「一改就变」。

### 3.3 配置驱动可见变化

图表 X 轴/粒度必须改变：

- **标签体系**（`MM-DD` / `第N周` / `HH:00`）
- **点数**
- 主图旁显示「点数 + 区间 + 配置版本」

不依赖 shadcn；关键是 mock 生成逻辑。

### 3.4 选择驱动详情字典

血缘/任务列表/资源树：

```ts
const DETAILS: Record<id, Detail>
// 点击 → getDetail(id) 渲染右侧全部字段，禁止只改标题
```

### 3.5 多步向导

- AIOps / 漏斗：`?step=n` **只渲染当前步** 的独立页面内容
- 上一步/下一步改 query，不是一屏堆六段

### 3.6 全局状态

- 查询文案跨页
- Toast / Modal
- 深色：`html.dark` + `localStorage`，并覆盖 card/文本/背景（见 [references/dark-mode.md](references/dark-mode.md)）

## Phase 4 — 验收清单

加载 [references/checklist.md](references/checklist.md) 逐项勾选。

最低标准：

- [ ] 所有主按钮可点且有路由或反馈
- [ ] 筛选/因子需「应用」才刷新
- [ ] 图表配置切换视觉可辨
- [ ] 列表/节点选中右侧全量更新
- [ ] 宽屏贴画可见、居中、半透明、在轮询
- [ ] 深色模式全局生效
- [ ] 多步流程每步内容不同

## Phase 5 — 交付

1. `docs/PRODUCT.md` 路由与交互约定  
2. `docs/PITFALLS.md` 项目级坑（可复制本 skill 的 pitfalls）  
3. 更新 README（本地 + 在线地址）  
4. Git commit/push  
5. `vercel --prod`（`vercel.json`：framework、dist、SPA rewrite）

## Anti-patterns（禁止）

| 禁止 | 原因 |
|------|------|
| 只还原视觉、按钮 noop | 用户会明确要求「每个按钮有效果」 |
| select 直接绑图表 | 违背「应用后才变」 |
| 配置改了标签不变 | 用户认为「没反应」 |
| `xl:block` 贴画 | 多数屏看不见 |
| 深色只改一个 class | 白卡片仍刺眼 |
| 步骤条假进度 | 流程演示失败 |

## 详细参考

- 贴画布局与轮询：[references/stickers.md](references/stickers.md)
- 深色模式：[references/dark-mode.md](references/dark-mode.md)
- 交互模式代码片段：[references/interaction-patterns.md](references/interaction-patterns.md)
- 验收清单：[references/checklist.md](references/checklist.md)
- 完整坑点库：[references/pitfalls.md](references/pitfalls.md)
