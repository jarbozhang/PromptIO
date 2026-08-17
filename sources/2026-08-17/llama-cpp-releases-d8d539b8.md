---
title: b10448
url: 'https://github.com/ggml-org/llama.cpp/releases/tag/b10448'
source: llama.cpp Releases
source_type: rss
language: en
published: '2026-08-15T20:50:00.000Z'
fetched_at: '2026-08-17T11:03:18.970Z'
---
model: add Kimi-K3 text model (#26185)
model: add Kimi-K3 text model
Hybrid KDA (linear) + MLA (full) attention as in Kimi-Linear-48B, plus five
cross-layer residual attention  (attn_res_block_size)
latent MoE                      (routed experts run at n_expert_latent)
situ activation                 (replaces SwiGLU everywhere)
MLA output gate                 (sigmoid gate before o_proj)
full-rank KDA gate              (single ssm_g instead of ssm_g_a/ssm_g_b)
K3's text_config reports KimiLinearForCausalLM - the older 48B architecture -
The KDA decay gate has two forms, selected by linear_attn_config's
softplus(x) to
sigmoid(exp(A_log)*x). K3 sets it to -5.0; kimi-linear leaves it
Cross-layer residuals reuse ggml_dsv4_hc_pre for the weighted sum. That op is
The routed experts ship as compressed-tensors "mxfp4-pack-quantized". That is
Verified against Moonshot's own code path (transformers + fla's Triton KDA
Assisted-By: Claude Opus 5 (1M context) noreply@anthropic.com
model: fix ty errors in the Kimi-K3 converter
_res_parts buffers (kind, tensor) pairs, not bare tensors
get_tensors must return an Iterator, matching ModelBase
LazyBase's func takes one argument, so pass the expert loaders through
args instead of the closure
borrowing KimiLinearModel.set_vocab from an unrelated TextModel is
No behaviour change: the MXFP4 repack still dequantizes to the source weights
Assisted-By: Claude Opus 5 (1M context) noreply@anthropic.com
Update conversion/kimi_k3.py
Co-authored-by: Boris Dvorkin  b_dvorkin@niuitmo.ru
Increase LLAMA_MAX_EXPERTS from 512 to 1024
tests : support for Kimi K3 in archs test
chat : add Kimi K3 chat format (reasoning, content, typed tool calls)
K3's assistant output is an XTML-ish tagged format built by the template's
The generation prompt ends with open_tag('think'), so the completion
Only <|open|>/<|close|>/<|sep|>/<|end_of_msg|> are special tokens; tag
Adds common_chat_params_init_kimi_k3 (PEG_NATIVE) with detection on the
Verified end-to-end again
