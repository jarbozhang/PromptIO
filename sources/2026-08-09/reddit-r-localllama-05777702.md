---
title: >-
  Extremely slow DSpark draft model performance (1-2 t/s) with DeepSeek-V4-Flash
  on llama-server compared to MTP?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vj8xoh/extremely_slow_dspark_draft_model_performance_12/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-08T22:28:01.000Z'
fetched_at: '2026-08-09T11:01:08.933Z'
---
Hey everyone, I could use some advice on setting up speculative decoding correctly with llama-server.
 My Hardware:
  
GPUs: RTX 4090 + RTX 6000 Pro (120GB total VRAM)
 RAM: 32GB
  
I am currently testing the DeepSeek-V4-Flash-0731 unsloth model using the 137GB Q4 UD-IQ4-NL quant. When running the MTP draft model, I get a surprisingly solid 30-40 tokens per second.
 I was hoping for more performance boost if I swapped out MTP for the DSpark draft model, but I had terrible results. The model loads successfully, but both prompt processing (PP) and token generation slow to an absolute crawl, around 1 to 2 tokens per second. I don't think it has to do with the model not being able to fully fit into VRAM, since the mtp setup also couldn't fit in VRAM. Both mtp and dspark runs maxed out the vram in both gpu, and spilled everything else to ram.
 Here is the exact configuration I am running, I tried multiple tries just to get to a point where the model launched correctly:
 llama-server \ --no-warmup \ --model /home/pk7677/.cache/huggingface/hub/models--unsloth--DeepSeek-V4-Flash-0731-GGUF/snapshots/fbbb5b93fb787c21338159b0af3318bb3f4d9768/UD-IQ4_NL/DeepSeek-V4-Flash-0731-UD-IQ4_NL-00001-of-00004.gguf \ --model-draft /home/pk7677/.cache/huggingface/hub/models--unsloth--DeepSeek-V4-Flash-0731-GGUF/snapshots/fbbb5b93fb787c21338159b0af3318bb3f4d9768/dspark-DeepSeek-V4-Flash-0731-Q8_0.gguf \ --spec-type draft-dspark \ --spec-draft-n-max 3 \ --device-draft CUDA1 \ --host 0.0.0.0 \ --port 8000 \ --fit on \ --tensor-split 2,3 \ --n-cpu-moe 13 \ --main-gpu 1 \ --split-mode layer \ --ctx-size 65536 \ --flash-attn on \ --threads 16 \ --cont-batching \ --temp 1.0 \ --top-p 0.95 \ --top-k 0 \ --min-p 0 \ --jinja \ --batch-size 2048 \ --ubatch-size 2048 \ --alias 'DeepSeek-V4-Flash-0731' 
 My setting for the mtp draft model that gave me good performance:
 llama-server \ --no-warmup \ --model /home/pk7677/.cache/huggingface/hub/models--unsloth--DeepSeek-V4-Flash-0731-GGUF/snapshots/fbbb5b
