---
title: >-
  Skills for Design Engineers 作者 @emilkowalski 是知名设计工程师，曾在 Vercel、Linear 工作，也是
  Sonner、Vaul 等流行组件的创建者。他把多年积累的一套 UI/动画原则，沉淀成设计工程师们的设计品味 Skills，让 Codex、Claude
  Code、Cursor 等 Coding Agent
source: X @shao__meng
url: 'https://x.com/shao__meng/status/2072484635955900792'
date: 'Thu Jul 02 00:56:56 +0000 2026'
likes: 83
reposts: 19
replies: 21
source_type: x
language: zh
account_name: shao__meng
fetched_at: '2026-07-02T23:13:16.342Z'
---
Skills for Design Engineers

作者 @emilkowalski 是知名设计工程师，曾在 Vercel、Linear 工作，也是 Sonner、Vaul 等流行组件的创建者。他把多年积累的一套 UI/动画原则，沉淀成设计工程师们的设计品味 Skills，让 Codex、Claude Code、Cursor 等 Coding Agents 在写 UI 和动画时，具备接近资深设计工程师的审美判断！
https://t.co/LP5XimGnm5

仓库结构：三个相互补充的 Skills
1. 先建立决策框架（emil-design-eng）
主 Skill：设计工程哲学 + 动画决策框架 + 组件构建原则
2. 再审查代码（review-animations）
  · SKILL.md 以严格标准审查动画/动效代码，输出“Before/After/Why”表格
  · STANDARDS.md 评审的数值/曲线参考表（easing、duration、spring 等）
3. 最后帮助用户精准描述动效（animation-vocabulary）
词汇表：把“那个弹一下的效果”翻译成“Pop in”等专业术语

核心主张：动画不是“让它动起来”，而是“让它感觉对”
1. 动画需要理由
每条动画都必须回答一个问题：“它为什么要动？”
合理理由：
· 空间一致性（toast 从同一方向进出）
· 状态指示（按钮变形表示加载完成）
· 解释关系（引导用户理解状态变化）
· 防止突兀（元素突然出现/消失）
· 反馈（按下按钮时 scale(0.97)）
不合理理由：
· “看起来很酷” + 高频出现 → 应该删除
2. 按使用频率决定动画强度
· 每天 100+ 次（快捷键、命令面板）：禁止动画
· 每天几十次（hover、列表导航）：删除或大幅简化
· 偶尔（弹窗、抽屉、toast）：标准动画
· 罕见/首次（ onboarding、反馈）：可以适当“惊喜”

最实用的技术原则
Easing：不要信默认，要用强曲线
· UI 元素进入/退出 → ease-out
· 已在屏幕上的元素移动 → ease-in-out
· hover / 颜色 → ease
· 恒速运动 → linear
· 绝对禁止 UI 动画使用 ease-in（开头慢，用户会感觉到延迟）
Duration：UI 动画控制在 300ms 内
· 按钮按下反馈：100–160ms
· Tooltip / 小弹层：125–200ms
· 下拉框/选择器：150–250ms
· 模态框/抽屉：200–500ms
Physical correctness
· 永远不要从 scale(0) 开始：现实中不会凭空出现。用 scale(0.95) + opacity: 0。
· Popover 从触发点缩放：transform-origin 要指向触发按钮，而不是元素中心（modals 例外）。
· 按钮按下必须有反馈：transform: scale(0.97) 是默认。
性能规则
· 只动画 transform 和 opacity（GPU 层）。
· 不要用 width/height/margin/top/left 做动画。
· Framer Motion 的 x/y/scale 简写不是硬件加速的，要用完整 transform 字符串。
· 不要用父元素的 CSS 变量驱动子元素 transform（会引发样式重算风暴）。
· 预定动画用 CSS；动态/可打断的用 JS 或 Spring。
打断与对称
· CSS transition 可打断、可重定向；@ keyframes 会从头开始。
· 长按/删除等场景：按下慢（2s linear），释放快（200ms ease-out），非对称时间。
无障碍
· 尊重 prefers-reduced-motion：不是“全部关掉”，而是保留 opacity/颜色，移除位移动画。
· hover 动画必须加 @ media (hover: hover) and (pointer: fine)，避免触屏设备误触发。

评审 Skill：如何检查代码
review-animations 设定了十条“不可妥协”的标准，并把输出格式严格化为：
· transition: all 300ms > transition: transform 200ms ease-out -- 精确指定属性，避免 all 触发非 GPU 动画
· transform: scale(0) > transform: scale(0.95); opacity: 0
 -- 不应凭空出现

animation-vocabulary：把模糊感受翻译成专业词
这个 Skill 本质上是一个动效术语反向查询表。用户说“iOS 拉到底部会弹回去那种感觉”，它能回答“Rubber-banding”；用户说“元素从按钮里长出来”，它能回答“Origin-aware animation”。
它涵盖：
· 进出/序列/变换/状态过渡
· 滚动/交互反馈
· Easing / Spring / 循环/环境动画
· 打磨效果（Blur、Clip-path、Skeleton、Number ticker）
· 性能术语与动画原则
这对设计师和工程师的沟通、以及给 AI 下精确指令，都很有价值。
