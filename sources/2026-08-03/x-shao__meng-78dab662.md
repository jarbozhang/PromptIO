---
title: "[前端设计 Skills 分享] Make Interfaces Feel Better 把界面的\"高级感\"翻译成了一套可执行、可审查的量化细节规则，能系统地发现并修复那些单个不起眼、叠加起来却决定界面高级感的细节问题。 开源作者 @jakubkrehel \U0001F44D\U0001F3FB https://t.co/0wsIfQvISS 这个 Skill 的核心设计想法 细节复利："
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2083886399586222358'
date: 'Sun Aug 02 12:03:29 +0000 2026'
likes: 54
reposts: 14
replies: 19
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-08-03T11:13:37.146Z'
---
[前端设计 Skills 分享] Make Interfaces Feel Better

把界面的"高级感"翻译成了一套可执行、可审查的量化细节规则，能系统地发现并修复那些单个不起眼、叠加起来却决定界面高级感的细节问题。

开源作者 @jakubkrehel 👍🏻
https://t.co/0wsIfQvISS

这个 Skill 的核心设计想法
细节复利：优秀界面来自小细节的叠加，而非单一亮点。
融入既有体系：修复必须用项目现有的样式方案表达（Tailwind 项目就用 Tailwind），绝不为了润色引入第二套样式系统。
慢速审查法：在浏览器动画面板以 10% 速度重放动效，并遍历 hover/focus/active/loading/empty 所有状态——慢速下感觉不对的，就是全速下隐约出错的地方。

# Skill 的十九条原则（五大类）

1. 表面与布局（Surfaces）
· 同心圆角：外层圆角 = 内层圆角 + 内边距，嵌套圆角不匹配是最常见的"感觉不对"来源。
· 视觉对齐优先于几何对齐：图标按钮图标侧内边距减 2px、播放三角形右移、不对称图标直接修 SVG。
· 阴影表达层级、边框表达结构：仅为制造深度的边框应换成三层透明 box-shadow；分割线、选中/聚焦态保留边框。
· 图片描边：1px 低透明度内缩 outline，亮色模式用纯黑、暗色用纯白（oklch 10%），绝不用 slate/zinc 等带色调的近黑——会吸附底色显得脏。
· 最小点击区域：触屏 44×44px，密集桌面端至少 40×40px，可用伪元素扩展，但两个元素的热区永不重叠。

2. 动画（Animations）
· 可中断性：交互动画用 CSS transition（中途可转向），keyframes 只用于一次性序列。
· 入场拆分交错：低频入场按语义分块、约 100ms 交错；高频交互（行悬停、键入）绝不加动画。
· 退场弱于入场：小固定位移（如 translateY(-12px)），时长更短（150ms），均用 ease-out。
· 图标情境动画：固定参数——scale 0.25→1、opacity 0→1、blur 4px→0；spring 的 bounce 必须为 0；无动效库时双图标同 DOM 交叉淡入淡出。
· 按压缩放：固定 scale(0.96)，不低于 0.95；提供 static prop 关闭。
· 页面加载跳过动画：AnimatePresence 加 initial={false}，但要确认不破坏有意设计的入场。
· 动效克制：动效是预算不是装饰；动效不能是唯一反馈渠道，必须配静态提示（颜色/图标/文字）。

3. 排版（Typography）
· text-wrap: balance 用于标题（≤6 行），pretty 用于正文防孤词，长文本都不用。
· macOS 根布局统一加 antialiased 字体平滑。
· 动态数字用 tabular-nums 等宽数字防布局抖动；不要求更换项目字体族。

4. 图标（Icons）
· 描边粗细匹配文字字重：常规文本配 1.5px，半粗配 2px。
· 单一 SVG + currentColor，状态全靠 CSS 颜色和透明度，绝不为每个状态出独立资源。
· 默认描边样式、填充样式只标记激活态；按渲染尺寸设计；RTL 场景只翻转方向性图标。

5. 性能（Performance）
· 禁用 transition: all，明确列出过渡属性。
· will-change 仅用于 transform/opacity/filter，且只在观察到首帧卡顿（尤其 Safari）时才加。

审查输出规范
Skill 对审查报告有严格格式要求，这也是它区别于普通"设计建议清单"的地方：
· 覆盖声明：列出五类各自实际检查了什么，未检查的必须标注"Not reviewed"，不许暗示已审。
· 发现表格：按原则分组，含严重度（HIGH/MEDIUM/LOW）、精确到行的位置、Before/After、违反的原则及用户影响。系统性问题合并为一行并列出所有受影响位置。
· 已否决候选：必须列出 1–5 个考虑过但否决的修改及理由，防止"为改而改"。
· 验证与裁决：列出实际运行的验证命令；有 HIGH 未解决则 Block，仅中低优问题则 Needs changes，无问题才 Approve。
