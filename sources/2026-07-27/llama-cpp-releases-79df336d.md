---
title: b10142
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10142'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-07-27T00:22:24.000Z'
fetched_at: '2026-07-27T11:02:23.369Z'
---
mtmd: Add Vision Support for Minimax-M3 (#25113)
Add preliminary MiniMax-M3 support
Text-only port that re-uses existing components: MiniMax-M2 style GQA with
MiniMax-M3 vision tower (mmproj + clip graph)
Delete m3_vision_ref.py
Update clip.cpp
MSA
Update constants.py
Update minimax.py
Cache creation. Working withotu flash attention
Added flash attention for sparse layers
Decomposed slow cpu OP into GPU + CPU ops. Massive speedup over long ctx
Rewrote indexer op to be cuda native. Modified flash attention to match per group block picking
Implement sparse attention calc out of stock ops.
Fix a cache allocation and cont issue
Fixed -fa auto crash, flagged debug spots
Delete vocab.json
Delete model.safetensors.index.json
Delete generation_config.json
Delete Minimax directory
Handled multi stream case to fall back on Dense Attention
Development scaffolding cleanup. No functional change to the decode or
Remove redundant comment from minimax-m3.cpp
Changed 3 Gelu Ops for vision into Gelu_erf ops
Assert that n_kv is multiple of 128
Rename MSA index tensors to indexer convention
Note: All GGUFs generated before this change will need to be regenerated.
Fix incorrect Assert
Review driven changes (#3)
Remove comment from conversion minimax.py
Co-authored-by: Sigbjørn Skjæret 1629204+CISC@users.noreply.github.com
Remove whitespaces from constants.py
Co-authored-by: Sigbjørn Skjæret 1629204+CISC@users.noreply.github.com
Tighten comment in minimax.py
Co-authored-by: Sigbjørn Skjæret 1629204+CISC@users.noreply.github.com
inherit MiniMax-M3 from MiniMax-M2
drop dead text_config fallbacks
Add indexer writer methods
Reuse LLM_FFN_SWIGLU_OAI_MOE
Remove duplicate  indexer setters, add only block_size/local_blocks, follow value naming convention
Fix conversion error /gguf_writer.py
Co-authored-by: Sigbjørn Skjæret 1629204+CISC@users.noreply.github.com
Update gguf-py/gguf/gguf_writer.py
Co-authored-by: Sigbjørn Skjæret 1629204+CISC@users.noreply.github.com
Update gguf-py/gguf/tensor_mapp
