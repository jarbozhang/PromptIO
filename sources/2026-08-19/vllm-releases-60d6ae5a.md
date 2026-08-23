---
title: v0.26.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.26.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-07-27T06:52:36.000Z'
fetched_at: '2026-08-19T11:02:41.677Z'
---
vLLM v0.26.0 Release Notes
Highlights
This release features 411 commits from 212 contributors (61 new)!
New Inkling model family with a full support stack: base modeling (#48799), piecewise CUDA graph support (#48822), Hopper FA4 relative attention (#48858), MTP=1 speculative decoding (#48869), LoRA (#48884), and standard ModelOpt NVFP4 quantization (#48990).
DeepSeek-V4 performance push across vendors: a specialized routing kernel (2.94% E2E TPOT, #48660), fused_topk_bias (1.5–2x kernel, #47463), and redundant repeat/copy removal (1.8% E2E TPOT, #48137), plus ROCm two-stage compressor for HCA prefill (#47718), sparse decode/prefill optimizations (#48519, #48788, #46275), and DSpark speculative decoding on AMD (#47419) and XPU (#47677).
fp32 lm_head for generation models via head_dtype (#48390), extended to the LoRA path (#48525) and given a ROCm torch.mm fast path (#48688), improving accuracy for generation heads.
Flexible attention backends: the attention backend can now be selected per KV-cache group (#48012), and sliding-window support is now an explicit backend capability (#48011) — improving support for hybrid models.
KV offloading & tiered secondary storage matured substantially: offloading metrics (#45958, #47666, #47679), tier-owned event handling (#46544, #47923), object-store secondary tier with workload identity (#47063, #47274, #48150), DP-replica-aware tiering (#47987), and encoder-cache (EC) connectors including CPU offloading (#42433, #47423).
Rust frontend gained multimodal video (#47959) and audio (#48554), a Seed-OSS tool parser (#47741), and a native vllm-bench port (#48107).
Transformers 5.13.0 (#47867) with more models migrated to the Transformers modeling backend: Olmo/Olmo2 (#48100), MistralLarge3 (#48153), and HunyuanVL (#47872).
Model Support
New models: Inkling family (#48799, #48822, #48858, #48869, #48884, #48990), BertForMaskedLM (#48463), RobertaForTokenClassification / XLMRobertaForTokenClassification (#47991), LongCat-Flash-Lite n-gr
