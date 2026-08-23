---
title: 让 Codex 写出更像资深设计工程师的 UI，这套 Design Skills 值得抄作业
status: draft
date: '2026-07-03'
source: manual
source_url: https://x.com/shao__meng/status/2072484635955900792
angle: 面向做产品、独立开发和前端的读者，把设计工程师的动画原则拆成可复用的 Skill 写法：什么时候该动、动多强、如何让 Agent 审查动效代码。
voice: narrative
content_lane: creator-workflow
content_archetype: case_story
diversity_note: title_pattern_repeat_in_batch,recent_title_pattern_saturation
reach: 8
tags:
  - Codex
  - 设计工程
  - UI动效
  - Agent工作流
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 让 Codex 写出更像资深设计工程师的 UI，这套 Design Skills 值得抄作业
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.029
reach_note: Codex 有品牌认知，设计质量是明确利益点，读者能直接借鉴 Skill 结构。
selection_reason: 这篇能把 Agent 话题带到创作者和产品体验场景，避免当天内容全是模型和框架。
---

# 让 Codex 写出更像资深设计工程师的 UI，这套 Design Skills 值得抄作业

很多人让 Codex、Claude Code、Cursor 写界面，最后卡住的不是组件能不能跑，而是动效像不像一个成熟产品。

按钮会缩放，弹窗会淡入，toast 会飞出来，但只要节奏不对，用户立刻能感觉到“这像模板”。这套 Design Skills 有意思的地方在于，它不是给 Agent 一堆审美形容词，而是把资深设计工程师的判断拆成可执行规则。

适合做产品、独立开发和前端的读者看。你可以把它当成一套 UI 动效审稿人，专门回答三个问题，什么时候该动，动多强，代码哪里会让体验变钝。

## 让 Agent 先学会少动

这个项目来自设计工程师 Emil Kowalski。他曾在 Vercel、Linear 工作，也是 Sonner、Vaul 等组件的创建者。源材料里提到，他把多年积累的 UI 和动画原则沉淀成三个互补的 Skills，让 Coding Agents 在写 UI 和动效时拥有更接近资深设计工程师的判断。

真正关键的不是“加动画”，而是“删动画”。

这套规则先把场景按使用频率分开。每天可能触发 100 次以上的快捷键、命令面板，原则上不要动画。每天几十次的 hover、列表导航，删除或大幅简化。弹窗、抽屉、toast 这种偶尔出现的场景，可以使用标准动效。首次引导、反馈这类低频场景，才适合一点惊喜。

这对 Agent 很重要。因为 Agent 写 UI 时很容易把“完成度”理解成“更多动效”。但真实产品里，高频路径最怕被动画拖慢。一个成熟界面看起来克制，不是因为没设计，而是因为它知道哪些地方不该抢戏。

## 把一句模糊需求翻译成动效语言

想象一个真实工作流。

你在做一个设置面板，希望用户点按钮后弹层从按钮附近展开。你对 Agent 说“做得自然一点”，它可能给你一个居中缩放。代码能跑，但视觉关系断了，用户不知道这个层和刚才的按钮有什么关系。

这里 animation-vocabulary 这个 Skill 就有用。它把模糊感受翻译成专业术语。比如“iOS 拉到底部会弹回去那种感觉”，对应 Rubber-banding。比如“元素从按钮里长出来”，对应 Origin-aware animation。

这不是为了显得专业，而是为了让人和 Agent 共享同一套词表。你不再只说“顺一点”“高级一点”，而是告诉它，popover 需要从触发点缩放，transform-origin 要指向触发按钮，modal 这种例外才适合居中处理。

交付物会变。以前是设计师描述感觉，工程师猜实现，Agent 再猜一遍。现在可以把感觉压成可执行词汇，减少三次翻译损耗。

## 让审查不再停在“看起来还行”

第二个关键 Skill 是 review-animations。它不是帮你写新动画，而是用严格标准审查已有代码，并按 Before、After、Why 的形式输出。

它会盯住一些很具体的错误。

比如 transition: all 300ms 看起来省事，但会把不该动的属性也卷进动画，可能触发非 GPU 动画。更好的写法是精确指定 transform 200ms ease-out。再比如从 scale(0) 开始弹出，视觉上像凭空出现。更自然的做法是 scale(0.95) 加 opacity: 0。

这些规则对前端很实用，因为它们不是审美口号，而是代码层面的边界。

UI 动画尽量只动 transform 和 opacity。不要用 width、height、margin、top、left 做动画。Framer Motion 的 x、y、scale 简写也需要小心，源材料里提醒要用完整 transform 字符串。父元素 CSS 变量驱动子元素 transform，也可能造成样式重算压力。

这类问题肉眼不一定马上看出来，但一旦页面复杂、列表变长、设备性能一般，体验会迅速变钝。一个好的设计工程 Skill，价值就在这里，它把“品味”落到了性能和可维护性上。

## 交付物从组件变成一段可复用判断

如果只看结果，这套 Skills 最像一个动效设计评审流程。

主 Skill emil-design-eng 负责建立判断框架，动画为什么存在，组件怎么构建，交互该多克制。review-animations 负责把代码拉回标准，检查 duration、easing、spring、transform、无障碍和性能。animation-vocabulary 负责把模糊描述变成可沟通的术语。

这种组合对独立开发者尤其友好。很多小团队没有专职动效设计师，也没有时间做完整 design review。Agent 能写出第一版 UI，但通常缺一层“资深设计工程师会怎么挑刺”的判断。

这套写法给了一个可复用经验。

不要只给 Agent 组件需求。要先给它动效决策框架，再让它写界面，最后用审查 Skill 反查代码。这样交付物不只是一个能运行的页面，而是一段可复查、可迭代、能在下个项目复用的 UI 标准。

## 把这套思路抄到自己的 Skill 里

我认为最值得借鉴的不是具体参数，而是参数背后的分层。

第一层问动效有没有理由。空间一致性、状态指示、关系解释、防止突兀、交互反馈，这些理由成立才动。只是“看起来很酷”，尤其还高频出现，就该删。

第二层按频率控制强度。命令面板、快捷操作要快，toast、抽屉可以有标准节奏，首次引导才给一点记忆点。

第三层把技术底线写死。UI 进入和退出用 ease-out，屏幕内移动用 ease-in-out，hover 和颜色用 ease。按钮反馈控制在 100 到 160ms，小弹层 125 到 200ms，下拉和选择器 150 到 250ms。UI 动画不要用 ease-in，因为开头慢会让用户感觉延迟。

第四层检查无障碍。prefers-reduced-motion 不是把所有反馈关掉，而是保留 opacity 和颜色，移除位移动画。hover 动画也要加 media 条件，避免触屏设备误触发。

把这些写进你的项目 Skill，比在 prompt 里反复说“做得精致一点”可靠得多。精致不是形容词堆出来的，是一组能被 Agent 执行、能被代码审查验证的约束。

可以从一个已有页面开始。挑一个弹窗、一个 toast、一个按钮反馈，让 Agent 先按这套规则审一遍，再决定删掉哪条动画、保留哪条动画、把哪条动画改短。

真正的设计工程味，往往不是多写了多少 CSS，而是知道哪 200ms 值得留下。

## 相关链接

- 原始来源，https://x.com/shao__meng/status/2072484635955900792
- Skills for Design Engineers，https://t.co/LP5XimGnm5

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
