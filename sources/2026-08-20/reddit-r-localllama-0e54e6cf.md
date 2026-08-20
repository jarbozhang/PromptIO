---
title: >-
  NVFP4 on VOLTA! Despite being built for Blackwell, I made four 2017 V100s run
  Qwen 3.8 NVFP4 natively and match my $6000 RTX 5090.
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vsq3zg/nvfp4_on_volta_despite_being_built_for_blackwell/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-19T15:44:29.000Z'
fetched_at: '2026-08-20T11:01:24.241Z'
---
Four Tesla V100s from 2017 matched my RTX 5090 on single-request Qwen 3.8 decode.
 Repo: https://github.com/dnv2003/v100-skinny
 https://i.redd.it/5ws2ak3uqckh1.gif
 The 5090 was not being held back. It ran NInfer, a specialist engine built to make this exact model as fast as possible on that GPU. (love this guys work)
 The V100s ran Qwen3.8's published mixed FP4/FP8 weights unchanged.
 This should be impossible. NVFP4 was built for Blackwell. The RTX 5090 has native silicon for FP4 and FP8; V100 has none of these advantages.
 And yet via software I wrote a translator fast enough to reach parity in decode. 
 Here are the same-lab results:
  
 AIME 2026 problem 1, five seeds 4× V100 / v100-skinny RTX 5090 / NInfer 
  
 Decode throughput 219.1 ± 5.9 tok/s 214.7 ± 9.2 tok/s 
  Time to correct answer 6.90 ± 0.30 s 6.56 ± 1.34 s 
  Completion tokens 1,513 ± 44 1,403 ± 253 
  Correct answers 5/5 5/5 
  Tokens committed / round 5.89 4.27 
  Round latency 26.9 ms 19.9 ms 
  Native MTP depth k=7 draft-tokens=5 
 
 Both sides used temperature 0.6, top-p 0.95, top-k 20, presence penalty 1.0, thinking enabled, and the same five seeds.
 The V100 system is 2% ahead in the decode-throughput point estimate. NInfer is about 5% ahead in decode-only time to the correct answer. The intervals overlap.
 The honest conclusion is parity.
 And this is not a DFlash/EAGLE/n-gram/separate-drafter result. Both systems use Qwen3.8's own built-in MTP, each at its best measured depth on this workload. NInfer is at its maximum supported depth of five; v100-skinny runs at seven(thanks to QPN).
 The interesting part is why parity happens.
 NInfer turns a round in 19.9 ms. The V100s need 26.9 ms — 35% longer.
 But the V100 system commits 5.89 tokens per round against 4.27 — 38% more.
 So the slower round and the deeper round almost exactly cancel:
 1.38 / 1.35 ≈ 1.02.
 NInfer wins each round. v100-skinny gets more useful work out of each round.
 That deeper verification only pays because of QPN, the k
