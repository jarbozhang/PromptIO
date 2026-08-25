---
title: v0.3.0
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/v0.3.0'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-25T10:29:52.000Z'
fetched_at: '2026-08-25T11:01:47.234Z'
---
Overview
llama.cpp 0.3.0 introduces the dots3-note multimodal model (with a new DSA-ISWA KV cache), MTP support for GLM-4.5-Air, and tensor-split (-sm tensor) plus multi-sequence rollback fixes for DeepSeek 4. ggml is bumped to v0.22.0 (meta-backend tensor split, per-op Metal kernels with parallel compilation, non-in-place ggml_clamp), while mtmd gains dots3-note vision/audio, WebP decoding and a Pillow-accurate resize. The server adds a LLAMA_SERVER_SLOTS_N_DIFF debug knob, and the web UI gets tabbed chat navigation.
New models
Add dots3-note model with a new DSA-ISWA KV cache type (#27060)
Core changes
DeepSeek 4: add tensor-split mode via -sm tensor (#26490)
DeepSeek 4: fix rollback with multiple sequences (#26756)
Fix meta tensor split state propagation for tensor parallel (#27574)
GLM-4.5-Air: add MTP (multi-token prediction) support (#26534)
bailingmoe3: support DSpark (#27508)
mamba2: flatten in/out projections to dispatch GEMM instead of GEMV (#27513)
Models: use ggml_rope_set_offset in deepseek2/4, dflash, minicpm3 and plm (#27382)
Grammar: parse \- in char classes as a literal hyphen (#27591)
Common: add json.h abstraction (#27511) with a clang LTO fix (#27575)
Common: fit moved out of the server and now takes n_streams into account (#27496)
Common: fix draft-mtp with embeddings (#27400)
Arg: remove the -no-cnv CLI option (#27542)
Multi-modality changes
Support dots3-note vision and audio (#27524)
Support WebP images via ffmpeg (#27520)
Fix loading videos with the moov atom at the end of the file (#27596)
Use a Pillow-accurate resize algorithm and correct resize_algo for all models (#27594)
Use ggml_rope_set_offset in the CLIP graph (#27521)
Server changes
Add LLAMA_SERVER_SLOTS_N_DIFF env var to widen the slot debug diff window (#27600)
Slot fitting logic moved to the common fit, now accounting for n_streams (#27496)
Adopt the common json.h abstraction (#27511)
UI changes
Tabbed navigation for chat conversations (#27263)
Fix keyboard shortcuts for the cha
