---
title: v0.20.0
url: 'https://github.com/vllm-project/vllm/releases/tag/v0.20.0'
source: vLLM Releases
source_type: rss
language: en
published: '2026-04-27T21:20:28.000Z'
fetched_at: '2026-05-20T14:39:00.263Z'
---
vLLM v0.20.0
Highlights
This release features 752 commits from 320 contributors (123 new)!
DeepSeek V4: Initial DeepSeek V4 support landed (#40860), with DSML token-leakage fix in DSV4/3.2 (#40806), DSA + MTP IMA fix (#40772), and a silu clamp limit on the shared expert (#40950).
CUDA 13.0 default: Default CUDA wheel on PyPI and vllm/vllm-openai:v0.20.0 image switched to CUDA 13.0; architecture lists and build-args cleaned up (#39878), and CUDA bumped to 13.0.2 to match PyTorch 2.11.0 (#40669). As a general rule of thumb, our CUDA version policy follows PyTorch's. We highly recommend to install vLLM with uv and use --torch-backend=cu129 if you are on CUDA 12.9.
PyTorch 2.11 upgrade (#34644): vLLM ships on torch 2.11 for CUDA, and XPU is now also on torch 2.11 (#37947) — XPU is no longer pinned to 2.10. This is a breaking change for environment dependency.
Python 3.14: Added to the supported Python version list (#34770).
Transformers v5: vLLM now runs on HuggingFace transformers>=5 (#30566), with vision-encoder torch.compile bypass (#30518) and continued v4/v5 compat fixes including PaddleOCR-VL image processor max_pixels (#38629), Mistral YaRN warning (#37292), and Jina ColBERT rotary inv_freq recompute (#39176).
New large models: Hunyuan v3 (Hy3) preview (#40681) with HYV3 reasoning parser (#40713); Granite 4.1 Vision as a built-in multimodal model (#40282).
FlashAttention 4 as default MLA prefill: FA4 re-enabled as the default MLA prefill backend (#38819) with head-dim 512 and paged-KV support on SM90+ (#38835), plus an upstream FA4 sync (#38690).
TurboQuant 2-bit KV cache: New attention backend delivering 2-bit KV cache compression with 4× capacity (#38479), now with FA3/FA4 prefill support (#40092).
Online quantization frontend: New end-to-end online quantization frontend (#38138), with docs (#39736); experts_int8 consolidated into the FP8 online path (#38463); MXFP8 online quant moved to the new frontend (#40152).
vLLM IR: Initial IR skeleton with rms_norm op (
