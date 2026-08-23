---
title: >-
  60-82% accuracy swing on 4B model classification task: the only variable was
  harness design
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vc4e00/6082_accuracy_swing_on_4b_model_classification/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-31T21:47:42.000Z'
fetched_at: '2026-08-01T11:01:18.098Z'
---
I ran a pre-registered ablation on a classification task (Kubernetes issue → SIG triage) using a 4B model on a 6GB laptop GPU. 
 Same frozen weights, same 250-issue gold corpus, same scorer across every run. The variable under test was harness design: rule placement, evidence order, turn structure, what survives between turns.
 Result: 22 points of accuracy, same model, same task. 60% at the worst harness, 82% at the best.
 "This model is bad at X" is often actually "my harness is bad at X."
 What moved accuracy:
  
Explicit rules in the prompt: +13
 Task before reference material (not after): +6.5
 One extra reasoning turn: −5
 Clearing context each turn, carrying a summary forward instead of raw evidence: −12
 Fresh-session handoff between stages: −15
  
The worst-designed harness paid for an extra stage and 250 tool calls and got nothing for it - landed right back at bare-model accuracy. 
 Everything's public and archived - corpus, scorer, pre-registration, every run manifest. You can re-score the results without a GPU; you only need one to generate new predictions.
 Eval harness: https://github.com/TGPSKI/leather/blob/main/examples/14-sig-triage/eval/README.md
 Example overview: https://github.com/TGPSKI/leather/tree/main/examples/14-sig-triage
 Matrix results: https://github.com/TGPSKI/leather/blob/main/examples/14-sig-triage/eval/results/MATRIX.md
    submitted by    /u/TGPSKI  
 [link]   [comments]
