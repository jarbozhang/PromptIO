---
title: I tuned a custom Q8 for my AMD R9700s. My benchmark said 12.5% faster.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uzmg4w/i_tuned_a_custom_q8_for_my_amd_r9700s_my/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-18T04:54:32.000Z'
fetched_at: '2026-07-18T23:01:00.747Z'
---
I have three Radeon AI PRO R9700s. I wanted to know if I could tune a quant for this specific hardware instead of just using the generic upstream formats. Came across the Github project for ROCmFPX by the wonderful Carlo Pasquale and started digging in.
 The fastest variant I've used is the MTP version. 
 The format is Q8_0_ROCMFPX. My part was the gfx1201 decode tuning - VDR8 vector-dot width and a measured wave policy plus all the validaton. Each blok stores 32 signed int8 codes and one UE4M3 scale byte. It's not native FP8 or FP4. It's integer dot products with float accumulation.
 Model is up on HuggingFace: https://huggingface.co/1337Hero/Qwen3.6-27B-Q8_0-ROCMFPX-GGUF
 The numbers - good and bad:
  
 Measure Result 
  
 Model size vs upstream Q8_0 2.94% smaller 
  HumanEval 140/164 - tied 
  Full-model decode 5.77-5.87% faster 
  Equal-work, 18 matched pairs 5.82% faster median, 17/18 pairs, p=0.000965 
  End-to-end agent wall time 2.21% faster - failed my 3% threshold wanted faster 
 
 Equal passes. End-to-end agent latency does not. Both thresholds were fixed before the runs. I'm not cherry-picking the one that passed.
 The catch:
 This does not run on upstream llama.cpp, Ollama, LM Studio, or vLLM. It uses a custom tensor type and needs the pinned ROCmFPX fork:
 git clone https://github.com/1337hero/ROCmFPX.git cd ROCmFPX git checkout 45bcff509c4b1cff137e2cc1ea84671c61ceddea env JOBS=16 scripts/build-r9700.sh 
 If you're on gfx1201 and willing to build from source, give it a shot. If you're on NVIDIA or a different AMD card, this won't help you yet - the gfx1201 tuning is the whole point.
 So far I've only had two others on X verify this. But would be helpful to find others to run some benches comparing it to the stock Q8
 If you want to see the whole process of my vibe coded slop: https://github.com/1337hero/r9700-quant-lab 
    submitted by    /u/alphatrad  
 [link]   [comments]
