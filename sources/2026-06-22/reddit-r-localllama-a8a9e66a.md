---
title: 8-16 MI50s Minimax M3 @19 tps TG (peak)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ubnj2l/816_mi50s_minimax_m3_19_tps_tg_peak/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-21T11:19:39.000Z'
fetched_at: '2026-06-22T04:12:20.730Z'
---
TL;DR Speeds are not too ugly for this old 2018 hardware but imo, not very usable for agentic coding (if you compare with qwen3.6 27B on 8 MI50 @ 50 tps TG 800 tps PP). More concerning is that the reasoning output is very very long and still didn’t check about the quality of code output… 
 As said before, I think there’s still room to have higher speeds (by updating the software & hardware stacks, eg. use of pcie switch with lower latency, more optimized mtp without overhead for rocm/gfx906, fp16 dequant, etc) 
  
  
 Inference engine used (vllm fork v0.23.1 with rocm7.2.1): https://github.com/ai-infos/vllm-gfx906-mobydick/tree/main
  
 Huggingface Quants used:
 cyankiwi/MiniMax-M3-AWQ-INT4
 bullerwins/MiniMax-M3-4bit-W4A16-v0
  
 Main commands to run:
 sudo docker run -it --name vllm-gfx906-mobydick -v /home:/home --network host --device=/dev/kfd --device=/dev/dri \ --group-add video --group-add $(getent group render | cut -d: -f3) \ --cap-add=SYS_ADMIN --volume /sys:/sys:ro --pid=host --privileged \ --ipc=host aiinfos/vllm-gfx906-mobydick:v0.23.1rc0.x-rocm7.2.1-pytorch2.11.0 
  
 Cmd for 8 MI50 bullerwins/MiniMax-M3-4bit-W4A16-v0:
 FLASH_ATTENTION_TRITON_AMD_ENABLE="TRUE" OMP_NUM_THREADS=4 VLLM_LOGGING_LEVEL=DEBUG vllm serve \ /home/llm/models/MiniMax-M3-4bit-W4A16-v0 \ --served-model-name MiniMax-M3-4bit-W4A16-v0 \ --enable-auto-tool-choice \ --tool-call-parser minimax_m3 \ --reasoning-parser minimax_m3 \ --max-model-len auto \ --max-num-seqs 8 \ --gpu-memory-utilization 0.975 \ --enable-log-requests \ --enable-log-outputs \ --log-error-stack \ --speculative-config '{"method": "eagle3", "model": "/home/rig9/llm/models/MiniMax-M3-EAGLE3", "num_speculative_tokens": 3, "attention_backend": "TRITON_ATTN"}' \ --dtype float32 \ --kv-cache-dtype float16 \ --attention-config.indexer_kv_dtype float16 \ --block-size 128 \ --skip-mm-profiling \ --limit-mm-per-prompt '{"image":1,"video":{"count":1,"num_frames":32}}' \ --tensor-parallel-size 8 --port 8000 2>&1 | tee log.txt 
