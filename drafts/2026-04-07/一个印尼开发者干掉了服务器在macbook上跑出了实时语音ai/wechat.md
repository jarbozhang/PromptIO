---
title: "一个印尼开发者干掉了服务器，在MacBook上跑出了实时语音AI"
source_url: 'https://github.com/fikrikarim/parlor'
score: 8.6
scoring_reason: Mac本地实时多模态AI交互
status: draft
platform: wechat
tags:
  - 本地AI
  - 实时语音
  - Gemma
  - Mac开发
created_at: '2026-04-07'
generated_by: claude-opus-4-6
---

好的，所有素材和规范都齐了。以下是文章。

---

# 一个印尼开发者干掉了服务器，在MacBook上跑出了实时语音AI

Parlor 这个项目，846 个 star，36 次提交，一个人写的。

它在一台 M3 Pro MacBook 上跑 Gemma 4 E2B，做到了端到端 2.5 到 3 秒的语音对话延迟。不用服务器，不用 API key，不用花一分钱。我看到这个数字的时候愣了好几秒，因为我之前试过好几个本地语音方案，没有一个能在 3 秒内完成"听懂你说什么 + 想好怎么回 + 说出来"这整个链路。

故事的起点很有意思。作者 Fikri Karim 之前做了一个免费的英语学习语音平台，用户越来越多，服务器成本扛不住了。他没去融资，也没加付费墙，而是想了个狠招，把整个推理搬到用户的电脑上。

这才是我觉得值得聊的部分。

## 架构拆开看，其实不复杂

Parlor 的技术栈说到底就三个模型拼在一起。

Gemma 4 E2B 负责"理解"，包括语音识别和视觉理解，通过 Google 的 LiteRT-LM 框架做推理。Kokoro-82M 负责把文字变成语音。Silero VAD 跑在浏览器里，负责检测你有没有在说话。

数据流也很直白，浏览器采集音频和摄像头画面，通过 WebSocket 发给本地的 FastAPI 服务，Gemma 处理完之后，TTS 逐句流式返回音频。

我翻了一下 server.py，发现一个挺聪明的设计。它没有直接解析 LLM 的文本输出，而是定义了一个 `respond_to_user` 的工具调用 (tool call)，让模型通过结构化的方式返回转录文本和回复内容。这比正则解析鲁棒多了，谁做过 LLM 输出解析的都知道那有多脆弱。

还有一点，TTS 是逐句流式的。模型生成第一句话之后，TTS 就开始合成音频并推给浏览器，不等整个回复生成完。这几百毫秒的优化在体感上差别很大。

## 那些数字背后的真实体感

作者给了一张延迟表，在 M3 Pro 上的实测数据。

语音加视觉理解大概 1.8 到 2.2 秒，生成 25 个 token 的回复大概 0.3 秒（解码速度大约 83 token/秒），TTS 合成 1 到 3 句话大概 0.3 到 0.7 秒。加起来端到端 2.5 到 3 秒。

坦率讲，3 秒对于自然对话来说还是偏慢。你跟朋友聊天，对方 3 秒不回你，你会觉得他在想什么心事。但对于一个完全本地、零成本、可以看摄像头画面的语音助手来说，这个数字我觉得已经进入了"可用"的区间。

而且它支持打断 (barge-in)。你说到一半它在回复，你可以直接打断它。这个细节很重要，没有打断功能的语音交互用起来会让人抓狂。

## 我看到的几个问题

说真的，这个项目还很粗糙。README 自己写的"research preview，expect rough edges"。

目前只有一个 open issue，是 WSL2 Ubuntu 22.04 上跑不起来。这说明 Linux 兼容性还没打磨好。macOS 用 MLX 做 TTS 后端，Linux 用 ONNX，两套路径本身就容易出问题。

模型下载大概 2.6 GB。第一次启动要等一会，但之后就缓存在本地了。内存占用大概 3 GB，对于一台 M3 Pro 的机器来说不算什么，但如果你想在 8GB 内存的 MacBook Air 上跑，可能会有点紧张。

还有一个我比较在意的点，音频处理走的是 CPU 而不是 GPU。作者在加载引擎的时候明确把 `audio_backend` 设成了 CPU，`vision_backend` 和主推理走 GPU。我猜是 LiteRT-LM 的音频处理在 GPU 上还没优化好，但这也意味着音频理解那 1.8 秒的延迟里可能还有压缩空间。

## 为什么这件事比它看起来重要

我认为 Parlor 真正有意思的地方不是技术实现本身，而是它验证了一个时间点。

半年前，你要在消费级硬件上跑一个多模态实时对话系统，想都不用想。Gemma 4 E2B 这个模型本身就是前几周才出的，LiteRT-LM 把它优化到 83 token/秒，Kokoro TTS 小到 82M 参数就能出不错的语音。这三个东西凑到一起，刚好过了"可用"的门槛。

反正我觉得，端侧 AI 的叙事过去一直停在"概念验证"阶段，各家秀跑分但没人做出真的能用的东西。Parlor 第一次让我觉得，一个独立开发者，一台笔记本，真的可以做出一个不用联网的语音助手，而且延迟在 3 秒以内。

可能有些想法还不成熟，但我的判断是，2026 年下半年我们会看到一波基于端侧多模态模型的产品爆发。不是因为模型变强了多少，而是因为 Gemma E2B 这种"刚好够用"的模型，加上足够好的推理框架，让成本结构发生了根本变化。当推理成本从"每月几千美元服务器费"变成"用户自己的电脑"，很多之前不成立的产品逻辑就成立了。

Fikri 做英语学习平台扛不住服务器成本，被逼着把推理搬到端上。这个"被逼出来"的路径，可能恰好是端侧 AI 产品化最真实的起点。

想试的话，`git clone` 下来 `uv run server.py` 就能跑。如果你手边有 M 系列芯片的 Mac，花十分钟体验一下，你会对"本地 AI 能做到什么"有一个全新的认知。

## 相关链接

- Parlor 项目仓库 https://github.com/fikrikarim/parlor
- Gemma 4 E2B 模型 https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm
- LiteRT-LM 推理框架 https://github.com/nicfab2000/litert-lm
- Kokoro TTS https://github.com/hexgrad/kokoro
- Silero VAD https://github.com/snakers4/silero-vad
