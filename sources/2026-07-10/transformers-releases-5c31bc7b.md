---
title: Release v5.9.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.9.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-05-20T14:12:54.000Z'
fetched_at: '2026-07-09T23:01:53.836Z'
---
Release v5.9.0
New Model additions
Cohere2Moe
Command A+ is a Mixture-of-Experts (MoE) language model from Cohere that features a hybrid attention pattern combining sliding window and full attention layers. The model incorporates both shared and routed experts and supports a very large context window for processing extensive text sequences.
Links: Documentation
Add new cohere2_moe model (#46115) by @Cyrilvallez in #46115
Parakeet tdt (#44171)
Parakeet tdt (#44171) by @lmaksym
HRM-Text
HRM-Text is an improved autoregressive language-modeling variant of the Hierarchical Reasoning Model (HRM) that uses a hierarchical recurrent forward pass with two transformer stacks - one for slow, abstract planning (H) and one for fast, detailed computation (L) - reused inside a nested recurrence. It features PrefixLM attention where instruction tokens attend bidirectionally while response tokens attend causally, per-head sigmoid output gates, and parameterless RMSNorm. The model is designed as a base language model without instruction tuning or chat templates.
Links: Documentation | Paper
Add hrm text (#46025) by @abcd1927 in #46025
Breaking changes
The text_embeds input for SAM3, EdgeTAM, and SAM3-Lite-Text models now expects full text embeddings instead of just pooler outputs, aligning with other models in the library — users must update their inputs accordingly.
🚨Fix memory leaks caused by lru decorators in vision models (#45922) by @yonigozlan
Audio
Audio support was expanded with the addition of AudioFlamingoNext model checkpoints and improved compilability of audio/vision encoders via standalone pure functions. Additional improvements include better error messaging when loading audio from video files and new documentation for audio/video processors.
user friendly error when loading audio from video (#45221) by @eustlb in [#45221]
[docs] adding audio/video processors (#45795) by @stevhliu in [#45795]
Support Audio Flamingo Next checkpoints (#44830) by @lashahub in [#44830]
Ext
