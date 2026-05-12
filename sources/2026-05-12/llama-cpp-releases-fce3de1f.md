---
title: b9109
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9109'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-11T21:14:39.000Z'
fetched_at: '2026-05-12T11:42:46.902Z'
---
spec : parallel drafting support (#22838)
spec : refactor
spec : drop support for incompatible vocabs
spec : update common_speculative_init()
cont : pass seq_id
cont : dedup ctx_seq_rm_type
server : sketch the ctx_dft decode loop
server : draft prompt cache and checkpoints
server : improve ctx names
server, spec : transition to unified spec context
cont : sync main and drft contexts
cont : async drft eval when possible
cont : handle non-ckpt models
cont : pass correct n_past for drafting
cont : process images throught the draft context
spec : handle draft running out of context
server : fix mtmd draft processing
server : fix URL for draft model
server : add comment
server : clean-up + dry
speculative-simple : update
spec : fix n_past type
server : fix slot ctx_drft ptr
tools : update readme
naming : improve consistency
spec : refactor for multi-sequence speculative context
cont : prepare params
cont : prepare params
spec : support parallel drafts
server : support parallel drafting
llama : reuse device buffers when possible
server, spec : clean-up
cont : clean-up
cont : minor
spec : reset drafting flag at the end
spec : introduce common_speculative_process()
spec : allow for multiple spec types (chain of speculators)
replace old type field of type common_speculative_type in the
introduce common_get_enabled_speculative_impls(const std::vector)
introduce common_speculative_type_from_names(const std::vectorstd::string & names)
all speculators run sequentially, best one wins (we verify its drafted tokens)
maximize expected accepted tokens for current round by calculating the
Co-authored-by: Petros Sideris petros.sideris@nokia.com
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
Ubuntu x64 (SYCL FP32)
Ubuntu x64 (SYCL FP16)
Android:
Android arm64 (CPU)
Windo
