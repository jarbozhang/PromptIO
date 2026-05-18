---
title: "Agent Runtime 正在成为 AI 的下一个主战场。  Cline 在 Terminal-Bench 2.0 上跑了一组关键数据：同一个 claude-opus-4.7，在 Cline 上是 "
source: "X home @grapeot"
url: "https://x.com/grapeot/status/2055857098345652344"
date: "Sun May 17 03:45:02 +0000 2026"
likes: 135
reposts: 19
replies: 12
tweet_id: "2055857098345652344"
author: "grapeot"
---
Agent Runtime 正在成为 AI 的下一个主战场。

Cline 在 Terminal-Bench 2.0 上跑了一组关键数据：同一个 claude-opus-4.7，在 Cline 上是 74.2%，在 Claude Code 上是 69.4%。4.8 个百分点的差距，大致相当于把模型从 opus-4.6 升到 4.7 的收益。Cline 自己的 hill climbing 实验更极端——不换模型，只优化 harness 的 prompt、工具定义和上下文管理，从 47% 拉到 57%，+10pp。

自上而下的信号同样强烈。DeepSeek 正在招 Agent Harness PM（5 月 16 日热招第一，还没招到），OpenAI 成立了 Deployment Co. 做全栈 Agent 服务，Anthropic 发布了 Claude Cowork 和 Partner Network。所有模型公司都在往下游走。

驱动这场迁移的逻辑很清楚：token 价格正在归零（DeepSeek V4-Flash 推理成本只有 GPT-5.5 的 1/107），模型层的护城河也在消失——一旦 harness 做得足够好，换 provider 几乎无摩擦。价值捕获只能向上走，而 runtime 层是唯一能建立切换成本的地方。

全文分析了 runtime 层四个关键设计决策（prompt、工具定义、上下文管理、错误反馈），横向对比了市场上已有的 agent runtime（Cline SDK、Claude Agent SDK、Codex SDK、LangChain Deep Agents、OpenAI Symphony），以及对中国 builder 来说这意味着什么。

https://t.co/dJmL6mloln
