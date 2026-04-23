---
title: What speed is everyone getting on Qwen3.6 27b?
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sss5og/what_speed_is_everyone_getting_on_qwen36_27b/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-22T17:26:19.000Z'
fetched_at: '2026-04-23T02:21:55.375Z'
---
I'm getting ~13 tps on Q8_0, with a context window of 128000, K Q8_0, V Q8_0
 this is on 3x GPUS (1x2060super 8gb, 2x5060ti 16gb), via llamacpp
 unsure if this is slow or to be expected?
 */llama-server --port 8080 --model */llama.cpp/Qwen3.6-27B-Q8_0/Qwen3.6-27B-Q8_0.gguf -mm */Qwen3.6-27B-Q8_0/mmproj-BF16.gguf -np 1 --temperature 1.0 --top-p 0.95 --top-k 20 --min-p 0.0 --presence-penalty 1.5 --repeat-penalty 1.0 --chat-template-kwargs '{"preserve_thinking": true}' --cache-type-k q8_0 --cache-type-v q8_0 -c 128000 --fit-target 1536
 (--fit-target 1536 was to allow some space for the vision capability to work)
    submitted by    /u/Ambitious_Fold_2874  
 [link]   [comments]
