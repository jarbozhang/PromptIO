---
title: Nemotron - King of the Deep? Comparison of 4 models <=120B
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u5vqpl/nemotron_king_of_the_deep_comparison_of_4_models/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-14T20:25:37.000Z'
fetched_at: '2026-06-14T23:18:17.963Z'
---
Comparison was done on Strix Halo 128gb shared memory, Ubuntu 26.04, Lemonade Server, Vulkan backend.
 I often run larger models like gpt-oss 120B or qwen but their performance seems to degrate quickly once in deep waters... ah.. deep context. The most important quality to me is prompt processing - we are talking existing code and context quickly fills up when analyzing it for a change request / bugfix. In existing code, I think 95-99% is PP and 1-5% is TG of the total time. I tried Nemotron Super (120B) recently and liked the quality, speed was decent but to my surprise I felt it handled deeper context (~100k) way better than what I am used to with similar models. To falsify that subjective impression, ran llama-bench with the three competitors in the 120B class (GPT-OSS, qwen 3.5, and Nemotron) and, mostly as a comparison, the popular smaller/weaker/faster Qwen 3.6 35B model. As a subjective baseline I set 100 TPS PP as "usable" and stopped the benchmark if the model fell below it. Also, I should mention that the max context varies by model: GPT-OSS can handle max ~128K, Qwen 3.5/6 can handle ~256K, but Nemotron up to 400k Tokens context depth.
 My main conclusions are: My feeling was right, Nemotron Super handles deep context exceptionally well, compared to the others. The "speed king" GPT-OSS 120B looses speed so fast that Nemotron Super surpasses it in PP at 32K depth. QWEN 3.5 122B A10B is surpassed almost immediatelly at 16K depth. Even Qwen 3.6 35B A3B's PP is on par at the model's max context of ~256k context, surprisingly.
 At token generation speed (IMO not as important), Nemotron Super starts usable (IMO >~10 TG TPS) but not yet really "fun" (IMO >~20 TG TPS) to use. It degrates slowly to "barely usable" according to that definition at ~400k context depth - which is stll impressive if you ask me. The most direct competitor Qwen 3.5 122B A10B is about as slow at 128k context. Note that I didn't enable MTP, though.
 If you need high TG, Nemotron is not the
