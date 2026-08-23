---
title: v0.22.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.22.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-06-02T18:14:39.000Z'
fetched_at: '2026-06-23T01:36:16.195Z'
---
Highlights
This release features 459 commits from 230 contributors (63 new)!
DeepSeek V4 maturity: DeepSeek V4 received a major hardening pass this cycle — the model was reorganized into a dedicated vllm/models/deepseek_v4/ package (#43004, #43039, #43073, #43077, #43149), gained NVFP4 fused MoE support (#42209), full + piecewise CUDA graph (#42604), and MTP speculative decoding (#43385). A large set of fused kernels (MegaMoE, mhc, Q-norm, indexer, sparse MLA) and ROCm parity fixes landed alongside accuracy fixes (#42810, #43710).
Model Runner V2 advances toward default: MRv2 is now default for Qwen3 dense models. vLLM will fall back to MRv1 for features that aren't yet supported in MRv2 (#39337). sleep-mode weight reload (#42673), update_config (#42783), and shared KV-cache layers (#35045), plus many correctness fixes.
Experimental Rust frontend: A new Rust front-end integration landed (#40848), with the implementation moved into the tree (#43283) and a DP Supervisor for data-parallel serving (#40841).
Batch invariance, faster: Batch-invariant inference gained Cutlass FP8 support for a 28.9% end-to-end latency improvement (#40408), compile-mode support on SM80 (#42456), and an NVFP4 Cutlass linear path (#39912).
Multi-tier KV cache offloading: A new multi-tier KV cache offloading framework (#40020) with a Python filesystem secondary tier (#41735), DSv4 support (#43142), and Mooncake disk offloading (#42689) extends offloading beyond CPU memory.
Model Support
New architectures: MiniCPM-V 4.6 (#41254), InternS2 Preview (#42705), OpenVLA (#42654), MolmoWeb hf_overrides docs (#42163); EXAONE-4.5 aligned with Transformers update (#42246).
Speculative decoding: custom callable proposer backend (#39487), post-norm EAGLE-3 speculators (#42764), peagle speculators (#41826), hybrid-attention models in extract_hidden_states (#39949), non-MTP speculation for NemotronH (#43130), shared MTP weights in MRv2 (#42538).
DeepSeek V4: NVFP4 MoE (#42209), CUDA graph full/piecewise (#42
