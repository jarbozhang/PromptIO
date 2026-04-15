---
title: "Claude Code 用户每天被吃掉的 token 里，有多少是废话？

有人做了个实验：往项目根目录放一个 9 行的 CLAUDE.md，输出 token 直降 63%。仓库叫 claude-to"
source: "X @chenchengpro"
url: "https://x.com/chenchengpro/status/2039564327771144208"
date: "Thu Apr 02 04:43:23 +0000 2026"
likes: 1102
reposts: 179
replies: 38
---

Claude Code 用户每天被吃掉的 token 里，有多少是废话？

有人做了个实验：往项目根目录放一个 9 行的 CLAUDE.md，输出 token 直降 63%。仓库叫 claude-token-efficient，两天 1900 star。

原理极其简单——Claude 默认回复充斥着 "Sure! Great question!" 开头、"I hope this helps!" 结尾、复述你的问题、给你没要求的建议、对明显错误的观点先说一句 "You're absolutely right"。这些「礼貌」全部消耗 token，信息量为零。

这 9 行就是完整的 CLAUDE.md：

```
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct.
- User instructions always override this file.
```

实测对比：
→ 代码 review：120 词 → 30 词（-75%）
→ 概念解释：180 词 → 65 词（-64%）
→ 纠正错误事实：55 词 → 20 词（-64%）
→ 信息零损失

第三方独立基准测试验证：编码任务总成本省 17.4%。最极端的 v8 配置只有 7 行规则 + 20 次工具调用预算，逼 Claude 提前规划而不是边试边改。

但作者很坦诚地指出了适用边界：这个文件本身每轮对话都会作为输入 token 加载。只有高频场景——Agent 循环、自动化流水线、日均 100+ prompt——才有净收益。偶尔聊两句反而更贵。

本质上是一个「用输入 token 换输出 token」的游戏。在配额日益紧张的 2026，这个权衡值得认真算一笔账。

https://t.co/gtLoULsJ7t
