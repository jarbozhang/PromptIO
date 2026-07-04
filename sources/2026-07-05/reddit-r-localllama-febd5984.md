---
title: 'RTX5090, gemma-4-31B-it-Q6_K.gguf. Context: before - 35k, after - 80k!'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1un6c4s/rtx5090_gemma431bitq6_kgguf_context_before_35k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-04T11:09:59.000Z'
fetched_at: '2026-07-04T23:01:32.106Z'
---
Yesterday there was a message that you can increase the context for Deepseek Flash. But it turned out that everything works for Gemma4 too!
 function dockergemma () {
 docker run \
 -e GGML_CUDA_NO_PINNED=1 \
 -p "$PORT_GEMMA":"$PORT_GEMMA" \
 -v "$LLM_PATH" \
 -v "$WORKSPACE_PATH" \
 --gpus "$LLM_GPU1" "$LLM_DOCKER_IMAGE" \
 --host 0.0.0.0 --threads 23 --flash-attn on --fit off --main-gpu 1 --jinja \
 --port "$PORT_GEMMA" \
 --ctx-size 80000 \
 --temp 1.0 \
 --top-p 0.95 \
 --top-k 64 \
 --ubatch-size 128 --batch-size 128 \
 --tools all \
 --no-mmap \
 --backend-sampling --parallel 1 \
 -m /models/new/gemma-4-31B-it/gemma-4-31B-it-Q6_K.gguf
 }
 Tips:
 1. GGML_CUDA_NO_PINNED=1 
 2. --backend-sampling --parallel 1
 3. For the llama.cpp web interface, check the "Backend sampling" checkbox.
    submitted by    /u/Defiant_Diet9085  
 [link]   [comments]
