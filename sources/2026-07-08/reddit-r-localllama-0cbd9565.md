---
title: nvidia/Nemotron-Labs-Audex-30B-A3B · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1upnm8x/nvidianemotronlabsaudex30ba3b_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T07:12:25.000Z'
fetched_at: '2026-07-07T23:01:24.260Z'
---
Introduction
 We're excited to introduce Nemotron-Labs-Audex-30B-A3B, a unified audio-text LLM built on Nemotron-Cascade-2-30B-A3B, a strong text-only MoE LLM with 30B MoE model with 3B activated parameters. Audex-30B-A3B extends the vocabulary for discrete audio tokens used for speech and general audio outputs, as well as an audio encoder for speech and general audio inputs. Audex-30B-A3B delivers strong abilities on audio tasks (audio understanding, speech recognition and translation, text-to-speech, audio generation, and speech-to-speech generation) while preserving very compelling reasoning, alignment, knowledge, long-context, and agentic capabilities of its text-only LLM backbone with marginal or no regression. Audex-30B-A3B operates in both thinking and instruct (non-thinking) modes.
 Quick Start
  
Audex-30B-A3B follows the ChatML template and supports both thinking and instruct (non-thinking) modes. Reasoning content is enclosed within <think> and </think> tags. To activate the instruct (non-thinking) mode, we prepend <think></think> to the beginning of the assistant’s response.
 Audex-30B-A3B supports up to a 1M-token context length.
 Audex-30B-A3B follows Nemotron-Cascade-2 on text evaluation.
 Audex-30B-A3B has different recommended inference setups per audio-related task as described below.
  

 Check Model card for so much benchmarks.
 Additional model:
 https://huggingface.co/nvidia/Nemotron-Labs-Audex-2B
    submitted by    /u/pmttyji  
 [link]   [comments]
