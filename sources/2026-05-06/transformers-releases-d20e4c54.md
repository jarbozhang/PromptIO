---
title: Release v5.7.0
url: 'https://github.com/huggingface/transformers/releases/tag/v5.7.0'
source: Transformers Releases
source_type: rss
language: en
published: '2026-04-28T18:32:50.000Z'
fetched_at: '2026-05-06T09:11:19.562Z'
---
Release v5.7.0
New Model additions
Laguna

Laguna is Poolside's mixture-of-experts language model family that extends standard SwiGLU MoE transformers with two key innovations. It features per-layer head counts allowing different decoder layers to have different query-head counts while sharing the same KV cache shape, and implements a sigmoid MoE router with auxiliary-loss-free load balancing that uses element-wise sigmoid of gate logits plus learned per-expert bias for router scoring.
Links: Documentation
Laguna XS.2 implementation (#45673) by @joerowell in #45673
DEIMv2

DEIMv2 (DETR with Improved Matching v2) is a real-time object detection model that extends DEIM with DINOv3 features and spans eight model sizes from X to Atto for diverse deployment scenarios. It uses a Spatial Tuning Adapter (STA) for larger variants to convert DINOv3's single-scale output into multi-scale features, while ultra-lightweight models employ pruned HGNetv2 backbones. The unified design achieves superior performance-cost trade-offs, with DEIMv2-X reaching 57.8 AP with only 50.3M parameters and DEIMv2-S being the first sub-10M model to exceed 50 AP on COCO.
Links: Documentation | Paper
model: Add DEIMv2 to Transformers (#44339) by @harshaljanjani in #44339
Attention
Several attention-related bugs were fixed across multiple models, including a cross-attention cache type error in T5Gemma2 for long inputs, incorrect cached forward behavior in Qwen3.5's gated-delta-net linear attention, and a crash in GraniteMoeHybrid when no Mamba layers are present. Attention function dispatch was also updated to align with the latest model implementations.
Fix cross-attention cache layer type for T5Gemma2 long inputs (#45540) by @Beichen-Ma in [#45540]
[Qwen3.5] Fix GDN linear attention multi-token cached forward (#45513) by @kashif in [#45513]
Fix GraniteMoeHybrid _update_mamba_mask crash on attention-only models (#45514) by @tianhaocui in [#45514]
Align latest model attention function dispatch (#45598
