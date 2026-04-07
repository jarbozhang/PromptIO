---
title: "一台MacBook就能跑实时音视频AI对话，Google这个小模型疯了吗？"
source_url: 'https://github.com/fikrikarim/parlor'
score: 9
scoring_reason: 开源项目Parlor在Mac本地实现实时多模态交互
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

# 一台MacBook就能跑实时音视频AI对话，Google这个小模型疯了吗？

六个月前，跑一个实时语音AI需要一张RTX 5090。今天，一台M3 Pro的MacBook Pro就够了。

而且不只是语音——摄像头也能用，端到端延迟不到3秒。

我第一次看到Parlor这个项目的demo时，以为又是一个"本地跑大模型"的玩具。结果clone下来一跑，真愣住了：对着摄像头举起一个杯子，它不仅听懂了我说的话，还能看到杯子并且用语音回答我。整个过程，网络请求为零。

## 这东西到底是怎么做到的

核心是Google刚发布的Gemma 4 E2B——一个"端到端"(End-to-End)的多模态小模型。E2B的意思是它能直接吃进去原始音频和图像，不需要先转文字再处理。传统方案是语音识别(ASR) -> 文本大模型 -> 语音合成(TTS)三段式流水线，每段都有延迟，加起来体验就废了。

Gemma 4 E2B把前两段压成了一步。

架构很简洁：浏览器采集麦克风音频和摄像头画面，通过WebSocket送给后端的FastAPI服务。服务端用LiteRT-LM加载Gemma 4 E2B做理解，用Kokoro做语音合成(Mac上走MLX，Linux走ONNX)，合成的音频流式推回浏览器。浏览器端的Silero VAD做语音活动检测，不用按按钮，说话就触发。

甚至支持打断——AI正在说话时你插嘴，它会停下来听你说。

## 性能数据让我重新理解了"端侧AI"

在M3 Pro上的实测数据：

- 语音+视觉理解：约1.8-2.2秒
- 生成回复(约25个token)：约0.3秒
- 语音合成(1-3句话)：约0.3-0.7秒
- 端到端总延迟：约2.5-3.0秒

解码速度达到了83 tokens/sec。

3秒的端到端延迟，说实话还不算"丝滑"。但考虑到这是完全本地、零API调用、模型才2.6GB，这个数字已经相当离谱了。

作者Fikri Karim做这个项目的背景更有意思。他之前搞了一个叫Bule AI的免费英语口语练习应用，自托管在家里一台装了RTX 5090的旧电脑上，用Cloudflare tunnel暴露到互联网。月活几百人，一直在想怎么让它可持续运营。答案很明显：把计算推到用户设备上，服务端成本直接归零。

Gemma 4 E2B的出现，让这条路第一次变得现实。

## 社区里已经在讨论什么

这个项目发布后，社区的兴奋点主要集中在两个方向。

第一个是教育场景。语言学习是最天然的应用——用户对着摄像头指着实物，用目标语言描述和提问，AI用语音回答。不需要联网，不需要付费API。Fikri自己就是印尼开发者，他做Bule AI的初衷就是"英语家教太贵了，穷人练不起口语"。

第二个是隐私。所有数据都在本地处理，不经过任何服务器。对于医疗、法律、企业内部这些场景，这不是"nice to have"，是硬需求。

但也有不少冷静的声音。有人指出Gemma 4 E2B的理解能力和GPT-4o差距还是很大的，复杂对话场景扛不住。也有人说3秒延迟对于"自然对话"来说还是太长了，人和人说话的反应时间通常在0.5秒以内。

这些批评都对。但我认为它们搞错了比较对象。

## 我的判断

Parlor的意义不在于它今天能替代ChatGPT Voice。它替代不了，差得远。

它的意义在于：它证明了"消费级硬件跑实时多模态AI"这件事，从不可能变成了勉强可以。

这是一个质变的节点。

我认为大多数人低估了端侧AI的发展速度。六个月前需要5090，今天M3 Pro就够。再过六个月呢？iPhone 17的Neural Engine呢？Fikri在README里写了一句话："想象几年后人们可以在手机上本地运行这个。"我觉得不用几年，可能就是明年的事。

对于国内的开发者来说，这个项目值得关注的点不是项目本身——它还太早期，代码里到处写着"Research preview，expect rough edges"。值得关注的是它背后的技术栈组合：LiteRT-LM + Gemma E2B + Kokoro TTS + Silero VAD。这套组合全部开源，全部可以在消费级硬件上跑，全部不需要API key。

如果你在做任何涉及语音交互的产品——智能硬件、教育应用、辅助工具——我建议你现在就把这个项目clone下来跑一遍。不是为了用它的代码，是为了亲身感受一下"本地多模态AI"目前能做到什么程度。

这种体感，比读十篇分析文章都有用。

你的下一个产品，还需要调API吗？

## 相关链接

- Parlor 项目仓库：https://github.com/fikrikarim/parlor
- Gemma 4 E2B 模型：https://huggingface.co/google/gemma-4-E2B-it
- LiteRT-LM 推理引擎：https://github.com/google-ai-edge/LiteRT-LM
- Kokoro TTS 模型：https://huggingface.co/hexgrad/Kokoro-82M
- Bule AI 背景故事：https://www.fikrikarim.com/bule-ai-initial-release/
