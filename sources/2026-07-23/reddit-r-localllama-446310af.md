---
title: >-
  Despite not being trained to, it turns out the Pearson correlation between a
  models AA Intelligence Index score and its ability to generate Base64 encoded
  responses is 0.91
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1v3dpsk/despite_not_being_trained_to_it_turns_out_the/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-22T11:43:52.000Z'
fetched_at: '2026-07-23T11:00:53.306Z'
---
I built Encode Bench, an open benchmark that asks a model to solve a task and return the answer as a Base64 payload.
 The initial result surprised me: across the eight models with matching data in the current nine-model snapshot, Encode Bench pass rate has a Pearson correlation of 0.91 with the Artificial Analysis Intelligence Index. The correlation with its Agentic Index is 0.94.
 That sounds dramatic, so the caveat belongs right next to it: this is a small, imperfect observational sample. It does not show that Base64 measures intelligence, and it does not establish causation. SimpleBench is a useful counterexample: its correlation with Encode Bench is only 0.23, although that comparison has just four overlapping models.
 The idea came from an asymmetry I kept seeing: models could often interpret Base64 in a prompt, but some struggled to produce Base64 that decoded into the exact artifact requested. Generating the final payload requires the model to:
  
solve the underlying problem;
 preserve the answer exactly;
 encode it correctly; and
 follow a very narrow output contract.
  
A failure at any link breaks the artifact, so this may be a crude test of multi-step reliability. Or it may mostly reflect tokenizer behavior, training data, post-training, reasoning limits, or provider routing. The current benchmark cannot separate those explanations.
 The scored battery contains 24 deterministic tasks across encoding fidelity, instruction following, arithmetic, logic, code reasoning, and structured data. Each task is run three times, giving 72 scored trials per model. Missing trials, provider failures, invalid Base64, output-cap failures, and Base64 containing the wrong answer all count as failures. A Base64-encoded PNG prompt is included only as a subjective showcase and never enters the score.
 Current results:
  
GPT-5.6 Sol — 70/72 (97.2%)
 Kimi K3 — 63/72 (87.5%)
 Claude Sonnet 5 — 49/72 (68.1%)
 Gemini 3.5 Flash — 46/72 (63.9%)
 DeepSeek V4 Flash — 43/72 (59.7%)
 Hy
