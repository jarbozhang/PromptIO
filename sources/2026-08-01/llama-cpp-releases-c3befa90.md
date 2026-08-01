---
title: b10208
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10208'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-31T16:05:25.000Z'
fetched_at: '2026-08-01T11:02:02.626Z'
---
SYCL: add oneMKL GEMM flash attention for XMX-accelerated prompt proc… (#25025)
SYCL: add oneMKL GEMM flash attention for XMX-accelerated prompt processing
fattn-mkl: fix interleaved dst layout in normalize kernel
Fix mkl_fa_normalize_head: use interleaved dst layout
Remove 7 redundant stream->wait() calls — SYCL in-order queue
Remove unused dst_row_stride, diagnostic clutter, and dead
Add MKL_FA_DISABLE=1 env var for A/B testing.
Add FA-DISP watchdog (MKL_FA_DEBUG=1) and FA-DIAG output
Tested: Gemma-4-26B, Gemma-4-31B, Qwen3.6-27B, Qwen3.6-35B-A3B
Co-Authored-By: Claude Code on DeepSeek-v4-Pro
Thank you for the review feedback: rename env vars, use GGML_LOG_INFO, document in SYCL.md
Completed the following:
Rename MKL_FA_DISABLE → GGML_SYCL_ENABLE_MKL_FA (inverted: 0 to disable)
Rename MKL_FA_DEBUG → GGML_SYCL_MKL_FA_DEBUG
Rename MKL_FA_DIAG → GGML_SYCL_MKL_FA_DIAG
Replace fprintf(stderr, ...) / fflush(stderr) with GGML_LOG_INFO() macro
Document all three env vars in docs/backend/SYCL.md under Runtime
Add comment explaining MKL FA activation trigger (flash-attn + quantized
Resolves review feedback from arthw.
Co-Authored-By: Claude Code on DeepSeek-v4-Pro
Thank you for the review feedback round 2: use ggml_sycl_get_env, remove dup waits, gate perf macros
Replace raw getenv() with ggml_sycl_get_env() in all 4 env-var checks
Remove duplicated stream->wait() before ev.wait_and_throw() in GEMM
Gate MKL_ACCUM macro behind do_print so timing accumulators are
Remove redundant MIT/Intel copyright header from fattn-mkl.cpp
Remove unused #include 
Expand SYCL.md MKL FA docs with step-by-step activation trigger
Again, thank you!!!
Co-Authored-By: Claude Code on DeepSeek-v4-Pro
fattn-mkl: enable MKL FA for all KV cache types
Remove the quantized-only restriction on MKL activation — the MKL
Before (F16/BF16 default cache + FA on at 32K prefill): ~356 t/s (TILE path)
Minimal change: two conditions removed, one comment updated in fattn.cpp.
fattn-mkl: rename mkl_disable -> mkl_en
