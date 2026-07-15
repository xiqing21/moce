# 坑点库（来自 MOCE 等真实项目）

## 1. 贴画看不见

- **因**：`xl:block`、absolute + overflow、不在文档流  
- **解**：Grid 三栏 + ≥1024 + 垂直居中 + opacity 0.4

## 2. 配置没反应

- **因**：state 未进数据层、标签格式不变  
- **解**：重算标签体系 + UI 展示点数/区间

## 3. 一改下拉就变

- **因**：applied 与 draft 未分离  
- **解**：应用按钮提交 draft

## 4. 详情只改标题

- **因**：硬编码右侧  
- **解**：`Record<id, Detail>` 全字段渲染

## 5. 深色无效

- **因**：未挂 html、未覆盖白卡片  
- **解**：`html.dark` + 全量 token 覆盖 + localStorage

## 6. 步骤假进度

- **因**：同屏堆内容  
- **解**：`step` 控制独立视图

## 7. 按钮 noop

- **因**：静态还原心态  
- **解**：每控件至少 navigate / toast / download

## 8. Vercel SPA 404

- **因**：无 rewrite  
- **解**：`rewrites: [{ source: "/(.*)", destination: "/index.html" }]`，output `dist`

## 9. 轮询太少

- **因**：2–3 帧来回  
- **解**：帧池 ≥6，每次 3 张错位取

## 10. 贴画抢焦点

- **因**：不透明、贴顶、卡片过大  
- **解**：低透明、居中、小卡堆叠
