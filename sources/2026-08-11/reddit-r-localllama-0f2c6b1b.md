---
title: 'Luth-2: New State-of-the-Art French Small Language Models'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vlbto8/luth2_new_stateoftheart_french_small_language/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-11T08:41:13.000Z'
fetched_at: '2026-08-11T11:01:01.022Z'
---
Hey everyone,
 Today we release Luth-2-0.8B and Luth2-2-2B, two non-reasoning models that set a new state of the art for French across a wide variety of tasks for their size 🚀
 A few notable scores on French benchmarks compared to models 〜3 times their size:
 - Luth-2-2B scores 69.67 vs Gemma-4-E2B-it at 65.17 on Multi-IF.
 - Luth-2-0.8B scores 72.92 vs granite-4.0-h-micro at 55.60 on MGSM-Rev2.
 - Luth-2-2B scores 81.52 vs Gemma-4-E2B-it at 81.24 on Math-500.
 Luth-2 builds on our previous work with several substantial improvements. We introduce a new 3B-token SFT mixture covering a broader range of domains, including mathematics, knowledge, code, tool calling, instruction following, multi-turn dialogue, and science. We also use reinforcement learning through expert specialisations and multi-domain on-policy distillation (MOPD) to further extend the models’ capabilities. Finally, we move to Qwen3.5 as the backbone, as we found it to be substantially more receptive to post-training.
 The resulting models outperform every model in their size class across the selected French benchmarks, while staying competitive with much bigger models. Both are light enough to run locally for on-device use. More broadly, these results suggest that current multilingual SLMs still leave substantial capability on the table outside English, even for high-resource languages like French.
 Luth-2-2B and Luth-2-0.8B are available now on Hugging Face:
 🤗 Models: Luth-2-0.8B | Luth2-2-2B | Luth-2-0.8B-GGUF | Luth2-2-2B-GGUF |
 📚 Data: Luth-2-Post-Training-SFT | Luth-2-Post-Training-RL
 💻 Code: https://github.com/kurakurai/Luth-2
 ✏️ Blog: https://huggingface.co/blog/MaxLSB/luth-2
 🏆 FR Leaderboard: https://huggingface.co/spaces/kurakurai/llm_leaderboard_fr
 We’d love to hear your feedback, so don’t hesitate to give it a try! 🙂
    submitted by    /u/Unusual_Shoe2671  
 [link]   [comments]
