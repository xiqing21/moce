# 深色模式

## 正确做法

1. 状态：`dark: boolean`，初始化读 `localStorage.moce-theme`
2. `useEffect` 同步：

```ts
document.documentElement.classList.toggle('dark', dark)
document.documentElement.dataset.theme = dark ? 'dark' : 'light'
localStorage.setItem('moce-theme', dark ? 'dark' : 'light')
```

3. CSS 用 **`html.dark`** 选择器覆盖：

- `.card` / `.card-soft` 背景与边框
- `text-slate-*` 亮色覆盖
- `bg-white` / `bg-slate-50` / `bg-orange-50` 等浅色底
- `input/select/textarea`、表格、`code-block`
- 背景层 `.bg-base` / `.bg-warm`

## 错误做法

- 只在中间 div 加 `class="dark-mode"` 且几乎无样式
- 只改 body 文字颜色，卡片仍纯白
- 不持久化，刷新丢失
