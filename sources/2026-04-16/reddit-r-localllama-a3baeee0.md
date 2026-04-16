---
title: >-
  Compile English function descriptions into 22MB neural programs that run
  locally via llama.cpp
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1sm9fmw/compile_english_function_descriptions_into_22mb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-04-15T15:30:40.000Z'
fetched_at: '2026-04-16T06:06:04.167Z'
---
We built a system where a neural compiler takes a plain-English function description and produces a "neural program" (a combination of a continuous LoRA adapter and a discrete pseudo-program). At inference time, these adapt a fixed interpreter to perform the specified task. This is very suitable for implementing "fuzzy functions", functions that are easy to describe in language but painful to implement with rigid rules (such as classifying the urgency of a message, or even counting the number of verbs in a sentence, or even regular expressions which is always painful for me).
 The key idea: the interpreter (Qwen3 0.6B or GPT-2 124M) weights are never modified. All task-specific behavior comes from the compiled program. The compiler itself is a 4B LM that generates the adapter weights and pseudo-program from the spec. Trained end-to-end on a dataset of 10 million (English description, function input, function output) examples synthesized by gpt-5.2.
 Inference runs entirely locally through llama-cpp-python. The base model is shared and the "neural programs" are LoRA adapters that we can easily swap at runtime. The Qwen3 0.6B interpreter is ~594 MB base model (GGUF Q6_K), and each compiled program (GGUF Q4_0) adds ~22 MB. Runs pretty fast on my Mac Mini.
 We also trained a compiler to adapt a GPT-2 124M interpreter that runs in the browser via WebAssembly with wllama (~134 MB Q8_0 base + ~5 MB per Q4_0 program). Interestingly, even a model as old as GPT-2 can get a decent performance.
 Results on FuzzyBench show that the adapted 0.6B interpreter is on par with prompting a 32B model (at the cost that each new task requires a new compilation):
  
PAW + Qwen3 0.6B interpreter: 73.4%
 Qwen3 0.6B prompting: 9.8%
 Qwen3 32B prompting: 68.7%
  
You can easily use it by:
 pip install programasweights import programasweights as paw f = paw.compile_and_load("Classify if this is urgent or not.") f("Need your signature by EOD") # "urgent" 
 Demo: https://programasweights.com
    
