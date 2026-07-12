---
title: >-
  I mapped Anthropic’s J-Space Hallucination signal across 7 datasets on
  Qwen3-4B to find out where it works and where it breaks
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uu61wb/i_mapped_anthropics_jspace_hallucination_signal/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-12T05:06:55.000Z'
fetched_at: '2026-07-12T23:01:41.973Z'
---
Anthropic recently published their paper on "Global Workspaces" (J-Space) inside language models, showing that looking at internal "workspace noise" (entropy) can catch hallucinations better than just looking at output logprobs. `solarkyle` followed up with a great open-source implementation showing it could route confident errors on TriviaQA.
 I wanted to see if this actually holds up as a deployable tool, so I ran a stress-test: extracting J-Space entropy from the late layers (L30-L34) of Qwen3-4B across ~11,400 examples and 7 completely different dataset distributions.
 Here are my findings:
  
It is a great router for extreme fact-retrieval.
  
Output logprobs are great for catching obvious uncertainty (low confidence). But J-Space noise shines in the dangerous "high-confidence but wrong" quadrant. For example, on PopQA (obscure long-tail facts), setting a tight 5% routing budget for human review using confidence yielded worse-than-chance precision (87.5% against a 90% base error rate). Routing by workspace noise caught errors with 100% precision. 
  
It is completely blind to internalized myths.
  
I ran the pipeline on TruthfulQA (adversarial human myths). The predictive power of the metric collapsed entirely. Even when the model was in the "safest" quadrant (High Output Confidence + Clean/Low-Noise Workspace), it was wrong 84.9% of the time.
 Mechanistic takeaway: Workspace noise detects epistemic guessing (when the model is frantically assembling a fake answer). It cannot detect ontological falsehoods (when the model effortlessly retrieves a fake fact burned into its pre-training data).
  
Math destroys static thresholds.
  
I tried applying the "noisy" threshold calibrated on TriviaQA directly to GSM8K (math derivation). It completely broke. The mean noise score for correct GSM8K answers shifted to 1.636—higher than the threshold (1.583) used to flag errors on factual datasets.
 Mechanistic takeaway: "Thinking step-by-step" through math is a structurally hi
