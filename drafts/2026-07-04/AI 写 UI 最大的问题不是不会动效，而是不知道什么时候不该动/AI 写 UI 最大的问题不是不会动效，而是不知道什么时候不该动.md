---
title: AI 写 UI 最大的问题不是不会动效，而是不知道什么时候不该动
status: draft
date: '2026-07-04'
source: manual
source_url: https://x.com/shao__meng/status/2072484635955900792
angle: >-
  从 Skills for Design Engineers 切入，写成设计工程师的反常识稿：好的 UI 动效不是越多越好，而是按使用频率、状态反馈和空间关系决定要不要动。读者关心的是：如何让
  Coding Agent 写出的界面少一点 AI 味，多一点产品质感。
voice: first-person
content_lane: creator-workflow
content_archetype: myth_busting
diversity_note: same_entity_in_batch,agent_like_daily_cap,developer_lane_daily_cap,recent_entity_saturation
reach: 8
tags:
  - AI写UI
  - 设计工程师
  - Coding Agent
  - 动效设计
  - 产品质感
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: AI 写 UI 最大的问题不是不会动效，而是不知道什么时候不该动
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.069
reach_note: Vercel、Linear、Codex、Claude Code 都有认知度，且能立刻用于 UI 评审和提示词改写。
selection_reason: 这篇能给设计、前端、独立开发者都提供可复用判断标准，也能平衡当天偏工程部署的选题结构。
---

# AI 写 UI 最大的问题不是不会动效，而是不知道什么时候不该动

我最近看到 Skills for Design Engineers 这套给 Coding Agent 用的设计工程 Skills，最戳我的不是 easing 表，也不是 duration 参数。

真正有用的地方，是它把一个很难说清的审美问题，翻译成了 Agent 能执行的判断，什么时候应该动，什么时候应该删掉动效。

如果你也用 Codex、Claude Code、Cursor 写过界面，大概率见过那种页面，每个卡片都淡入，每个按钮都弹一下，每个列表项都像在努力证明自己会动画。乍看很勤奋，细看很像半成品。读完这套 Skills，我反而更确定一件事，AI 写 UI 的产品感，不是靠加动画补出来的，而是靠知道哪些地方别动。

## 误解一，界面有动效就更高级

很多人让 Agent 写 UI 时，会顺手加一句“加一点高级动效”。

这句话的问题是太空了。Agent 不知道“高级”对应什么场景，只能把它翻译成 fade、scale、spring、stagger，然后把页面里能动的地方都安排一遍。

Skills for Design Engineers 里的核心判断很直接，动画不是“让它动起来”，而是“让它感觉对”。每条动画都要回答一个问题，它为什么要动。

合理的理由包括空间一致性，比如 toast 从同一个方向进入和退出。也包括状态指示，比如按钮从普通状态变成加载完成。还包括解释关系，防止元素突然出现或消失，以及给点击提供反馈。

但“看起来很酷”不是理由。尤其是高频出现的地方，这个理由更站不住。

我认为这是很多 AI 生成界面的第一层 AI 味，动效像一层滤镜，不像产品行为本身长出来的东西。

## 误解二，高频操作也需要一点反馈感

这个误解更隐蔽。

因为“反馈”听起来永远正确。按钮按下有反馈，菜单切换有反馈，列表 hover 有反馈，好像都没问题。

但 Skills 里把使用频率拉进了判断。每天 100 次以上的操作，比如快捷键、命令面板，应该禁止动画。每天几十次的操作，比如 hover、列表导航，要删除或大幅简化。偶尔出现的弹窗、抽屉、toast，可以使用标准动画。罕见或首次使用的 onboarding、完成反馈，才适合给一点惊喜。

这个分层非常适合拿来约束 Coding Agent。

因为 Agent 最容易犯的错，是把“第一次看页面的人”当成唯一用户。它会为第一次打开制造情绪，却忘了真实产品里，用户每天要重复点同一个按钮、扫同一个列表、打开同一个命令面板。

高频操作里的动效，很多时候不是质感，是摩擦。

## 误解三，参数调漂亮就够了

动效当然需要参数。

来源里给了很多很实用的判断，比如 UI 元素进入和退出用 ease-out，屏幕上已有元素移动用 ease-in-out，hover 和颜色变化用 ease，恒速运动用 linear。UI 动画不要用 ease-in，因为开头慢会让用户感觉到延迟。

Duration 也有边界。按钮按下反馈在 100 到 160ms，tooltip 和小弹层在 125 到 200ms，下拉框和选择器在 150 到 250ms，模态框和抽屉在 200 到 500ms。大部分 UI 动画应控制在 300ms 内。

但只记参数还不够。

更关键的是物理感。不要从 scale(0) 开始，因为现实里东西不会凭空从零长出来。更合理的是 scale(0.95) 配 opacity 0。Popover 应该从触发点缩放，transform-origin 指向触发按钮，而不是默认从元素中心冒出来。按钮按下给 scale(0.97) 这样的反馈，才像用户真的按到了东西。

这些细节看起来小，但它们决定了页面像“产品”，还是像“动效演示”。

## 误解四，让 Agent 自己发挥会更有创意

我现在更倾向于反过来做。

不要让 Agent 自由发挥动效，先给它审美边界。Skills for Design Engineers 里的三个 Skill 正好对应三个阶段。

emil-design-eng 负责先建立决策框架，告诉 Agent 动画为什么存在，组件应该怎么构建。

review-animations 负责审查代码，用严格标准看动画是否合理，并输出 Before、After、Why 这样的修改说明。比如把 transition all 300ms 改成 transition transform 200ms ease-out，因为精确指定属性才能避免不必要的动画开销。再比如把 scale(0) 改成 scale(0.95) 加 opacity 0，因为元素不该凭空出现。

animation-vocabulary 负责把模糊感受翻译成专业术语。用户说“iOS 拉到底部会弹回去那种感觉”，它能对应到 Rubber-banding。用户说“元素从按钮里长出来”，它能对应到 Origin-aware animation。

这对写 prompt 很有价值。你不用再跟 Agent 说“弄得顺一点”，而是告诉它，弹层从触发点展开，保留空间关系，避免高频动画，尊重 prefers-reduced-motion。

## 让界面少一点 AI 味，先改提问方式

我会把这套方法用在三个地方。

做新界面时，不再说“加一些高级动效”，而是先问，这个动效服务空间、状态、关系、突兀感，还是反馈。

改旧界面时，不先调曲线，而是先按使用频率删动效。命令面板、快捷操作、列表导航，先压到最安静。弹窗、toast、抽屉，再保留必要的进入和退出。

让 Agent review 时，不只问“好不好看”，而是让它检查几件事，是否使用 transform 和 opacity，是否避免 width、height、margin、top、left 动画，是否处理 prefers-reduced-motion，hover 是否加了适配 hover 和精细指针的媒体条件。

这里有个很现实的判断。

AI 生成的 UI 不缺表现欲，缺的是克制。动效越多，越容易暴露它没有理解产品节奏。真正像设计工程师的 Agent，不是把页面变热闹，而是知道用户什么时候需要解释，什么时候只需要立刻响应。

我建议你下次让 Coding Agent 写界面时，先别加“酷一点”。把提示词换成这一句，按使用频率、状态反馈和空间关系判断每个动效是否保留，高频操作默认删除动画，保留的动画只使用 transform 和 opacity，并说明原因。

如果 Agent 能把“为什么动”说清楚，这个界面才有机会少一点 AI 味。

## 相关链接

- X 来源，https://x.com/shao__meng/status/2072484635955900792
- Skills for Design Engineers，https://t.co/LP5XimGnm5

<!-- REACH: 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
