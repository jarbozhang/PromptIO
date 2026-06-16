---
title: "微软联合交大、同济、复旦发了一个框架叫 SkillOpt，思路很有意思：像训练神经网络一样训练 AI Agent 的技能文件  它不动模型权重，训练的是 Skill——就是你给 Claude Code"
source: "X home @VincentLogic"
url: "https://x.com/VincentLogic/status/2066458456564080965"
date: "Mon Jun 15 09:51:03 +0000 2026"
likes: 315
reposts: 64
replies: 10
source_type: x
---

微软联合交大、同济、复旦发了一个框架叫 SkillOpt，思路很有意思：像训练神经网络一样训练 AI Agent 的技能文件

它不动模型权重，训练的是 Skill——就是你给 Claude Code 或 Codex 写的那些 prompt 和指导文档

做法是把神经网络训练的那套搬过来：轮次、批量大小、学习率、验证门控，全部套在自然语言上。执行任务 → 记录过程 → 复盘 → 修改 Skill → 验证效果，自动闭环迭代

结果很夸张。7个大模型、6类任务、3种 Agent 环境，总共52组测试，全部第一或并列第一

但最有价值的不是跑分，是它的迁移能力：

在 GPT-5.4 上优化好的技能文件，直接给 GPT-5.4-nano 用，性能提升 5.6 分 在 Claude Code 里优化好的技能，直接搬到 Codex 里用，提升 29.4 分 甚至能从一个数学基准迁移到另一个

一个 best_skill.md 文件，到处能用

对那些天天手动调 prompt 调到头秃的人来说，这个东西等于把调参这件事自动化了
