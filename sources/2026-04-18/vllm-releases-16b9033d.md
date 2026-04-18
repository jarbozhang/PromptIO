---
title: v0.18.1
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.18.1'
source: vLLM Releases
source_type: rss
language: en
published: '2026-03-31T05:59:49.000Z'
fetched_at: '2026-04-18T02:24:43.792Z'
---
This is a patch release on top of v0.18.0 to address a few issues:
Change default SM100 MLA prefill backend back to TRT-LLM (#38562)
Fix mock.patch resolution failure for standalone_compile.FakeTensorMode on Python <= 3.10 (#37158)
Disable monolithic TRTLLM MoE for Renormalize routing #37605
Pre-download missing FlashInfer headers in Docker build #38391
Fix DeepGemm E8M0 accuracy degradation for Qwen3.5 FP8 on Blackwell (#38083)
