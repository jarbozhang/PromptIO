---
title: b9045
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b9045'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-05-06T13:35:58.000Z'
fetched_at: '2026-05-07T10:33:28.117Z'
---
mtmd: add granite-speech support (ibm-granite/granite-4.0-1b-speech) (#22101)
mtmd: add granite-speech support (ibm-granite/granite-4.0-1b-speech)
Conformer encoder with Shaw relative position encoding,
Encoder uses GLU gating, folded batch norm, and SSM depthwise
Audio preprocessing: reflect-padded STFT, 80-bin mel filterbank,
GGUF converter handles batch norm folding at export time,
Tested against HF transformers reference: token-for-token match
mtmd: rename gs_ prefixed tensors to generic/architecture names
mtmd: use tensor_mapping.py for all granite_speech tensors
convert: fold GraniteSpeechTextModel into GraniteModel
mtmd: replace n_layer hack with explicit has_standard_layers flag
mtmd: replace hardcoded magic numbers with GGUF hparams for granite speech
mtmd: align KEY_A_ define spacing
convert: register GraniteModel for GraniteSpeechForConditionalGeneration
convert: fix ty type-check for GraniteSpeechMmprojModel registration
mtmd: align TN_ define spacing
mtmd: use generic layer loop for granite speech tensor loading
mtmd: merge qformer_proj_layer into clip_layer
mtmd: granite_speech remove redundant ggml_build_forward_expand on inputs
mtmd: granite_speech add comment explaining why build_attn is not used
mtmd: granite_speech hard-code eps in cpp, remove from GGUF metadata
gguf: add spacing between granite_speech tensor mapping blocks
mtmd: make generic audio layer_norm_eps read optional
mtmd: granite_speech keep encoder eps in GGUF, only hard-code projector eps
mtmd: align defines and struct fields in clip-impl.h and clip-model.h
mtmd: fix alignment and ordering issues across granite speech files
convert: granite_speech use filter_tensors instead of modify_tensors for skipping
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
Ubuntu x64 (SYCL F
