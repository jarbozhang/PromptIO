---
title: b9951
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9951'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-10T16:16:43.000Z'
fetched_at: '2026-07-10T23:02:34.306Z'
---
ggml-et: Initial ET backend  (#24179)
ggml-et: Add performance logging
ggml-et: Quants helpers
ggml-et: Add MUL_MAT kernel
ggml-et: Add ROPE kernel
ggml-et: Add RMS_NORM kernel
ggml-et: Add GLU kernel
ggml-et: Add SOFT_MAX kernel
ggml-et: Add GET_ROWS kernel
ggml-et: Add CONT kernel
ggml-et: Add SET_ROWS kernel
ggml-et: Add MUL_MAT_ID kernel
ggml-et: Build et kernels as part of ggml
ggml-et: Embed kernels with fs fallback
ggml-et: Build fixes
ggml-et: Add MUL_MAT F32xF32 op
ggml_et: Add MUL_MAT_ID op
ggml-et: Disable offloading for debug
ggml-et: Refactor out block ops
ggml-et: ggml backend API changes
ggml-et: Add RESHAPE/TRANSPOSE to supported
ggml-et: Add CONT_F16
ggml-et: Add supported ops doc
gglm-et: Initial doc
ggml-et: Remove  runtime import hacks
We can now import the runtime by a simple find_package(), so we
ggml-et: Fix GET_ROWS kernel
Fix lost batch dimension.
Also clean vibe-comments.
ggml-et: Fix SET_ROWS kernel
Remove incorrect broadcasting guard.
ggml-et: Use custom instruction for fp32->fp16
ggml-et: Vectorize set_rows fp32->fp16
ggml-et: Fix ROPE kernel (yarn)
ggml-et: fix et_logf
WIP: Fix ramp
WIP: fix ROPE!
ggml-et: Better sinf
ggml-et: Fix SOFT_MAX
Add max_bias and sink support.
ggml-et: Fix CONT
Reorder from contiguous write to read with atomic stores.
ggml-et: Fix elmap kernel
Remainder handlin
ggml-et: Fix MUL_MAT MUL_MAT_ID remainders
ggml-et: Fix ET-SOC reference
ggml-et: Fix embed kernels scripts for old python
This allows GGML-ET to build on pre-3.8 python.
Add sysemu support with compile time flag -DGGML_ET_SYSEMU=ON (#6)
Example using ET-Soc-1 emulator configuration
Example usage:
cmake -B build -DGGML_CUDA=OFF -DGGML_ET=ON -DLLAMA_CURL=OFF -DGGML_CCACHE=ON
cmake --build build --config Release -j $(nproc)

time ./build/bin/test-backend-ops

./build/bin/llama-server \
    --model Qwen3-0.6B-Q8_0.gguf \
    --alias Qwen3-0.6B-Q8_0 \
    -fa 0 \
    --ctx-size 1024 \
    --no-warmup \
    --host 127.0.0.1 \
    --port 8080



build: proper
