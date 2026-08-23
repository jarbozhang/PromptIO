---
title: Local benchmarks with a RTX 3090 - Qwen3.6 27b vs Ornith
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1ulthkp/local_benchmarks_with_a_rtx_3090_qwen36_27b_vs/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-02T20:24:29.000Z'
fetched_at: '2026-07-02T23:00:55.716Z'
---
Hey folks. I've been frustrated by how difficult it is to get an idea of how good each new model (or fine-tune) is, and I've not been satisfied with the one-off "draw a pelican riding a bike" style tests that we often fall back on. New models or model variants that can run locally on my RTX 3090 almost never get proper benchmark coverage from anyone but the folks who make them. Lately, I wanted to see how Ornith 35b compared to Qwen3.6 27b.
 So I've been playing around with inspect-ai and a bunch of standard benchmarks that are available in their inspect-evals package. I'd like to be able to run a complete set of benchmarks on a new model overnight, and have some broad indication of how they compare in the morning. I'm not there yet, but I wanted to share the benchmarks I've run so far comparing Qwen3.6 27b (Q4_K_M), Gemma4 26B A4B QAT (Q4_0), and Ornith1.0 35B MoE (Q4_K_M). I am still running on LM Studio at the moment, so I ran the benchmarks below on lmstudio-community provided models, except Ornith, which I got from the deepreinforce-ai account.
 TLDR
 I tested all three on benchmarks with a limited number of samples (100) and aggressive limits. I expected Ornith to be nearly as good as Qwen3.6 27b at coding tasks, but not quite. I expected, as a fine tune, for it to be worse on general knowledge and grounding. But the final picture wasn't quite that clear. It was as-good or better than Qwen 27b in a little under half of cases, and worse the rest of the time. It claims to be best at agentic tasks though, and I haven't managed to successfully run most of the agentic benchmarks.
 Specifics of each benchmark follow with some notes. And my thoughts on how painful it has been trying to run these benchmarks locally.
 General Knowledge and Reasoning
 Qwen takes the best (or joint best) score in 4 / 6 benchmarks.
 Ornith takes the best (or joint best) in 3 / 6 benchmarks.
 Something about the MMLU benchmark didn't like Gemma. It timed out in a lot of cases, but I haven'
