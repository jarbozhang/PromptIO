---
title: b9857
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9857'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-01T14:42:51.000Z'
fetched_at: '2026-07-02T23:01:44.346Z'
---
hexagon: flash attention rework (optimizations, accuracy improvements, etc) (#25085)
hex-mm: fold mm quant tasks into the main matmul threads
hex-mm: minor formatting fixes
hex-mm: cleanup is_quant checks in dma dispatch
hex-mm: fix dst-spad alignment
hex-mm: move fp kernels in the hvx-mm-kernels header
hex-mm: fuse with ADD
hex-fa: factor out ukernels into separate headers and unify the rest
hex-fa: move kernel-params compute into the host
hex-fa: refactor vtcm alloc for consistency
hex-fa: add support for FA_SELECT
hex-fa: update tracing insrumentation to cover all functions
hex-fa: update hvx fallback thresholds to recover t/g regressions
hex-fa: update tracing instrumentation
hex-fa: improved tracing with additional events
hex-fa: optimize mask processing (fastdiv, etc)
hex-fa: improve mask dma caching
hmx-fa: change loop order to maximize mask cache hits
hex-fa: remove over instrumentation
hex-fa: breakdown QKV prep trace events
hmx-fa: further mask proc optimizations
hex-fa: mask broadcast is the common case, optimize for that
hex-fa: use aligned loads where possible
hex-fa: update loops to use uint32_t indices
hmx-fa: fold vtcm init into q prep task
hex-fa: update rest of the hmx funcs to use uint32_t
hmx-fa: fold build_d into the main softmax loop
hmx-fa: start kv dmas earlier
hmx-fa: start mask dma a bit earlier
hex-fa: precompute rows per task to avoid divs
hmx-fa: specialize fa_o_store for f16 and f32
hmx-fa: prelim support for Sinks
hmx-fa: keep softmax accumulators in fp32
hex-fa: add tanh_f16 and exp2_f16 and use that in FA
hex-fa: use fp16 math in the hvx kernel
hex-fa: avoid expensive float -> __fp16 cast for slopes and softcap
hex-fa: replace most vec_exp_f32 with vec_exp2_f16
hmx-fa: vectorize sinks update
hex-fa: minor formatting
hmx-fa: fold softcap loop into the tile load
hmx-fa: use vectoralias to populate sinks
hex-fa: remove redudant check
hex-fa: fix vtcm size compute to use fp32 for accumulators
hex-mm: fix trailing spaces
hmx-fa: dont use 
