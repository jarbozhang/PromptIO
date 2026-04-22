---
title: b8875
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b8875'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-04-21T23:31:48.000Z'
fetched_at: '2026-04-22T08:06:42.949Z'
---
mtmd: Add support for Reka Edge 2603 (#21616)
feat: (vocab) fix stray text appended in llama_decode_text
Remove accidental concatenation of the full text string when
feat(mtmd): add Yasa2 vision encoder support
Add a Yasa2 (ConvNeXtV2-based) vision encoder for reka-edge:
Register PROJECTOR_TYPE_YASA2 and tensor name definitions
Add yasa2_block/yasa2_stage model structs
Implement graph builder with ConvNeXt stages, GRN, adaptive pooling
Wire into clip.cpp switch statements and mtmd.cpp init_vision
Use mtmd_image_preprocessor_fixed_size for image preprocessing
feat(chat): add reka-edge template handler (tools, thinking)
Add chat-reka.cpp/h implementing PEG-based parser for reka-edge format
Add Reka-Edge.jinja chat template
Detect reka-edge template in try_specialized_template()
Add LLAMA_EXAMPLE_MTMD to chat-template-file arg
feat: add reka vlm to gguf conversion script
Converts Reka Yasa2 hf checkpoints to GGUF format:
Text decoder: Llama-arch with tiktoken/BPE vocab
Mmproj (--mmproj): ConvNeXt vision backbone + language_projection
Generates 2D sincos positional embeddings for vision encoder
test: add Reka Edge chat template and parser tests
test-chat-template: oracle tests comparing Jinja engine output vs
test-chat: PEG parser tests for Reka Edge format, round-trip tests
scripts: add Reka Edge mixed quantization helper
Q4_0 base quantization with Q8_0 override for the last 8 transformer
fix: adapt chat-reka and tests to upstream API
Use autoparser::generation_params (not templates_params)
Add p.prefix(generation_prompt) to PEG parser
Simplify reasoning parser to match LFM2 pattern
Remove image/video oracle tests (unsupported by oaicompat parser;
fix: avoid duplicate tensor loading in yasa2 vision encoder
TN_YASA_PATCH_W and TN_PATCH_EMBD both resolve to "v.patch_embd.weight",
chore: update image pre-processing settings
The reka-edge model depends on the following settings in an older
Fixed square resize
BICUBIC
add_padding=false
In current llama.cpp, this means sett
