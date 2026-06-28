---
title: >-
  Ornith-1.0-35B GGUF update: native MTP speculative-decode graft + full
  serving/TTFT/long-context numbers (llama.cpp, tp=1)
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ui4yn6/ornith1035b_gguf_update_native_mtp/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T18:35:53.000Z'
fetched_at: '2026-06-28T23:00:58.423Z'
---
Follow-up to my previous Ornith-1.0-35B Q3_K_M post.
 I grafted a native MTP draft head onto the IQ4_XS body (head at Q6) for self-speculative decode, single GPU, llama.cpp:
  
1.3-1.35x single-stream decode (172.6 -> 233.8 tok/s).
 Next-token distribution is byte-identical to target-only (KLD 0.0, 32/32).
 BF16 KLD 0.073 — slightly better than Q4_K_M.
 Issue: not bit-exact to target-only over long deterministic gens (6/8 exact, 93.4% token match).
  
Where it sits on the KLD ladder (top-64 next-token KL vs BF16, lower is better):
  
 Quant Mean KLD Top-1 Size 
  
 Q8_0 0.011 96.9% 36.9 GB 
  Q6_K 0.017 100.0% 28.5 GB 
  Q5_K_M 0.035 93.8% 24.7 GB 
  IQ4_XS-MTP graft (new) 0.073 90.6% ~19.6 GB 
  Q4_K_M 0.086 90.6% 21.2 GB 
  IQ4_XS 0.143 84.4% 18.9 GB 
  Q3_K_M 0.362 84.4% 16.8 GB 
 
 Fidelity ladder chart
 Performance numbers I added to the card:
  
Throughput + p95 TTFT vs concurrency for all six quants (Q4_K_M ~243 tok/s @c1 -> ~656 tok/s @c16, p95 TTFT ~76 ms @c1).
 Long-context TTFT, single stream: prefill scales 94 ms @512 tokens -> ~6.3 s @32k (the IQ4_XS body and the graft prefill a bit faster than Q4_K_M at every length).
  
Notes:
  
Q4/Q5/Q6/Q8 are upstream artifacts I mirrored + revalidated; Q3_K_M, IQ4_XS, and the MTP graft are produced locally. REASONING=off is still the pinned serving default (the reasoning-mode bug from last post).
 Single workstation GPU (RTX PRO 6000 Blackwell 96 GB), tp=1 only.
  
🔗 https://huggingface.co/LordNeel/Ornith-1.0-35B-GGUF-llamacpp-tp1
 https://preview.redd.it/4kljd5aci2ah1.png?width=1800&format=png&auto=webp&s=f71b72f3fd40f3c64004c1910eb97304c98dcbc6
 https://preview.redd.it/i7nro4aci2ah1.png?width=1800&format=png&auto=webp&s=65fef9870e76c5920799c884b181dc1d423bc995
 https://preview.redd.it/5sdod4aci2ah1.png?width=1800&format=png&auto=webp&s=72f775e164cfa056172d705e7ff6f33e720d1380
 https://preview.redd.it/cl2dw4aci2ah1.png?width=1800&format=png&auto=webp&s=690a525335066ff297666f3f6b0502a65db9c9bf
 https://preview.re
