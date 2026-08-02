---
title: >-
  DeepSeek V4-Flash 正式版 API 上线，原生适配 Codex DeepSeek 今天把 V4-Flash 从预览版升级为正式版
  API，版本号 0731。模型架构和参数规模没变，还是 284B 总参数、13B 激活的混合专家架构，改动集中在后训练上。
  升级的核心是智能体（Agent）能力。DeepSeek 的说法是“多项 Agent 基准成
source: X @dotey
url: 'https://x.com/dotey/status/2083087254101086539'
date: 'Fri Jul 31 07:07:57 +0000 2026'
likes: 209
reposts: 20
replies: 111
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-08-01T11:13:30.140Z'
---
DeepSeek V4-Flash 正式版 API 上线，原生适配 Codex

DeepSeek 今天把 V4-Flash 从预览版升级为正式版 API，版本号 0731。模型架构和参数规模没变，还是 284B 总参数、13B 激活的混合专家架构，改动集中在后训练上。

升级的核心是智能体（Agent）能力。DeepSeek 的说法是“多项 Agent 基准成绩大幅超过此前的 V4-Pro-Preview”。这句话的意思是，便宜的那个模型（Flash）经过后训练调优之后，在编程和工具调用任务上反超了贵的那个模型（Pro）的预览版。Pro 的正式版还没出，所以这个对比有时间差，但趋势本身值得关注：后训练对智能体场景的提升空间可能比很多人想的大。

另一个看点是 V4-Flash 现在原生支持 Responses API 格式，专门针对 OpenAI 的 Codex 做了适配。Codex 是 OpenAI 的 AI 编程助手，覆盖命令行工具（CLI）、ChatGPT 桌面端和 VS Code 扩展三个入口。之前 DeepSeek 的 API 只兼容 OpenAI ChatCompletions 和 Anthropic 两种格式，想接 Codex 得走代理转换。现在这个中间层不需要了，DeepSeek 甚至提供了一键配置脚本，跑完之后 Codex 所有客户端自动切换到 DeepSeek 模型。

你可以用每百万 Token 输入 0.14 美元、输出 0.28 美元的价格跑 AI 编程任务，同时享受 100 万 Token 的上下文窗口。做个对比，Codex 默认使用的 OpenAI 自家模型，同等量级的价格要贵上一个数量级。对于跑大量 Agent 循环的编程任务来说，Token 成本不是差个百分比的问题，是完全不同的成本结构。

有两点需要注意：
第一，这次只升级了 API 接口，DeepSeek 的 App 和网页端模型没有变化，普通用户暂时感知不到区别。
第二，V4-Pro 的正式版还没发布，官方只说"尽快上线"，具体时间未知。
