# 交互模式速查

## Draft / Applied

```tsx
const [draftFilters, setDraftFilters] = useState(initial)
const [applied, setApplied] = useState(initial)

const data = useMemo(() => buildMock(applied), [applied])

// select → setDraftFilters only
// button 应用 → setApplied(draftFilters) + toast
```

## 图表配置可见变化

```ts
function buildSeries(grain: string, xAxis: string) {
  if (grain.includes('小时')) return hours.map(h => ({ date: `${h}:00`, ... }))
  if (grain.includes('周') || xAxis.includes('周')) return weeks.map((w,i) => ({ date: `第${i+1}周`, ... }))
  return days.map(d => ({ date: d.mmdd, ... }))
}
// UI: 显示 `粒度 · N 个点 · first → last · 配置 vK`
```

## 节点详情字典

```ts
export const NODE_DETAILS: Record<string, NodeDetail> = { ... }
export function getNodeDetail(id: string) {
  return NODE_DETAILS[id] ?? defaultDetail(id)
}
// 点击: setSelected(id); 右侧全部用 getNodeDetail(selected)
```

## 多步独立内容

```tsx
const step = Number(searchParams.get('step') || 1)
{step === 1 && <StepDetect />}
{step === 2 && <StepRootCause />}
// ...
```

## 导出

```ts
function downloadBlob(name: string, content: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }))
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click(); URL.revokeObjectURL(url)
}
```

## Toast

任何次要操作至少：`toast('已…', 'success' | 'info')`
