---
title: "用 goal 看看能不能 one-shot 做完一个完整的项目。主 Agent 使用deepseek/deepseek-v4-pro 避免超限，子 Agent 用 gpt-5.5。 子 Agent 模"
source: "X @9hills"
url: "https://x.com/9hills/status/2055210277822459978"
date: "2026-05-15T08:54:48.000Z"
likes: 55
reposts: 2
replies: 9
tweet_id: "2055210277822459978"
author: "9hills"
---
用 goal 看看能不能 one-shot 做完一个完整的项目。主 Agent 使用deepseek/deepseek-v4-pro 避免超限，子 Agent 用 gpt-5.5。

子 Agent 模型使用：
- 开发：使用 openai-codex/gpt-5.5（当子 Agent 调用这个模型失败后，fallback 到 opencode-go/deepseek-v4-pro）
- 探索、测试等任务：使用 opencode-go/deepseek-v4-pro
- 模型回退链路：如果 opencode-go/deepseek-v4-pro 有问题，回退到 stepfun/step-router-v1
