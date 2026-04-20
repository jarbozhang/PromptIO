---
title: b8842
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8842'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-19T11:33:20.000Z'
fetched_at: '2026-04-20T05:39:26.236Z'
---
server : speculative checkpointing (#19493)
server : speculative decoding using checkpoints
server : fix draft check with checkpoints
server : rename spec vars
server : log levels
server : refactored spec logic to speculative.cpp
server : renamed spec checkpoints option
server : fix spec checkpoints, logging
speculative : checkpoints with draft model, logging
server : n_tokens_cur and create_checkpoint in draft
server : fix server_speculative_callback (slot.id)
spec : fix ngram-map/begin idx_last_check
spec : init ckpt (begin() wasn't called)
chore: update webui build output
server : restore sampler in spec checkpoint and clear mem
cont : avoid --spec-use-checkpoints argument
cont : remove server_prompt_checkpoint_with_size
spec : rename (leave_draft_state)
cont : clean-up
cont : do not ignore partial drafts even if the are short
cont : spec callback owned by session
cont : simplify
cont : avoid empty speculative session
cont : simplify
cont : simplify
cont : enable mtmd speculative decoding
cont : keep the spec sampler alive
cont : simplify
cont : fix nullptr deref + draft checkpoints
cont : remove common_speculative_accept_response
cont : remove callback
cont : simplify
cont : minor
cont : simplify
cont : fix accepted number
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon (arm64, KleidiAI enabled)
macOS Intel (x64)
iOS XCFramework
Linux:
Ubuntu x64 (CPU)
Ubuntu arm64 (CPU)
Ubuntu s390x (CPU)
Ubuntu x64 (Vulkan)
Ubuntu arm64 (Vulkan)
Ubuntu x64 (ROCm 7.2)
Ubuntu x64 (OpenVINO)
Android:
Android arm64 (CPU)
Windows:
Windows x64 (CPU)
Windows arm64 (CPU)
Windows x64 (CUDA 12) - CUDA 12.4 DLLs
Windows x64 (CUDA 13) - CUDA 13.1 DLLs
Windows x64 (Vulkan)
Windows x64 (SYCL)
Windows x64 (HIP)
openEuler:
openEuler x86 (310p)
openEuler x86 (910b, ACL Graph)
openEuler aarch64 (310p)
openEuler aarch64 (910b, ACL Graph)
