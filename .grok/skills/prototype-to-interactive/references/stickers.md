# 侧边贴画（图1 / 图2 装饰层）

原型营销页常见左右「业务卡片」：TVL、Query Result、Token 榜、Ask a Question、Lineage 等。

## 目标

- 还原酷炫氛围
- **不遮挡、不抢**中间主功能
- 宽屏可见、窄屏有兜底

## 推荐布局

```html
<div class="hero-with-stickers">
  <aside class="sticker-col">…左…</aside>
  <div class="hero-center">…主内容…</div>
  <aside class="sticker-col">…右…</aside>
</div>
```

```css
.hero-with-stickers {
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  min-height: 640px;
}
@media (min-width: 1024px) {
  .hero-with-stickers {
    grid-template-columns: 220px minmax(0, 1fr) 230px;
  }
  .sticker-col {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中，别贴顶 */
    opacity: 0.42;           /* 低透明 */
  }
  .sticker-col:hover { opacity: 0.62; }
}
```

## 轮询

- 业务帧池 ≥ 6（多链 TVL、多 Query、Odds、Whale、协议收入…）
- 每次展示 2–3 张堆叠
- 3.5–4.5s 整体换一组 + 淡入淡出
- 可点：跳对应功能页或 Toast

## 禁止

- `hidden xl:block` 作为唯一可见策略
- 仅 absolute 飘在 `max-w` 容器外又被 overflow 裁掉
- 不透明度 1.0 的大卡挡住主 CTA
