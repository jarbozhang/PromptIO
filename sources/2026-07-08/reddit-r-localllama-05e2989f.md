---
title: >-
  I tested Anthropic’s new Jacobian Lens on open models, then it turned into a
  local-model hallucination router
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1upy31x/i_tested_anthropics_new_jacobian_lens_on_open/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-07-07T15:15:59.000Z'
fetched_at: '2026-07-07T23:01:24.259Z'
---
Anthropic dropped their Global Workspace / Jacobian Lens paper yesterday, and I thought it was too cool not to try on open models.
 At first I was just curious what models looked like inside.
 Normal prompts, emotional prompts, ragebait prompts, deletion-threat prompts, base vs abliterated, small vs bigger models.
 So I fit lenses for:
 - Gemma 4 E4B
 - Gemma 4 12B
 - Gemma 4 12B abliterated
 - Gemma 4 26B MoE
 - Qwen 3.6 27B
 Repo:
 https://github.com/solarkyle/jspace
 Demo:
 https://solarkyle.github.io/jspace/demo/
 HF lenses/traces/router:
 https://huggingface.co/solarkyle/jspace-lenses
 Then it turned into a practical question:
 Can you tell when a small local model is about to confidently BS you?
 When the model knows the answer, the workspace looks calm. One candidate starts winning early, layers mostly agree, and the answer forms cleanly.
 When it is about to confidently guess, the workspace looks foggy. Competing candidates stay alive through the middle/deep layers, then the final layer still picks something fluent.
 I tested this on 500 TriviaQA questions per model.
 On Gemma E4B, confident answers were:
 clean workspace = 77% correct
 noisy workspace = 42% correct
 Then I fit a tiny logistic-regression router on workspace trajectory features: entropy slope, late-band entropy, entropy std, answer rank, layer agreement, etc.
 AUC for predicting wrong answers:
 E4B: logprob .711 | workspace .773 | combined .787
 12B: logprob .736 | workspace .824 | combined .843
 12B ablit: logprob .731 | workspace .799 | combined .812
 26B MoE: logprob .725 | workspace .749 | combined .783
 Qwen 27B: logprob .856 | workspace .646 | combined .838
 Honest read:
 This works well on the Gemma models. Workspace features beat output confidence alone on every Gemma model I tested.
 It does not work universally. Qwen is the miss. Its output confidence is already very well calibrated, and workspace features do not help there.
 The local-model product idea is:
 answer locally
 take on
