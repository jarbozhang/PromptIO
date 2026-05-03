---
title: b9000
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9000'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-02T05:09:15.000Z'
fetched_at: '2026-05-03T12:56:12.693Z'
---
hexagon: hmx flash attention (#22347)
hmx: extract shared interleave headers and unify matmul batched
hmx: add HMX-accelerated flash attention for prefill
hmx: replace asm wrappers with Q6_ intrinsics in hmx-utils.h
Switches three single-instruction helpers from inline asm to the matching
f873760 and used
#21554 hmx-matmul-ops.c rewrite:
hmx_set_output_scales       asm "bias=mxmem2"  -> Q6_bias_mxmem2_A
hmx_load_tiles_fp16 stays on inline asm: it uses ":deep" activation
Functionally equivalent — same instructions emitted; the Q6_ intrinsics
hmx: drop the duplicate interleave_fp16_weight_chunk_to_tiles
hmx:  apply upstream optimization to hmx-flash-attn-ops.c
hmx: unify interleave helper
hmx: multi-thread Q load / O store and enable prefill FA dispatch
Extract inline Q-load and O-store loops into worker_pool-parallel helpers
On the dispatch side, remove the ne[2] != 1 guard that blocked multi-head
hmx: relax matmul pipeline gate to cover k > n shapes (e.g. FFN_down)
hmx: optimize FA softmax mask phase (no-ALiBi fast path + GQA dedup)
hmx: Add an asm memory clobber at the phase boundary to prevent reorder bug
[experimental]: fp16 softmax (EXP2_HF) to accelerate fa
Bake log2(e) into qk_scale and use hvx_exp2_hf directly for P and m_diff
hmx flash-attn: refine cost model coefficients based on profiling data
hmx flash-attn: replace asm clobber with targeted volatile reads on vtcm_d_tiles
hmx flash-attn: fix prefill correctness (dst indexing, softmax reduce, V stride)
hmx flash-attn: fix p_tiles dual-tile OOB race; enable MT + pipeline
hmx flash-attn: preserve additive mask bias in no-ALiBi fast path
The no-ALiBi fast path (max_bias==0) was skipping mask add entirely on
Also add HMX FA coverage to test-backend-ops: prefill shapes (nb=64,
hmx: fix softcap+EXP2_HF interaction, tighten matmul pipeline gate, add FA tests
flash-attn: when EXP2_HF is on AND logit_softcap is active, fold
flash-attn softmax (fa_softmax_thread): replace the union+memcpy
matmul (hmx_mat_mul_permute
