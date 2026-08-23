---
title: tencent/UI-Mate-27B · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vrhg08/tencentuimate27b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-18T06:42:32.000Z'
fetched_at: '2026-08-18T11:02:01.162Z'
---
Overview
 UI-Mate-27B is an open-weight foundation GUI agent for long-horizon work across applications and operating systems. It observes live screenshots, reasons over the visible state, and produces structured keyboard and mouse actions for native desktop interaction.
 UI-Mate supports two complementary modes:
  
General computer use: execute tasks from natural-language instructions and live screenshots.
 Demonstration-guided computer use: adapt a reusable workflow extracted from one successful demonstration to a new task.
  
A demonstration is treated as guidance rather than a fixed action script. The model continues to re-plan from the live interface when the content, layout, or application state differs.
 Model Details
  
Parameters: 27B
 Base model: Qwen3.6-27B
 Input: task instruction, screenshots, interaction history, and optional demonstration context
 Output: reasoning, a concise action description, and structured computer-use tool calls
 Action space: mouse, keyboard, scrolling, waiting, user interaction, and task completion
 Training: supervised fine-tuning followed by online reinforcement learning in executable GUI environments
 License: Apache-2.0
  
Highlights
  
Strong general computer-use performance across Ubuntu and Windows benchmarks.
 Long-horizon execution across multiple applications.
 One-shot procedural learning from demonstrations.
 Live-screen grounding instead of coordinate replay.
 Structured actions compatible with pyautogui.
 OpenAI-compatible serving and client interface.
  
 arXiv : https://arxiv.org/abs/2608.15930
 PDF : https://arxiv.org/pdf/2608.15930
 GitHub : https://github.com/Tencent/UI-Mate
 Project : https://ui-mate.github.io/ (Check this page for Demo, Benchmarks & Screenshots)
 HuggingFace : https://huggingface.co/collections/tencent/ui-mate
  
   submitted by    /u/pmttyji  
 [link]   [comments]
