---
title: >-
  QLLM, no transformer, no mamba and new noval architecture with O(1) inference
  is finally out as model
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uqykgh/qllm_no_transformer_no_mamba_and_new_noval/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-08T16:58:12.000Z'
fetched_at: '2026-07-08T23:01:51.282Z'
---
okay so you might be following me or not.. but I have been working in AI since last 10+ years and our first product in AI was released in 2014 https://web.archive.org/web/20141027082348/http://xepan.org/ and we have to take that out as it was just not accepted.
 Now with this new wave of AI I also started picking my pace. And found that training is okay but running a llm is costly and all models are variants of transformers in one or other way.
 So I tried with some maths first and some theory... and then started building different architecture.. as my basic knowledge of AI is okay... I could think what could work and developed qllm..
 1: In years I made it work as theory
 2: then as practical that learn and still O(1)
 3: some one from berkeley college and indiana university found my reddit post interesting and then we work and published paper https://arxiv.org/abs/2604.05030 then we kep doing ablations and finally we have a model out
 It's just 100M model (smaller than GPT-2 small ) and it works better (no, its not SOTA model, its at GPT-2 stage as POC only.. POC is very good) . best part no KV cache. so no matter if you talk 1 page or 1000 pages... its surely not good for small chats but that can be sorted later.
 Now since its designed on phase associativeness, my hypothisis is that it will work better for voice model also ( but its in very early testing as of now)
 https://huggingface.co/gowravvishwakarma/qllm-pam-v11-e3k3-chat
 currently it is simple trained on 4B pretrained (dclm ~52%, fineweb ~40%, smoltalk2 ~8%) and than SFT of smoltalk2 (hard limit) . initial 1B was web-only to pick grammer first.
 all code is open sourced
 https://github.com/gowrav-vishwakarma/qllm2
 and here are some test run result on this model (and yes it has thinking on/off also)
 https://huggingface.co/gowravvishwakarma/qllm-pam-v11-e3k3-chat/blob/main/SAMPLES_round-4b-gate.md
 rosting is okay but do not just discard as AI SLop.. see the repo.. and hours and hours and hours of GPU w
