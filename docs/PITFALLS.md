# 坑点与经验总结（MOCE 原型复刻）

本文记录实现过程中踩过的坑，方便后续维护。

---

## 1. 左右贴画「看不见」

### 现象
图1 / 图2 原型有侧边业务卡，实现后用户反馈完全看不到。

### 根因
- 使用了 `hidden xl:block`：视口 &lt; 1280px 直接不渲染。
- `position: absolute` 贴在容器边缘，配合 `overflow-x-hidden` 容易被裁切。
- 贴画和主内容没有排进同一布局流，z-index / 定位不可控。

### 解法
- 改用 **CSS Grid 三栏**：`左贴画 | 主内容 | 右贴画`。
- 断点降到 **`min-width: 1024px`** 显示侧栏。
- 侧栏 `display: flex; justify-content: center` **垂直居中**。
- 整体 **opacity ≈ 0.42**，hover 略提高，避免抢中间功能区注意力。
- 窄屏用底部横向 `sticker-mobile-strip` 兜底。

---

## 2. 配置改了图表「没反应」

### 现象
X 轴选「周 / 天」、时间粒度切换后，主图看起来一样。

### 根因
- `xAxis` 状态未参与数据生成。
- 「按天」与默认日粒度相同，视觉无变化。
- 「按周」只是 `filter` 抽点，标签仍是 `04-19` 这种日期格式。

### 解法
- 按粒度生成 **不同标签体系**：`第N周` / `HH:00` / `MM-DD`。
- 主图标题展示 **点数 + 标签区间 + 配置版本号**，让变化可见。
- **不需要 shadcn** 才能有效果；关键是 Mock 数据要跟着变。

---

## 3. 下拉一改数据就变（不符合预期）

### 现象
用户希望：先选因子 / 筛选条件，**点应用后**再刷新。

### 根因
`useMemo` 直接依赖 select 的 state，选项一变立即重算。

### 解法
- **draft\***（表单）与 **applied**（驱动图表）两套状态。
- 仅在「应用筛选并分析」「应用参数并刷新数据」时 `setApplied(draft)`。

涉及：`/alpha`、`/alpha/strategy`。

---

## 4. 血缘点节点右侧不更新

### 现象
只换了节点标题，字段表 / 上下游 / Job Spec 写死。

### 解法
- `data/lineageNodes.ts` 维护 `NODE_DETAILS` 字典。
- 选中节点 → `getNodeDetail(id)` 渲染右侧与 Job Spec。

---

## 5. 深色模式无效

### 现象
点月亮图标几乎没变化。

### 根因
- 只在内层 div 加 `dark-mode`，样式几乎未写。
- 卡片颜色大量写死 `bg-white` / `text-slate-900`。
- 未挂到 `html`，`body` 背景不受控。

### 解法
- `toggleDark` 同步 `document.documentElement.classList`（`html.dark`）。
- `localStorage['moce-theme']` 持久化。
- 在 `index.css` 用 `html.dark …` 覆盖 card / 文本 / 输入框 / 表格 / 背景层。

---

## 6. AIOps 六步「挤在一页」

### 现象
步骤条能点，但内容仍像同一屏。

### 解法
- `?step=1..6` 控制 **只渲染当前步** 的独立 `StepShell` 内容。
- 上一步 / 下一步真正换路由 query。

---

## 7. Vercel 部署

### 注意
- Vite 项目根在 `web/`，需 `vercel.json` 指定 `framework`、`outputDirectory: dist`。
- SPA 需 rewrite：`/(.*) → /index.html`。
- 部署命令：`cd web && vercel --prod`（已登录 CLI）。

---

## 8. 贴画轮询太少

### 现象
Insight 左右来回就 2～3 套。

### 解法
- 左：多链 TVL、交易量、活跃地址、Gas 等 **8+ 帧** 池。
- 右：多链 Query/榜单、Odds、Whale、协议收入等 **7+ 帧** 池。
- 每次展示 3 张堆叠，按间隔整体轮换。

---

## 检查清单（发版前）

- [ ] 宽屏 ≥1024 看 `/` 与 `/insight` 左右贴画是否居中、半透明  
- [ ] 深色模式切换后卡片/背景/文字是否统一变暗  
- [ ] Alpha 改下拉 → 点应用才变数  
- [ ] Charts 切换周/小时标签是否变化  
- [ ] Lineage 点不同节点右侧是否全变  
- [ ] AIOps step 1–6 内容是否独立  
