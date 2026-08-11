---
title: 'I compared GGUF quants of Qwen3.6 27B to NVFP4, AWQ, AutoRound, and FP8'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vksqju/i_compared_gguf_quants_of_qwen36_27b_to_nvfp4_awq/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-10T18:16:29.000Z'
fetched_at: '2026-08-11T11:01:01.022Z'
---
There's an interactive chart and some extra data in the blog post if you're interested.
  
There are plenty of KL-divergence benchmarks for GGUF models, but most of them compare one GGUF quant against another. I wanted to know how those quants stack up against other commonly used formats (especially NVFP4).
 I tested 16 quantizations of Qwen3.6 27B: GGUF models in llama.cpp and the others in vLLM. At each token in the test set, I compared the quantized model’s next-token probability distribution with that of an unquantized reference. The resulting KL divergence measures how far the quant has drifted from the original model; lower is better.
 Weight-only GGUFs have the best quality-size tradeoffs
 GGUF results occupy most of the lower envelope of the chart. For almost every size, a GGUF running in llama.cpp has the lowest measured KL divergence among nearby weight sizes. The main factor here is likely the activation quantization - GGUFs don’t quantize activations at all. Several vLLM checkpoints quantize weights, activations, and sometimes the KV cache.
 vLLM quants vary substantially
 Quantizations of similar size do not preserve the reference distribution equally well. Particularly of note is the Sakamakismile NVFP4 (W4A4) quant, which has substantially higher KLD compared to similarly sized (and even smaller) quants.
 The two conventional Q4 GGUFs are consistent with each other. Bartowski Q4_K_L measures 0.2218 and Unsloth UD_Q4_K_XL measures 0.2273, with heavily overlapping intervals. AWQ and NVIDIA’s mixed NVFP4 are also nearly tied at 0.2776 and 0.2807.
 The quant recipes
  
 Checkpoint Weight quantization Activation quantization KV cache 
  
 uns_UD_IQ3_XXS Dynamic 2.0, IQ3_XXS base; per-tensor type from calibration none none 
  bart_IQ3_XS IQ3_XS imatrix mix none none 
  nvfp4_MTP_gguf custom tensor mix on NVFP4 weights; RSF scale fitting on the Q_K tensors; MTP tensors NVFP4 none none 
  AutoRound_INT4 INT4, symmetric, group 128 none none 
  uns_UD_Q4_K_XL D
