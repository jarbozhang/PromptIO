---
title: Qwen3.6 27B more dumb in vLLM compared to llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ue9v4b/qwen36_27b_more_dumb_in_vllm_compared_to_llamacpp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-24T10:35:30.000Z'
fetched_at: '2026-06-25T07:40:38.232Z'
---
Hello, I recently bought a new RTX 5060Ti to pair with the RTX 5060Ti I already own, now I have 32GB of VRAM.
 Up until now for convenience I've used llama.cpp, for goodness' sake it works excellently when only 1 user is using it, but now there are 2 of us using it and llama.cpp can't keep up, often user 1's cache gets invalidated when user 2 writes and vice versa.
 Until now I have always used this command to start llama.cpp:
  "Qwen3.6-27B": ttl: 0 filters: strip_params: "top_p, top_k, presence_penalty, frequency_penalty, temperature, min_p" setParamsByID: "${MODEL_ID}:coding": temperature: 0.6 top_p: 0.95 top_k: 20 min_p: 0.0 presence_penalty: 0.0 "${MODEL_ID}:general": temperature: 1.0 top_p: 0.95 top_k: 20 min_p: 0.0 presence_penalty: 0.0 "${MODEL_ID}:instruct": chat_template_kwargs: enable_thinking: false temperature: 0.7 top_p: 0.8 top_k: 20 min_p: 0.0 presence_penalty: 1.5 cmd: | ${llama-server} --model /home/daniele/models/Qwen3.6-27B-UD-Q5_K_XL.gguf \ --threads 9 --ctx-size 120000 -fa 1 --jinja -np 2 -ngl 99 --spec-type draft-mtp --spec-draft-n-max 3 --chat-template-kwargs '{"preserve_thinking": true}' --cache-ram 24000 --mmproj /home/daniele/models/mmproj-BF16.gguf --no-mmproj-offload -kvu --ctx-checkpoints 6 -b 8192 -ub 512 -mg 0 -ctv q8_0 -ts 0.5,0.5 
 The parameters you see configured I tuned one after another after many attempts, and this is the best I've found for my hardware.
 So I decide to switch to vLLM, I use the model: `cyankiwi/Qwen3.6-27B-AWQ-INT4` which has roughly the same size (in weights) as `Qwen3.6-27B-UD-Q5_K_XL.gguf`
 I start vLLM with:
 docker run --rm --gpus all \ --name vllm \ -v /mnt/fast_data/huggingface_cache:/root/.cache/huggingface \ -v /mnt/fast_data/vllm_cache:/root/.cache/vllm \ -v /mnt/fast_data/models/chat_template.jinja:/templates/chat.jinja \ -v /home/daniele/Desktop/qwen36_27b_parser:/plugins \ -v /mnt/fast_data/vllm_ec_cache:/ec_cache \ -e PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:512 -p 8002:8000 \ -e QWEN36_PARSER_D
