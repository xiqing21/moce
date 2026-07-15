# moce-web

MOCE 前端应用（Bun + Vite + React）。

## 脚本

| 命令 | 说明 |
|------|------|
| `bun install` | 安装依赖 |
| `bun dev` | 本地开发 |
| `bun run build` | 类型检查 + 生产构建 |
| `bun run preview` | 预览 dist |
| `vercel --prod` | 部署生产环境 |

## 目录要点

```
src/
  pages/                 # 业务页面
  components/
    effects/             # 贴画、背景动效
    layout/              # Header / Layout / 步骤导航
    charts/              # Recharts 封装
  data/                  # mock.ts / lineageNodes / alphaScenarios
  context/AppContext.tsx # 主题、Toast、查询状态
```

## 主题

- 类名：`html.dark`
- 存储：`localStorage.moce-theme = 'light' | 'dark'`

## SPA 部署

`vercel.json` 已配置 `outputDirectory: dist` 与 history fallback rewrite。
