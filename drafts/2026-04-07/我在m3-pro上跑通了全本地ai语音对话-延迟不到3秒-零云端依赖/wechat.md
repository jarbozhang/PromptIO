---
title: "我在M3 Pro上跑通了全本地AI语音对话，延迟不到3秒，零云端依赖"
source_url: https://github.com/fikrikarim/parlor
score: 9
scoring_reason: Mac本地实现实时多模态AI交互
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
# 我在M3 Pro上跑通了全本地AI语音对话，延迟不到3秒，零云端依赖

一个开源项目，2.6GB模型，对着摄像头说话就能实时对话。不需要OpenAI API key，不需要任何服务器，甚至不需要联网。

我第一反应是：不可能。

Parlor这个项目两天前刚上GitHub，用Google刚发的Gemma 4 E2B模型，在本地Mac上做到了实时音频+视频输入、语音输出的完整AI对话。832个star，速度还在涨。我clone下来跑了一下，端到端延迟大约2.5-3秒。

不是那种"技术演示能跑通但没法用"的玩具。是真的可以对着电脑说话、它看着你的摄像头画面、然后用语音回答你的东西。

## 三个模型拼出一套完整管线

架构其实很暴力：浏览器采集麦克风和摄像头画面，通过WebSocket扔给本地FastAPI服务端，Gemma 4 E2B负责理解语音和画面，Kokoro-82M负责把文字变成语音，Silero VAD在浏览器端做语音活动检测。

关键数字，在M3 Pro上实测：

| 阶段 | 耗时 |
|------|------|
| 语音+视觉处理 | 1.8-2.2秒 |
| 回复生成（约25 token） | 0.3秒 |
| 文字转语音（1-3句话） | 0.3-0.7秒 |
| **端到端** | **2.5-3.0秒** |

解码速度大约83 tokens/s。这个数字在本地推理的世界里相当能打。

整个模型下载量只有2.6GB左右。3GB内存就够跑。

## Gemma 4 E2B才是真正的主角

比起Parlor本身，我更想聊的是它背后的Gemma 4 E2B模型。

E2B是"Edge-to-Browser"的缩写，Google专门为端侧设备做的模型。它用了混合精度量化——2-bit、4-bit、8-bit混着来，把模型压到了2.58GB，同时保持了多模态能力：能听、能看、能说。

运行它的推理引擎叫LiteRT-LM，Google自家的东西。有个很聪明的设计：embedding参数用内存映射 (memory-mapped) 而不是全部加载到RAM。这就是为什么一个2.6GB的模型只需要3GB内存就能跑——真正吃的内存远小于模型文件大小。

我看了一下各平台的benchmark数据：M4 Max上GPU解码能到160 tok/s，RTX 4090上能到143 tok/s。甚至树莓派5都能跑，虽然只有7.6 tok/s的解码速度，但至少证明这东西的适配范围很广。

在Mac上它走MLX加速的Kokoro做TTS，Linux上则回退到ONNX CPU推理。这个设计决策很务实——不追求统一，就是哪个平台最快用哪个。

## 社区里的多种声音

两天800多star说明大家对"全本地多模态对话"这件事是有真实需求的。但我在issues里也看到了现实：有人在WSL2 Ubuntu上跑不起来。这不意外——LiteRT-LM的GPU加速在不同平台上的行为差异不小，Mac上的MLX路径和Linux上的路径是完全不同的代码。

代码层面有几个值得注意的设计。服务端用了tool-calling模式——让模型必须调用`respond_to_user()`函数来输出，而不是自由生成文本。这保证了输出结构的可控性，把语音转录和回复内容拆得很干净。

还有一个细节：中断机制做了分层检查。LLM推理完成后检查一次、TTS开始前检查一次、每生成一句话检查一次。这意味着你可以在AI说到一半的时候打断它，体验上接近真人对话的节奏。

但README自己也承认这是research preview，"expect rough edges and bugs"。TTS部分虽然按句子流式发送，但生成本身是同步阻塞的——每句话生成完才发，不是真正的流式合成。长回复的体验会有明显的一顿一顿的感觉。

## 我的判断

我认为Parlor本身不是重点，重点是它证明了一件事：**全本地、多模态、实时AI对话的硬件门槛已经低到了消费级笔记本的水平**。

2.5GB模型 + 3GB内存 + 3秒延迟。一年前这需要一台服务器。

但我也不会过度吹捧。3秒的端到端延迟对于"实时对话"来说还是太慢了——人类对话的自然间隔大约是200-500毫秒。所以这更接近"你问一句它想两秒再答"的体验，不是那种流畅的ChatGPT Advanced Voice Mode的感觉。

真正让我兴奋的是LiteRT-LM这个推理引擎。Google显然在认真做端侧推理这件事，从手机到树莓派到浏览器全覆盖。如果你在做任何需要在本地跑模型的产品，这个技术栈值得认真研究。

**一个可能会得罪人的断言：对于大多数"本地AI助手"的场景，Gemma E2B + LiteRT-LM会比llama.cpp + Whisper的方案更有前途。** 不是因为模型更强，而是因为Google在端侧优化上投入的工程资源，不是社区项目能比的。

## 想试的话

四行命令：

```
git clone https://github.com/fikrikarim/parlor.git
cd parlor/src
uv sync
uv run server.py
```

打开 `localhost:8000`，给摄像头和麦克风权限，就能开始说话了。需要Python 3.12+，Apple Silicon Mac或者有GPU的Linux机器。模型第一次跑会自动从HuggingFace下载，大约2.6GB。

如果你已经在用本地模型做语音交互，我很好奇你的延迟能做到多少？

## 相关链接

- Parlor 项目仓库：https://github.com/fikrikarim/parlor
- Gemma 4 E2B 模型页面：https://huggingface.co/litert-community/gemma-4-E2B-it-litert-lm
- Kokoro-82M TTS 模型：https://huggingface.co/hexgrad/Kokoro-82M
- LiteRT-LM 文档：https://ai.google.dev/edge/litert-lm/cli
