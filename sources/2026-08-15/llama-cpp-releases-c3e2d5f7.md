---
title: b10437
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10437'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-15T05:26:10.000Z'
fetched_at: '2026-08-15T11:02:06.206Z'
---
model : add support for MiniMaxText01ForCausalLM and MiniMaxM1ForCausalLM (#27018)
llama : support for MiniMax-Text-01 model
chore : renames to match the other MiniMax models
model : add logits mask as MiniMax-Text-01 embeddings tensor has zero-valued embeddings for tokens >= 200032 that produce zero logits disrupting the token sampling process
llama : replace hardcoded conditions with hparams.is_recr()
model : used build_rs() for recurrent state management
chore : code cleanup
model : optimized MiniMax-Text-01 by removing the state tranpose operations
chore : removed unnecessary ggml_cont() in MiniMax-Text-01 implementation
llama : add generic logits mask graph input
model : permuted diag_decay dimensions to avoid doing it inside MiniMax-Text-01 graph
chore : code cleanup
chore : code cleanup
model : use token positions when calculating MiniMax-Text-01 decay tensors
convert : add support for MiniMaxM1ForCausalLM as it seems to be the same as MiniMaxText01ForCausalLM
chat : add jinja template for MiniMax-M1
Co-authored-by: QscQ qscqesze@gmail.com
chore : code cleanup
tests : MINIMAX_01-related fixes
chore : silence Python lint errors
vocab : remove unnecessary vocab type
convert : update MiniMaxText01Model conversion to use yield when modifying tensors
convert : suppress tokens with zero-valued embeddings during MiniMax-Text-01 conversion
llama : removed logits mask - no longer necessary as token suppression is used instead
model : use common functions to make MiniMax-Text-01 implementation more concise
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@huggingface.co
model : use common functions to make MiniMax-Text-01 implementation more concise
Co-authored-by: Sigbjørn Skjæret sigbjorn.skjaeret@huggingface.co
convert : override non-working built-in chat template during conversion
tests : skip arch MINIMAX_01 tests for WebGPU backend (it breaks again)
Co-authored-by: Stanisław Szymczyk sszymczy@gmail.com
qscqesze@gmail.com
sigbjorn.skjaeret@huggingface.co
Website:
