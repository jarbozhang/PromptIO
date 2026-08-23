---
title: 用 Ollama 接入 Kimi K2.6、GLM 5.1 和 DeepSeek：下载前先按内存选模型
status: draft
date: '2026-07-14'
source: manual
source_url: https://github.com/ollama/ollama
angle: 从 Ollama 当前支持列表中选择一个与设备内存匹配的量化版本，依次完成拉取、启动和 API 冒烟测试，并记录内存占用与首字延迟，避免盲目下载过大的模型。
voice: first-person
content_lane: model-deployment
content_archetype: hands_on_recipe
diversity_note: recent_entity_saturation
reach: 9
tags:
  - Ollama
  - 本地模型
  - 模型部署
  - Kimi K2.6
  - GLM 5.1
  - DeepSeek
llm:
  provider: codex
  model: ''
platforms:
  wechat: primary
  xhs: primary
  x: blocked
xhs_title: 用 Ollama 接入 Kimi K2.6、GLM 5.1 和 DeepSeek：下载前先按内存选模型
wechat_title: ''
cover:
  status: skipped
recent_similarity: 0.025
reach_note: Ollama、Kimi、GLM 和 DeepSeek 都有认知度，本地接入与避免下载错误模型兼具利益点和即时操作性。
selection_reason: 统一入口降低了尝试新模型的切换成本，而先按硬件筛选能避免最常见的下载失败和运行卡顿，适合中文读者当天动手。
---

# 用 Ollama 接入 Kimi K2.6、GLM 5.1 和 DeepSeek：下载前先按内存选模型

如果你准备用现有电脑运行 Kimi K2.6、GLM 5.1 或 DeepSeek，最容易浪费时间的不是启动命令，而是模型还没选对就开始下载。磁盘装得下，不代表运行时内存扛得住。

这套方法适合个人开发者和需要做本地验证的小团队。我把目标压成一件事，从 Ollama 当前支持列表里挑出与设备内存相称的量化版本，完成拉取、启动和一次 API 冒烟测试。

跑完后，你会得到一张可复用记录表。它不回答哪个模型绝对更强，只帮你确认模型能不能稳定启动、API 链路是否可用，以及首字延迟是否符合自己的使用场景。

## 把目标压成一次可复现冒烟

第一次运行不要塞长文档，也不要同时测试多轮对话、工具调用和大上下文。变量越多，越难分清失败来自模型尺寸、内存压力还是服务链路。

我会固定一个极小任务，让模型只回答 `OK`。这次验证只看四件事。

- 模型能完成加载，进程没有异常退出
- 命令行能够返回与提示词相符的结果
- API 能收到流式响应
- 能记录加载后的内存占用和首字延迟

首字延迟也要统一口径。我从请求发出的时刻开始计时，收到第一个流式响应片段时停止，不把完整回答耗时混进来。

## 按可用内存挑完整模型标签

Ollama 仓库当前列出的可运行模型包括 Kimi-K2.6、GLM-5.1、DeepSeek，以及 MiniMax、gpt-oss、Qwen、Gemma 等。模型家族名只是入口，真正决定下载和运行对象的是支持列表中的完整标签与量化版本。

我的选择顺序不是先找最大的，而是先看设备当前还能拿出多少内存。系统总内存、磁盘剩余空间和运行前可用内存是三件不同的事，不能混着判断。

下载前，我会记录下面这组信息。

- 设备总内存和运行前可用内存
- 支持列表中的完整模型标签
- 页面明确展示的量化标识
- 页面提供的文件大小信息
- 当前运行的其他高内存程序
- 准备用于冒烟测试的固定提示词

候选版本不止一个时，我会从内存压力更小的版本开始。先拿到一次完整闭环，再根据实际占用决定是否上探，比同时拉取几个大文件更容易定位问题。

## 依次走完拉取、启动和 API 请求

完成 Ollama 安装后，把 `MODEL_TAG` 替换成支持列表里复制的完整标签。不要仅凭标题中的家族名猜标签。

```shell
ollama pull MODEL_TAG
ollama serve
```

服务启动后，在另一个终端运行最小提示词。

```shell
ollama run MODEL_TAG '只回答 OK'
```

命令行返回正常，再发一次 API 请求。

```shell
curl http://localhost:11434/api/generate -d '{"model":"MODEL_TAG","prompt":"只回答 OK","stream":true}'
```

这里保留流式输出，是为了看到第一个响应片段并记录首字延迟。若 Ollama 服务已经由桌面程序或现有进程启动，不要重复启动第二个服务，直接进入命令行和 API 验证。

## 用同一张记录表验收

我会给每个量化版本单独留一行，不靠“感觉还挺快”做判断。

- 完整模型标签与量化标识
- 拉取是否成功
- 启动前可用内存
- 模型加载后的内存占用
- 第一次请求的首字延迟
- 第二次请求的首字延迟
- API 是否收到流式结果
- 失败时的原始错误信息

第一次和第二次请求要分开记录。前者包含冷启动和加载影响，后者更接近模型已经驻留后的响应状态。两组数字不能互相替代。

我的验收标准很直接。模型能吐出结果却让设备持续出现明显内存压力，我不会把它算作日常可用。API 冒烟通过也只证明调用链路成立，不等于长上下文、并发请求和正式任务已经通过。

## 避开四个最常见的失真点

- 把模型家族名当成完整标签，导致拉取对象不存在或不是预期版本
- 只看磁盘容量，不记录模型加载后的真实内存占用
- 用非流式请求测首字延迟，实际记录成了完整回答耗时
- 比较不同版本时更换提示词、上下文或后台程序，让数据失去可比性

现在选 Kimi K2.6、GLM 5.1 或 DeepSeek 中的一个家族，只拉取一个与可用内存相称的量化版本。保存一次成功请求和一行完整记录，再决定要不要尝试更大的版本。

## 相关链接

- [Ollama GitHub 仓库](https://github.com/ollama/ollama)
- [Ollama 发行记录](https://github.com/ollama/ollama/releases)

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
