---
title: Ollama 一次跑 Kimi、GLM、DeepSeek、Qwen，本地模型玩家该怎么选第一套组合
status: draft
date: '2026-06-17'
source: manual
source_url: https://github.com/ollama/ollama
angle: 从 Ollama 当前支持的 Kimi-K2.6、GLM-5.1、MiniMax、DeepSeek、Qwen 等模型切入，给读者一套本地运行的入门组合：写作、代码、长文本和轻量测试分别怎么选。
voice: first-person
reach: 9
tags:
  - Ollama
  - 本地模型
  - Qwen
  - DeepSeek
  - 模型选型
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: Ollama 一次跑 Kimi、GLM、DeepSeek、Qwen，本地模型玩家该怎么选第一套组合
wechat_title: ''
cover:
  status: skipped
reach_note: Ollama、DeepSeek、Qwen 等品牌认知强，本地运行和模型选择有直接操作价值。
selection_reason: 本地 AI 是中文读者高需求场景，仓库源为 fact，能把热门模型列表转成可执行的安装和选择建议。
---

# Ollama 一次跑 Kimi、GLM、DeepSeek、Qwen，本地模型玩家该怎么选第一套组合

如果你刚开始玩本地模型，最容易浪费时间的不是安装 Ollama，而是一次把模型库拉满。Kimi-K2.6、GLM-5.1、MiniMax、DeepSeek、Qwen 都能接进 Ollama，但第一套组合最好别按热度选。

我会把它拆成四个任务，写作、代码、长文本、轻量测试。每个任务只留一个主模型和一个备选，先把验证路径跑通，再谈性能调优。

这份选型按 Ollama 仓库、Quickstart 和官方模型页整理，更像一张入门路线图，适合你先少装、少切、少掉坑。

## 先用 Ollama 把入口固定住

Ollama 的价值不是某个模型，而是把模型入口收进一套统一命令。仓库 README 里给的最小入口很直接，终端运行 `ollama` 打开交互菜单，也可以用 `ollama run 模型名` 直接对话。

如果你要接到自己的应用，官方 API 默认走 `http://localhost:11434/api`，Python 和 JavaScript 也有官方库。我的习惯是先用 CLI 验证模型，再把同一个模型名放进 API，避免一边调前端一边怀疑模型没拉对。

别急着装桌面壳。第一轮只验证三件事，能不能启动，能不能稳定回答，能不能被你的应用通过同一个本地 API 调用。

## 写作先选 Qwen，别一上来追最大

写作和日常中文问答，我会从 Qwen 起步。原因很朴素，Ollama 模型页里 Qwen2.5 覆盖 0.5B 到 72B 多个尺寸，支持多语言，长上下文最高到 128K，还提到长文本生成、结构化数据理解和 JSON 输出。

如果机器一般，先跑 `qwen2.5:7b` 或 `qwen3:4b` 这类可承受尺寸。Qwen3 页面里 4B 版本约 2.5GB，标注 256K context window，足够做提示词、小段改写、摘要和格式化测试。

我的判断很简单，写作模型不该先追最强，而该先追可重复。你每天都要用，启动慢、占用高、一次只能跑一个大模型，反而会让本地工作流变成摆设。

## 代码任务交给 GLM 或 Qwen Coder

如果目标是改代码，GLM-5.1 和 Qwen3-Coder-Next 更像第一梯队候选。GLM-5.1 的模型页写得很明确，定位是 agentic engineering，强调更强代码能力，198K context window，756B parameters，并列出 SWE-Bench Pro、NL2Repo、Terminal-Bench 2.0 等工程任务评测。

Qwen3-Coder-Next 的定位更贴近本地开发。它面向 agentic coding workflows and local development，页面写到 80B total parameters、3B active per token，256K native context，量化后可在消费级硬件运行。

我会这样分工。

- 想看仓库级理解、低成本反复问，先试 Qwen3-Coder-Next
- 想压复杂工程任务、长会话推理，试 GLM-5.1
- 只是补全脚本和解释报错，不要跳到超大模型，先用 Qwen2.5-Coder 的小尺寸
- 每次只用同一个仓库、同一组问题测，别边换模型边换任务

这里最容易踩坑的是把代码模型当聊天模型测。你问它一个泛泛的技术概念，差异可能不大；给它一个真实 repo、一个失败测试、一个明确修改目标，模型差距才会显出来。

## 长文本留给 MiniMax 和 Kimi

长文本不是单纯把上下文数字拉大。你要看的是真任务，长文档、长视频理解、多步 agent、跨文件改动，模型能不能在后半程还记得前面的约束。

MiniMax M3 在 Ollama 页面上标注 512K context window，并说明支持最高 1M tokens context window，重点是 coding、agentic workflows 和 native multimodality。Kimi-K2.6 的页面则标注 256K tokens、1.04T parameters，强调 long-horizon coding、coding-driven design、proactive autonomous execution 和 swarm-based task orchestration。

所以我的第一套组合里，MiniMax 更适合放在长材料入口，Kimi-K2.6 更适合放在复杂交付入口。前者负责吞材料，后者负责拆任务和产出结构化交付。

但要注意，页面里这些大模型多以 `:cloud` 形式出现，和你在本机跑 7B、14B 小模型不是同一类体验。选它们前先确认自己需要的是本地统一入口，还是完全离线运行。

## 轻量测试用小 Qwen 或 DeepSeek-R1 蒸馏

第一套组合必须留一个轻量模型。它不负责写最终稿，也不负责改大仓库，只负责测试提示词、检查 API、做快速回归。

我会放两个选择。

- 纯文本小任务，用 `qwen2.5:0.5b`、`qwen2.5:1.5b` 或 `qwen3:0.6b`
- 推理链路测试，用 `deepseek-r1:1.5b`、`deepseek-r1:7b` 或 `deepseek-r1:8b`

DeepSeek-R1 页面列出 1.5B、7B、8B、14B、32B、70B、671B 等尺寸，8B latest 约 5.2GB，128K context window。它适合做一类测试，看看你的提示词有没有把推理任务讲清楚。

轻量模型的交付形态不是好答案，而是快反馈。只要它能帮你确认 API、格式、系统提示词和输出字段没错，它就值回硬盘空间。

## 第一套组合就按四格装

如果让我给新手一张可收藏清单，我会这样配。

- 写作和中文问答，Qwen2.5 或 Qwen3
- 代码和仓库理解，Qwen3-Coder-Next，复杂工程任务再看 GLM-5.1
- 长文本和多模态材料，MiniMax M3，复杂任务编排再看 Kimi-K2.6
- 快速测试和推理链路，Qwen 小尺寸或 DeepSeek-R1 蒸馏版本
- 应用接入，先用 `ollama` 和本地 API，不先堆客户端
- 验证标准，固定同一组任务，记录启动、回答质量、格式稳定性和资源占用

我认为最稳的入门策略不是选一个万能模型，而是让每个模型只干一件事。Ollama 已经把入口统一了，你要做的是把任务边界统一。

先跑一个写作任务、一个代码任务、一个长文本任务、一个 API 连通任务。四个都过，再去加模型；有一个不过，先改任务和提示词，不急着换全家桶。

## 相关链接

- Ollama GitHub 仓库，https://github.com/ollama/ollama
- Ollama Quickstart，https://docs.ollama.com/quickstart
- Ollama API 文档，https://docs.ollama.com/api
- Ollama 模型库，https://ollama.com/library
- Kimi-K2.6 模型页，https://ollama.com/library/kimi-k2.6
- GLM-5.1 模型页，https://ollama.com/library/glm-5.1
- MiniMax M3 模型页，https://ollama.com/library/minimax-m3
- DeepSeek-R1 模型页，https://ollama.com/library/deepseek-r1
- Qwen3 模型页，https://ollama.com/library/qwen3

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
