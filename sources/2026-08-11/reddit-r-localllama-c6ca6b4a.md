---
title: Muse Glimmer ACTUALLY fits on a single RTX 3090
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vkm42m/muse_glimmer_actually_fits_on_a_single_rtx_3090/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T14:16:56.000Z'
fetched_at: '2026-08-11T11:01:01.020Z'
---
I did some testing this morning, and I was surprised to find that Muse Glimmer actually comfortably fits on a single RTX 3090 with full context + DFlash + mmproj at Q4_K_XL, unlike Qwen3.6-27B and Gemma-4-31B.
 Muse Glimmer supports up to 256k context according to Unsloth. Here is my command:
 llama-server \ --model Muse-Glimmer-30B-UD-Q4_K_XL.gguf \ --mmproj Muse-Glimmer-30B-mmproj-kquant.gguf \ --spec-draft-model Muse-Glimmer-30B-DFlash-kquant.gguf \ --spec-draft-ngl 999 \ --spec-draft-n-max 15 \ --spec-type draft-dflash \ -c 262144 \ --override-kv muse-glimmer.context_length=int:262144,dflash.context_length=int:262144 \ -ngl 999 \ -fit off \ --parallel 1 \ --flash-attn on \ --no-warmup \ --cache-type-k f16 \ --cache-type-v f16 \ --temp 1.0 \ --top-p 0.95 \ --top-k 64 \ --reasoning-preserve \ --jinja \ --host 127.0.0.1 \ --port 8080 
 This fits in about 22GB to 23GB of VRAM, actually leaving a reasonable amount of unused memory.
 On this RTX 3090, for Qwen3.6-27B and Gemma-4-31B, this is what I've been able to achieve using their Q4_K_XL models with MTP + mmproj, right at the limits of the RTX 3090's VRAM:
  
 Model F16 KV cache Q8 KV cache 
  
 Qwen3.6-27B 70,000 tokens 125,000 tokens 
  Gemma-4-31B 52,000 tokens 81,000 tokens 
 
 Those small contexts have been borderline unusable on f16, and I don't enjoy using Q8 KV unless absolutely necessary, so I mostly use my slower DGX Spark to run these models at the full context.
 On Muse Glimmer, there seems to be little reason to use my DGX Spark since it fits so nicely on the RTX 3090. Maybe I could run a bunch of parallel agents with full KV on the Spark.
 Muse Glimmer also runs at between 64 tok/s and 124 tok/s in my testing under DFlash, depending on whether it is outputting prose or code. Either way, a pretty solid speed. I've seen about 1400 tok/s of prompt processing.
 I also ran a two needle haystack test at about 150k tokens with one needle at the beginning and the other at the end, and the model retrieved the
