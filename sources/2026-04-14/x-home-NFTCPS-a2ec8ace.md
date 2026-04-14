---
title: "据说东南亚的电诈园区已经开始用这个工具模拟声音诈骗了！  ElevenLabs 要花钱，数据还得传到云端。  Voicebox 是开源的本地方案——声音克隆、语音合成、音频后期，全在你自己电脑上跑，数"
source: "X home @NFTCPS"
url: "https://x.com/NFTCPS/status/2043292166689263683"
date: "Sun Apr 12 11:36:29 +0000 2026"
likes: 336
reposts: 68
replies: 6
---

据说东南亚的电诈园区已经开始用这个工具模拟声音诈骗了！

ElevenLabs 要花钱，数据还得传到云端。

Voicebox 是开源的本地方案——声音克隆、语音合成、音频后期，全在你自己电脑上跑，数据不出机器。

5 个 TTS 引擎随便切：

- Qwen3-TTS：多语言 + 语气指令控制
- Chatterbox Multilingual：支持 23 种语言
- Chatterbox Turbo：英语快速生成，带情感表达
- TADA（HumeAI）：长篇连贯语音
- LuxTTS：轻量英语模型

一小段音频就能克隆声音，生成长度不限，自动分块拼接。

内置 8 种音频后期效果：变调、混响、延迟、压缩……用的是 Spotify 的 Pedalboard 库，专业级。

还有多轨时间线编辑器，多个声音角色拼在一起做有声书、播客、配音，直接在应用里完成。

技术栈很硬：Tauri（不是 Electron）+ React + FastAPI + MLX/PyTorch，Mac 上 Apple Silicon 原生加速，Windows/Linux CUDA、ROCm 都支持。

带 REST API，可以集成到自己的应用里批量生成。

GitHub 15.1k 星，MIT 协议，商用随意。

做播客、有声书、短视频配音、游戏角色语音的，这个可以省掉一大笔订阅费。

https://t.co/a37D7TFfSD
