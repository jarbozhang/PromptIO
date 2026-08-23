---
title: "作者提到的开源底座大概率是 Hugging Face 的 speech-to-speech： https://t.co/qxCN9xUIbT 它把本地语音助手拆成四层： \U0001F399 Silero VAD：判断你什么时候开始/停止说话 \U0001F4DD Whisper：把语音转成文字 \U0001F9E0 LLM：生成回答，可接本地 llama.cpp \U0001F50A Qwen3-TTS：把回答变成语音"
source: X @xiangxiang103
url: 'https://x.com/xiangxiang103/status/2081203794441089244'
date: 'Sun Jul 26 02:23:46 +0000 2026'
likes: 87
reposts: 17
replies: 16
source_type: x
language: zh
account_name: xiangxiang103
fetched_at: '2026-07-30T11:14:03.879Z'
---
作者提到的开源底座大概率是 Hugging Face 的 speech-to-speech：
https://t.co/qxCN9xUIbT

它把本地语音助手拆成四层：
🎙 Silero VAD：判断你什么时候开始/停止说话
📝 Whisper：把语音转成文字
🧠 LLM：生成回答，可接本地 llama.cpp
🔊 Qwen3-TTS：把回答变成语音

注意：这只是语音对话底座，不包含视频里的角色形象；官方默认配置也不是完全离线，需要接入本地 llama.cpp 才能做到不联网。

有想尝试的兄弟可以研究一下这个项目，如果想把嘴型、表情、眨眼、微表情做出来,估计还得研究Live2D、VTube Studio或 Unity Avatar
