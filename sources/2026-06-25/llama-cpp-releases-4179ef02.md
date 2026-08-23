---
title: b9784
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9784'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-06-24T19:57:28.000Z'
fetched_at: '2026-06-25T07:41:36.957Z'
---
hexagon: MUL_MAT and MUL_MAT_ID rework : 32x32 tiled weight repack, kernel-params, cached graphs (#24954)
hex-mm: new weight layout and fusion updates
hvx-mm: unroll the new tiled vec_dots to optimize hvx register util
hex-mm: optimize dyn.quant format for q8_0 and q8_1 to reduce overhead in vec_dots.
hvx-mm: parallel quantizer per block for large rows
hvx-mm: simplify and futher optimize dyn.quant and vec_dots
hvx-mm: keep intermediate per tile accumulators in fp16
hmx-mm: optimize weight dequant by aligning the repacked tiles with the DMA
hmx-mm: remove qweight scratch and just use vtcm_weight
hmx-mm: remove all unused and obsolete code
hmx-mm: the new tiled repack format is here to stay -- rename all x4x2 to _tiled
hmx-mm: improve activation processing with dma prefetch
hex-mm: fix hmx/hvx fallback logic and MUL_MAT_ID allocation (unbreaks OLMoE)
hex-mm: align the weight tiles with dma just like we did in hmx-mm
hex-mm: factor out common mm bits into htp/matmul-ops.h
hex-mm: start moving mm kernel selection to the host
hex-mm: move all of the matmul param compute into the host
hmx-mm: restore pipelined mode
hmx-mm: unroll the dequant functions to optimize register usage
hmx-mm: further improve activation process
hex-mm: use vtcm_seq_alloc for all vtcm allocations and define more common functions
hex-mm: improve mm optimizer to acount for number of activation threads
hex-mm: fix matmul-id kernel params selection (unbreaks OLMoE and LFM)
hexagon: remove support for arch < v73 since HMX is now required for most use-cases
hex-mm: cleanup naming for consistency
hex-mm: make sure matmul fusion accounts for vtcm allocation
hex-mm: minor cleanup for kernel_params definition
hex-mm: replace hardcoded limits with proper checks for vtcm requirements
hex-mm: add support for non-tiled mm as a fallback option and factor out hvx kernels into separate header
hex-mm: remove unused functions
hex-mm: add shorthand for MM_SELECT in run-tool script
hvx-mm: factor out hvx/hmx microker
