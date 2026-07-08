---
title: b9928
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9928'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-08T19:17:29.000Z'
fetched_at: '2026-07-08T23:02:50.245Z'
---
hexagon: new vtcm layouts and improved pipelines for MUL_MAT, MUL_MAT_ID and FLASH_ATTN_EXT (#25425)
hex-fa: refactor kernel param compute to use common layout builder
hmx: add explicit compiler barriers to make hmx funcs more robust
hex-vtcm: more generic vtcm layout builder for mm and flash-attn kernels
hex-hmx: unroll inner kernels
hex-hmx: use inline asm instead of intrinsics to avoid compiler issues
hex-hmx: define inline asm macros and simplify code
hex-hmx: replace leftover intrinsics
hmx-fa: minor cleanup for hmx asm
hmx-mm: move per-task stucts out of the kernels header
hmx-mm: simplify core_dot_chunk
hmx-mm: simplify inner loops that call hmx instructions
hmx-mm: proper instrumentation for activation prep work for dma pipelined version
hmx-mm: update a-prep loop for better prefetch
hex-vtcm: improved vtcm layout alloc for mm to support overlapping areas
hmx-mm: reduce the number of act fetch tows to 4 for now, going larger doesnt help here
hex-hmx: always use hmx-queue in all modes
hmx-mm: update comments and minor formatting
hmx-mm: further improve synchro fallback path to prefetch the weights earlier
hex-fa: further pipeline improvements (earlier prefetch)
hmx-mm: cleanup dma pipelines to use dst cached in the queue
hmx-fa: minor cleanup and opts for fa dma pipelines
hmx-fa: optimize q-prep stage with dma and unrolling
hmx-fa: use o_tile size from layout instead of computing it
hmx-mm: cleanup types and size handling
hmx-mm: replace divs with fastdiv in qprep loops
hmx-fa: minor update/formatting to q_tile handling
hmx-fa: cleanup the layout to avoid overpadding
hmx-fa: simplified and improved cost mode for hmx fa solver that uses vtcm layout funcs
hmx-queue: add support queue wakeup and make suspend async to avoid hmx-lock latency
hex-hmx: move queue wakeup / suspend to the op-batch level
hex-threads: add hybrid polling to workpool
hex-mm: fix trailing spaces
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled) DISABLED
m
