---
title: b9180
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9180'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-16T16:49:28.000Z'
fetched_at: '2026-05-17T11:22:35.909Z'
---
llama + spec: MTP Support  (#22673)
spec: support MTP
fix batch size
rename files
cont : simplify (#7)
MTP: clean-up (#9)
MTP: clean-up
review: use llama_context_type instead of llama_graph_type
review: remove llama_model_has_mtp
review: fix convert issues
convert: fix pycheck
review: formatting
use mtp- for identifying mtp models
convert: fix mtp conversion
mtp -> draft-mtp
remove unused llama_arch
add need_embd in speculative
llama: allow partial seq_rm for GDN models for speculative decoding
Currently speculative checkpoint needs to restart from a checkpoint
draft_max by storing the GDN intermediates.
fix pending state
vulkan: add GDN partial rollback
meta: extend check to axis 1
metal: add GDN partial rollback
Extend the gated delta net kernel to store intermediate states for
Add K (snapshot slot count) as a function constant
Read input state from slot 0 of the 3D state tensor
Write intermediate states to different slots during token loop
For K=1, maintain backward-compatible single-slot behavior
Ref: 8c05923
Assisted-by: llama.cpp:local pi
delta_net_base: use ggml_pad instead of new_tensor
review: add need_rs_seq
review: rename part_bounded to n_rs
review: deslop comments
review: rename, add asserts
server : adjust checkpoint logic (#11)
server : adjust checkpoint logic
cont : rm asserts
server-context: fix early exit
spec : fix compatibility with n-gram and add TODOs (#13)
metal : cleanup
llama : fix faulty bitwise check in recurrent memory
server : disable RS-based MTP in combination with other spec types
spec : add TODOs
cont : fix comment
cont : update comment
common : fix logic for ngram + mtp compat
llama-memory: enable checkpointing with partial rollback
cont: add test-case for loading into a dirty ctx
llama-memory-recurrent: clear rs_idx in clear
download: fix mtp path
llama-arch: fix enorm op
docs: update docs
conversion: fix type annotations
Co-authored-by: Georgi Gerganov ggerganov@gmail.com
macOS/iOS:
macOS Apple Silicon (arm64)
macOS Apple Silicon 
