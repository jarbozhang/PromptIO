---
title: No wonder Qwen and Gemma are so different
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vjb15v/no_wonder_qwen_and_gemma_are_so_different/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T00:04:15.000Z'
fetched_at: '2026-08-09T11:01:08.931Z'
---
Pasted the same HTML/JS code (330 lines) into Qwen 35B A3B and Gemma 26B A4B.
 Qwen: tokenized the input to 1609 tokens
 Gemma: tokenized the input to 4258 tokens.
 Damn. I've never noticed this before and I haven't seen people mention it. That alone helps explain why Qwen is regarded as better at coding and Gemma at language tasks.
 Qwen can literally see the code as some specific form of input/output, while Gemma is breaking it down into pieces of words like regular language. Qwen also gets a totally different reasoning personality when given coding tasks.
 Btw with the instruction document (55 lines), the tokenization breakdown is almost the same: 1025 vs. 1039 tokens.
 I've seen some project, by LiquidAI I think? To retrain existing models with a more efficient tokenizer. I wonder what that would do for a model like Gemma, whether it would help it catch up.
    submitted by    /u/WhoRoger  
 [link]   [comments]
