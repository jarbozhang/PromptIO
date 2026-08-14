---
title: Doom running on an LLM -- Hugging Face checkpoint included
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vnjtyh/doom_running_on_an_llm_hugging_face_checkpoint/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-13T18:56:49.000Z'
fetched_at: '2026-08-14T11:01:32.394Z'
---
There's no training anywhere in this. I ported Doom's actual rendering algorithm into transformer weights using a compiler I wrote (torchwright) -- every weight computed, none learned. 
 The prompt carries the level geometry, player position, and view direction; generation emits drawing commands; a 43-line host program turns them into pixels. Stock Phi3ForCausalLM architecture, loads in vanilla transformers with trust_remote_code=False.
 Two checkpoints: 
 - 320x200 (the one in the write-up): 21B params, 85.87 GB. One frame is a 3,614-token prompt plus 53,747 generated tokens -- just under 40 minutes on a B200.
 - 80x50: same prompt format, same textures, 34 GB download. This is the one to actually try.
 One honest disclaimer:
 I have not run this locally -- I've been using cloud GPUs (B200 and A100-80). My compiler currently requires fp32 precision in the weights, and I haven't yet explored quantization.
 For the 80x50 model I'd recommend 80 GB of GPU memory; 64 GB should work in theory but I haven't tried it.
 Write-up: https://ood.dev/posts/doom/
 Weights (80x50): https://huggingface.co/physicsrob/torchwright-doom-e1m1-80x50
 Weights (320x200): https://huggingface.co/physicsrob/torchwright-doom-e1m1
 Source: https://github.com/physicsrob/torchwright_doom
    submitted by    /u/notforrob  
 [link]   [comments]
