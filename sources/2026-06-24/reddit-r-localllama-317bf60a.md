---
title: >-
  100+ t/s on Qwen3.6-27B Q8 across a 5090 + 3090 Ti — switching to tensor
  split-mode got me from 70 to 100+
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ud5wx2/100_ts_on_qwen3627b_q8_across_a_5090_3090_ti/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-23T03:29:12.000Z'
fetched_at: '2026-06-24T01:27:25.845Z'
---
Wanted to share a setup that's been working great for me. Running Qwen3.6-27B at Q8_0 across two GPUs (RTX 5090 + RTX 3090 Ti) and getting ~100 t/s.
 The big jump came from switching --split-mode to tensor. I was sitting at 70+ t/s on layer split before that. Tensor split keeps both cards busy on the same tensors instead of handing whole layers back and forth, and with a fast/slow pairing like this it made a real difference. Pairing it with a 70/30 tensor split (favoring the 5090) to match the relative compute.
 Fair warning: this thing turns into a proper space heater under load. During decoding both GPUs pull hard the entire time — 750W+ from the cards alone.
 Throughput depends on the prompt as well, with some reaching up to 130 t/s.
 Full llama.cpp server command:
 bash
 llama-server \ -m Qwen3.6-27B-Q8_0.gguf \ -fa 1 \ --n-gpu-layers 99 \ --tensor-split 70,30 \ --fit off \ --main-gpu 0 \ --split-mode tensor \ --no-mmap \ --mlock \ --cpu-range 0-23 \ --cpu-range-batch 0-7 \ --ctx-size 196608 \ --parallel 2 \ --kv-unified \ --jinja --no-warmup --threads 24 --numa isolate \ --batch-size 2048 --ubatch-size 2048 --threads-batch 8 \ --chat-template-kwargs '{"preserve_thinking": false}' \ -cms 24000 \ -ctxcp 5 \ --alias qwen.3.6-27b.q8 \ --spec-type draft-mtp --spec-draft-n-max 3 \ --reasoning-budget 12288 \ --reasoning-budget-message "Wrap up your reasoning and give the final answer." \ --host 0.0.0.0 --port 8080 
 Happy to answer questions about the config.
 P.s. If you want to understand how tensor splitting works, you can find more information in the llama.cpp documentation here: https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md
    submitted by    /u/Shoddy_Bed3240  
 [link]   [comments]
