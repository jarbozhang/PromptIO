---
title: Multilingual-Multimodal-NLP/LoopCoder-V2 · Hugging Face
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u8gceo/multilingualmultimodalnlploopcoderv2_hugging_face/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-17T17:16:07.000Z'
fetched_at: '2026-06-18T08:56:38.995Z'
---
GitHub : https://github.com/CSJianYang/LoopCoder
 arXiv : https://arxiv.org/abs/2606.18023
 Full Paper PDF : https://arxiv.org/pdf/2606.18023
  
LoopCoder-V2
 LoopCoder-v2 is a 7B instruction-tuned code model based on the Parallel Loop Transformer (PLT). The model studies test-time computation scaling through repeated application of shared Transformer blocks while keeping the parameter count fixed.
 The released checkpoint is the two-loop PLT variant (plt_num_loops=2). In the accompanying paper, this setting gives the best gain-cost trade-off: the second loop provides most of the useful latent refinement, while additional loops show diminishing or unstable updates.
 Highlights
  
7B dense PLT coder trained from scratch on 18T tokens of mixed text and code data.
 Instruction-tuned with a matched supervised fine-tuning recipe.
 Uses cross-loop position offsets and shared-KV gated sliding-window attention.
 Targets code generation, multilingual code, code reasoning, agentic software engineering, and tool-use workflows.
 Strongest loop-count setting in the paper: two loops, not more.
  
LoopCoder-v2: Only Loop Once for Efficient Test-Time Computation Scaling
 TL;DR. For Parallel Loop Transformers (PLT), more looping is not better. A 7B coder that loops just once more than usual (two passes total) lifts SWE-bench Verified from 43.0 → 64.4, while three or more loops regress. We explain this with a gain–cost view of looping and provide diagnostics for picking the loop count without brute-force sweeps.
 Overview
 
 Looped Transformers scale latent computation by repeatedly applying a shared block, but sequential looping increases latency and KV-cache memory with the loop count. Parallel Loop Transformers (PLT) alleviate this with two mechanisms:
  
CLP — cross-loop position offsets, which break sequential inter-loop dependencies and enable parallel loop execution.
 G-SWA — shared-KV gated sliding-window attention, which keeps the cache footprint nearly constant across loop 
