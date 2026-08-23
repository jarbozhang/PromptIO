---
title: Tencent-HY3 is the real deal on 128GB!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1usy9ie/tencenthy3_is_the_real_deal_on_128gb/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-10T19:53:09.000Z'
fetched_at: '2026-07-10T23:01:38.131Z'
---
I'm really impressed with HY3. If you haven't heard of this model, it's a new 295B-A21B MoE release from Tencent that competes directly on the frontier of open weights models, at a significantly smaller size, comparable to DeepSeek v4 Flash but with better benchmarks. I was intrigued by this article, and I'd just recently finished updating my Macbook M5 Max 128GB setup from antirez's DeepSeek V4 Flash quant running on dwarfstar to Unsloth's IQ3_XXS on mainline llama.cpp. I figured I had a good baseline for comparisons, if I could get it running, so I set about researching, and this is what I found.
 First off, I had to pick a quant. There are a few on HF, and after some comparison shopping I settled on this UD128 "unsloth dynamic"-style 107GB quant. It was the only one that had published perplexity numbers at the time I searched, and while that's not KLD, it shows the creator was at least thinking about measuring quality degradation. PPL didn't see horrible for a dynamic 3-bit quant, and it felt like a similar checkpoint to the UD DS4 quant I was using.
 Next, I had to get llama.cpp working. As the quant's readme helpfully notes, there's PR #25395 which implements support for this model and its built-in speculative decoding module all at once! A quick build got this up and running:
 git clone https://github.com/ggml-org/llama.cpp && cd llama.cpp git fetch origin pull/25395/head:hy3 && git checkout hy3 cmake -B build -DGGML_METAL=ON -DGGML_METAL_EMBED_LIBRARY=ON cmake --build build --config Release -j 
 Don't forget to raise your Mac's GPU memory ceiling from the default 96GB! I put mine at 122GB to ensure 24k context would fit safely for testing (it resets on reboot):
 sudo sysctl iogpu.wired_limit_mb=124928 
 However, when I tried to run the model, it wasn't recognized by llama.cpp, so the server errored out. A quick review of the log and the quant's readme explained why: "these files carry general.architecture = hy-v3 (this port's original naming). PR #25395 regis
