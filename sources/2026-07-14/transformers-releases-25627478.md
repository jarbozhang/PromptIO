---
title: Release v5.13.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.13.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-07-03T16:06:27.000Z'
fetched_at: '2026-07-13T23:03:10.963Z'
---
Release v5.13.0
New Model additions
KimiK 2.5, 2.6, and 2.7

This release includes the architecture for Kimi 2.5 which is used by 2.5-2.7:
Kimi K2.5 is an open-source, native multimodal agentic model that advances practical capabilities in long-horizon coding, coding-driven design, proactive autonomous execution, and swarm-based task orchestration. The model was proposed in Kimi K2.5: Visual Agentic Intelligence and further improved in [Kimi K2.6: Advancing Open-Source Coding](Kimi K2.5: Visual Agentic Intelligence).
Kimi K2.5 achieves significant improvements on complex, end-to-end coding tasks, generalizing robustly across programming languages (Rust, Go, Python) and domains spanning front-end, DevOps, and performance optimization. The model is capable of transforming simple prompts and visual inputs into production-ready interfaces and lightweight full-stack workflows, generating structured layouts, interactive elements, and rich animations with deliberate aesthetic precision.
Links: Documentation
Add new model: Kimi2-6 (#45630) by @zucchini-nlp in #45630
MiMo-V2-Flash

MiMo-V2-Flash is a Mixture-of-Experts (MoE) language model developed by the Xiaomi MiMo team. Designed to establish a new balance between long-context modeling capabilities and inference efficiency, the model is built for strong performance in complex reasoning and agentic tasks. Trained on 27T tokens with native 32k sequence lengths, MiMo-V2-Flash seamlessly supports an extended 256K context window while significantly reducing KV-cache storage compared to standard global attention models.
Links: Documentation
Add Xiaomi MiMo-V2 (#45144) by @casinca in #45144
Nemotron 3.5 ASR

Nemotron 3.5 ASR is a 600M-parameter multilingual speech recognition model from NVIDIA, built for high-quality transcription in both low-latency streaming and high-throughput batch settings, with native punctuation and capitalization. For streaming, it offers configurable chunk sizes—80ms, 160ms, 560ms, and 1120ms, letting u
