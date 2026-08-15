---
title: v0.27.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.27.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-08-10T21:18:11.000Z'
fetched_at: '2026-08-15T11:02:07.504Z'
---
vLLM v0.27.0 Release Notes
Highlights
This release features 561 commits from 242 contributors (64 new)!
Kimi K3 support with a full stack landing in one release: core model files and kernels (#50089, #50000), Python (#50093) and Rust (#50104) frontends, AttnRes kernels (#50090), DeepGEMM support (#50458), compressed-tensors quantized checkpoints (#50500), DSpark AR fusion (#50242), and an option to shard the shared expert instead of replicating it (#50656).
More new models: Qwen3.5 text-only dense and MoE models (#50210) with EVS video token pruning (#48912), K-EXAONE-2.0-750B-A37B (#50524), VaultGemma via the Transformers modeling backend (#49803), and jina-embeddings-v5-text-nano (#50688).
PyTorch 2.13.0 upgrade along with torchvision 0.28.0 and Triton 3.7.1 (#48155) — this is a breaking environment change; XPU (#48677) and CPU (#50412) followed to torch 2.13 as well.
FlashAttention 4 integration deepens on SM100: FP8 KV cache support (#42569) and headdim-256 support (#42669), backed by a new JIT warmup infrastructure (#47451) and runner-owned Triton kernel warmup (#49903) that remove first-request compilation stalls.
DeepSeek-V4 performance push: sequence parallelism (#46789), ~2x kernel improvement by skipping empty c128 launches (#48957), 3.4% E2E TTFT from skipping unneeded topk/router (#49486), 3.9% E2E TTFT from workspace reuse (#49236), 1.88x kernel from removing a redundant full kernel (#50298), adaptive topk width (1.0% E2E, #50004), 448 MiB GPU memory saved in the PP buffer (#50312), a compact MXFP4 indexer KV cache (#48993), and removal of sparse-MLA q-head padding on FlashInfer >= 0.6.14 (#48047).
Model Runner V2 expands to non-generative workloads: encoder-only attention (#49331), sequence pooling for embedding/classification (#48791), encoder token classification (#50293) and token embedding (#50574), BGE-M3 pooling (#50661), multimodal on CPU (#50073), a multi-layer MTP speculator (#48892), and PCP now selects MRV2 (#50034).
Resilient large-scale se
