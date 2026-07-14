---
title: >-
  PrismML’s new Ternary Qwen3.6 27B runs near fp16 precision on 10GB of
  memory!!!
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uwehzt/prismmls_new_ternary_qwen36_27b_runs_near_fp16/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-14T17:00:15.000Z'
fetched_at: '2026-07-14T23:01:52.319Z'
---
EDIT: "near fp16 precision" I intended performance in terms of benchmarks/output. Obviously 1,0,-1 cannot be fp16. Bad word choice :)
 EDIT 2: Now that more people have tested it reported in, consensus (and my own stuff on more doc/retrieval tasks) is this lands better than Q2 but clearly worse than Q4_K_XL. Hallucinates more, tool-calling loops, etc (using Pi harness). The real story is memory footprint at this quality, which is still nice. Title overstated it - got excited lol. Leaving the post up as-is with this correction.
  
Hey everyone,
 Tim from AnythingLLM and today PrismML dropped Bonsai 27B - which takes the same concept of BitNet/Ternary models the applied to the Bonsai 8B & Image models that can run on a phone with really good accuracy and performance and brought it to Qwen3.6 27B - which is actually an intelligent model.
 So we finally have a proper model beyond 8B that is using this new methodology!
 Bonsai 27B GGUF on M4 Pro via llama.cpp @32K inside OpenComputer. Prompt was \"Do browser research to build me a stylized and interactive HTML report about PrismML (prismml.com) and the work they do.\" Video is obviously fast forwarded for brevity
 I am still running this through my personal workflows/use-cases that are not just benchmarks to find the rough edges, but the video above shows it working in OpenComputer - which is just computer-use. So far, it is definitely working in smaller memory, but its not beating Q4, Q8, levels of intelligence.
 Qwen3.6 27B is already beast and I am running this via the Ternary GGUF using their llama.cpp fork and it is only using ~10GB of memory (@ 32K context on my M4 Pro 48GB). This model is 100% far far far more intelligent than a comparable 2bit quant of Qwen3.6 27B - which is the whole point anyway. So something special is happening here - I just don’t know what.
 From what I understand, dFlash is coming as well, but it’s not clear when and I also am not super clear on MTP support in this model or if it will be su
