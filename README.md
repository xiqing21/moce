# MOCE — Ask. Analyze. Discover.

Web3 数据智能产品 **高保真交互原型**（基于 `PRD-images/` 13 张设计稿 1:1 复刻 + 全链路 Mock）。

## 在线预览

**https://web-hazel-eta-26.vercel.app**

（部署后若域名变更，以 Vercel 控制台为准。）

## 本地开发

```bash
cd web
bun install
bun dev
```

默认：http://localhost:5173  

```bash
bun run build    # 生产构建
cd web && vercel --prod   # 部署到 Vercel
```

## 仓库结构

```
moce/
├── PRD-images/          # 原型图 1.png … 13.png
├── docs/
│   ├── PRODUCT.md       # 产品与交互说明
│   └── PITFALLS.md      # 踩坑总结（贴画/深色/配置联动等）
├── web/                 # Bun + Vite + React 应用
│   ├── src/
│   │   ├── pages/       # 各业务页
│   │   ├── components/  # 布局、图表、贴画、动效
│   │   ├── data/        # Mock 与 scenario
│   │   └── context/     # 全局状态（主题、Toast 等）
│   └── vercel.json
└── README.md
```

## 产品线一览

| 模块 | 路径 | 能力 |
|------|------|------|
| 产品矩阵 | `/` | 三层能力总览 + 图1 侧边贴画轮询 |
| MOCE Insight | `/insight` … | 自然语言 → 可行性 → SQL → 图表 → 报告 |
| Data Agent | `/data-agent/*` | 需求接收 → 规划 → Job/血缘 → 分层 → 发布 → AIOps |
| MOCE Alpha | `/alpha` | 预测市场情报 + 筛选应用后刷新 |
| Strategy Lab | `/alpha/strategy` | 因子/参数草稿，**应用后**刷新回测 |
| 定价 | `/pricing` `/compare` | 套餐与功能矩阵 |

底部导航可快速切换全部演示页。

## 关键交互约定

- **贴画**：≥1024px 三栏布局，垂直居中、低透明度，不抢主操作。  
- **深色模式**：顶栏 ☀/🌙，写入 `html.dark` + `localStorage`。  
- **筛选/因子**：改下拉 ≠ 改数据；需点「应用」。  
- **图表配置**：日/周/小时会换 X 轴标签与点数。  
- **血缘节点**：点击后右侧详情全量联动。

## 技术栈

- **Bun** · **Vite** · **React 19** · **TypeScript**  
- **Tailwind CSS v4** · **Recharts** · **React Router** · **Lucide**

## 文档

- [产品与路由说明](./docs/PRODUCT.md)  
- [坑点与经验总结](./docs/PITFALLS.md)  
- [为何视觉最像原型（识图 ≠ 保真复刻）](./docs/VISUAL-FIDELITY.md)  
- [Web 子项目说明](./web/README.md)  
- **可复用 Skill**：`prototype-to-interactive`（用户级 `~/.agents/skills/prototype-to-interactive-1.0.0/`，本仓库 `.grok/skills/prototype-to-interactive/`）  
  - 触发：原型复刻、1:1 复刻、贴画、交互 Mock、`/prototype-to-interactive`

## GitHub

https://github.com/xiqing21/moce
