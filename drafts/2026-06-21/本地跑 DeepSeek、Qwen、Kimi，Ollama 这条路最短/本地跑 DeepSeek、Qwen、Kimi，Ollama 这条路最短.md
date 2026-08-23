---
title: 本地跑 DeepSeek、Qwen、Kimi，Ollama 这条路最短
status: draft
date: '2026-06-21'
source: manual
source_url: https://github.com/ollama/ollama
angle: 不要写模型排行，写成普通开发者的本地模型入口：安装、跑一个模型、接 REST API，再决定要不要连到编码助手、个人助手或脚本里。重点说明它减少的是模型试用前的环境成本。
voice: first-person
reach: 9
tags:
  - Ollama
  - 本地模型
  - DeepSeek
  - Qwen
  - Kimi
  - 开发者工具
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 本地跑 DeepSeek、Qwen、Kimi，Ollama 这条路最短
wechat_title: ''
cover:
  status: skipped
reach_note: Ollama、DeepSeek、Qwen、Kimi 都有认知度，本地运行和低成本试用很强。
selection_reason: GitHub 和官方 README 主源清晰，读者能立刻操作。
---

# 本地跑 DeepSeek、Qwen、Kimi，Ollama 这条路最短

我最近越来越不想把“试一个模型”搞成一个小工程。

普通开发者真正需要的，不是模型排行榜，而是一条低摩擦路径，先在本地把 DeepSeek、Qwen、Kimi 这类模型跑起来，再决定它该进编码助手、个人助手，还是只接到一个脚本里。

Ollama 适合放在这个入口位置。它减少的不是模型本身的复杂度，而是你开始试用前那一堆环境成本。

## 先把目标压成一个本地模型入口

Ollama 的 GitHub README 里，把它定义成一个开始使用 open models 的方式。仓库摘要里提到的模型包括 Kimi-K2.6、GLM-5.1、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等。

我会把它理解成一层本地模型入口，而不是某个模型的评测工具。

这件事很关键。你不是先讨论哪个模型最强，而是先让模型在本地有一个统一入口。能聊天，能被命令行调起，能暴露 REST API，能接到现有 agent 和应用里。

在这个阶段，能不能快速开始，比一次性搭一套完整推理服务更重要。

## 用官方路径跑通第一个模型

README 给出的安装入口很直接。

macOS 和 Linux 使用这一行。

`curl -fsSL https://ollama.com/install.sh | sh`

Windows 使用这一行。

`irm https://ollama.com/install.ps1 | iex`

Docker 用户可以用官方 `ollama/ollama` 镜像。

装完之后，快速开始命令是 `ollama`。README 里说，用户会被提示运行一个模型，或者把 Ollama 连接到已有 agents 和 applications，比如 Claude Code、OpenClaw、OpenCode、Codex 和 Copilot。

如果只是先和一个模型对话，官方例子是。

`ollama run gemma4`

我建议把第一次验证控制得更小一点，别一上来就接 IDE、接工作流、接一堆自动化。先确认三件事。

- 命令行能启动 Ollama
- 能按官方例子跑起一个模型
- 能理解后续是接聊天、编码助手、个人助手，还是 API

这一步过了，后面才值得继续加东西。

## 把它接进已有工具前先想清交付形态

Ollama README 里有两个很有用的集成入口。

编码集成可以用类似 `ollama launch claude` 的命令启动。个人助手集成可以用 `ollama launch openclaw`。

这两个例子说明，Ollama 不是只让你在终端里和模型聊天。它更像是把本地模型放到已有工具链旁边。

我会按交付形态来选下一步。

- 想辅助写代码，先看 Claude Code、OpenCode、Codex、Copilot 这类入口
- 想做个人助手，先看 `ollama launch openclaw` 这条路径
- 想接自己的脚本，优先看 REST API
- 想写应用，去看官方 Python 和 JavaScript libraries
- 想折腾模型格式和参数，再看 import docs 和 Modelfile reference

这比“先收藏十个模型名字”更靠谱。模型名字只是原料，真正决定你能不能用起来的是入口和交付形态。

## 需要程序调用时先走 REST API

如果你不想先绑定某个助手，REST API 是更稳的中间层。

README 明确给出了本地接口。

`http://localhost:11434/api/chat`

这对普通开发者很友好。你可以先把 Ollama 当成一个本地服务，外面接 Python 脚本、JavaScript app，或者任何会发 HTTP 请求的工具。

官方 README 也链接了 Python 和 JavaScript libraries。我的判断是，先用 REST API 理解请求和响应，再决定要不要上官方库。因为 API 能帮你看清楚，自己到底是在做聊天、批处理、工具调用前置，还是只是把模型嵌进一个小应用。

不要把第一步做重。

## 这里最容易踩坑的是太早追求完整工作流

Ollama 的诱惑在于，它看起来可以直接连很多东西。编码助手、个人助手、脚本、应用，路径都摆在 README 里。

但对刚开始试本地模型的人来说，太早集成反而会把问题混在一起。模型有没有跑起来，工具有没有接好，请求格式有没有写对，都会变成同一个失败结果。

我更建议按这个顺序走。

- 先跑一个官方示例模型
- 再打开 `http://localhost:11434/api/chat` 这条 API 思路
- 接着选一个真实任务，比如代码解释、文档摘要、个人助手问答
- 最后再决定是否连接 Claude Code、OpenClaw、OpenCode、Codex 或 Copilot

这样做的好处是，任何一步失败都比较容易定位。

Ollama 的价值不是替你选出最强模型，而是让你把“试模型”这件事从环境搭建里解放出来。模型好不好，终究要进你的任务里看。入口越短，你越快能看到它到底有没有用。

## 从一个可验证任务开始

如果你准备动手，我建议别从模型库里乱逛。

先选一个你每天都会遇到的小任务。比如让模型解释一段代码、改写一段说明、整理一份本地笔记，或者给一个脚本提供自然语言入口。

然后只做三步。

- 按 README 安装 Ollama
- 用 `ollama run gemma4` 跑通一次对话
- 用 REST API 或官方库接进一个最小脚本

完成这三步，你再看 DeepSeek、Qwen、Kimi-K2.6、Gemma 或其他模型，判断会更清楚。

本地模型不是一定要一开始就变成完整系统。先让它在你的机器上有一个稳定入口，这才是 Ollama 最值得用的地方。

## 相关链接

- Ollama GitHub 仓库，https://github.com/ollama/ollama
- Ollama 官方模型库，https://ollama.com/library
- Ollama Quickstart，https://github.com/ollama/ollama/blob/main/docs/README.md
- Ollama REST API reference，https://github.com/ollama/ollama/blob/main/docs/api.md
- Ollama Modelfile reference，https://github.com/ollama/ollama/blob/main/docs/modelfile.md
