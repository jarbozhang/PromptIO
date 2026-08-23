---
title: >-
  543 tok/s single-request Qwen3.6-35B-A3B on one RTX 5090 over a 65K-token
  decode
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v1no8e/543_toks_singlerequest_qwen3635ba3b_on_one_rtx/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-20T14:48:19.000Z'
fetched_at: '2026-07-20T23:00:57.690Z'
---
An example
 TL;DR
 I have open-sourced NInfer, a from-scratch C++/CUDA inference engine currently specialized for two exact Qwen3.6 checkpoints on a single RTX 5090. Both the engine and the converted model artifacts are publicly available:
 Github: https://github.com/Neroued/ninfer
 The main result:
  
Qwen3.6-35B-A3B sustained 542 tok/s while generating a full 65,536 token completion, on a single RTX 5090, single request.
  
My goal was to find out how fast inference can get on a single GPU (in my case RTX 5090), with a fixed model and fixed weights, after deep, end-to-end optimization. To that end, I threw everything I could at it and built the entire pipeline from scratch: custom quantization, weight layout design, per op kernel optimization, kernel fusion, a dedicated LM head draft, and so on. NInfer is not a general inference engine, it's designed just for certain model artifacts.
 The currently supported models are:
  
Qwen3.6-27B
 Qwen3.6-35B-A3B
  
Both converted model artifacts are available on Hugging Face. Under NInfer's quantization scheme, the published artifacts are 16.29 GiB (~5.03 bpw) for Qwen3.6-27B and 20.84 GiB (~4.97 bpw) for Qwen3.6-35B-A3B.
 The Qwen3.6-35B-A3B results:
 All MTP results below use a draft window of 3 and NInfer’s optimized LM-head draft path. Each result is the mean ± sample standard deviation across five fixed seeds, after one warm-up run.
 Long-reasoning runs:
  
 Completion length Decode speed MTP acceptance 
  
 65,536 tokens 542.8 ± 12.5 tok/s 73.0% 
  ~55,171 tokens 572.9 ± 9.1 tok/s 77.7% 
  ~8,675 tokens 634.3 ± 14.2 tok/s 82.7% 
 
 I also ran a mixed set of code, translation, story, and structured output prompts:
  
 Workload Decode speed MTP acceptance 
  
 Code 576.5 ± 21.7 tok/s 71.0% 
  Translation 559.3 ± 28.1 tok/s 66.6% 
  Story 395.9 ± 30.9 tok/s 37.7% 
  Structured output 661.2 ± 29.5 tok/s 87.2% 
 
 MTP0 context-length scaling:
  
 Prompt length Prefill speed Decode speed 
  
 7,680 15,544 tok/s 271.1 tok/s 
