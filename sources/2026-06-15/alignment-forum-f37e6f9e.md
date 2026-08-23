---
title: Can activation verbalizers surface an internal chain of thought?
url: >-
  https://www.alignmentforum.org/posts/QQQAcKuWK6k98FivY/can-activation-verbalizers-surface-an-internal-chain-of-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-07T04:24:01.000Z'
fetched_at: '2026-06-14T23:18:58.333Z'
---
We introduce an evaluation for activation verbalizers: can they surface a target model's reasoning as it solves a math problem in a single forward pass? For open-weight NLAs, the answer seems to be: "possibly, but definitely not reliably".
Lots of important capabilities currently require AI models to reason "out loud" in a natural-language chain of thought, which means that we can monitor important parts of their thinking. It would be nice to have this same affordance for the reasoning that models do within a single forward pass, especially if the sophistication of that opaque reasoning increases to potentially dangerous levels.
Some interpretability tools might offer such an affordance. In particular, an activation verbalizer (AV) takes a residual stream activation and maps it to a natural-language verbalization. An AV is initialized from the target model and trained to generate verbalizations that an activation reconstructor (AR), also initialized from the target model, can accurately map back to the original activation. Together, an AV and its AR form a natural-language autoencoder (NLA). Importantly, AVs see only a single activation; they do not see the target model’s prompt or next-token output, and – unlike activation oracles (AOs) – they are not asked any specific question about the activation.[1]
We introduce a simple evaluation for activation verbalizers, which we apply to the open-weight NLAs for Qwen2.5 (7B), Gemma (3 27B), and Llama (3.3 70B). In an Appendix E, we also elicit verbalizations from an open-weight question-answering AO for Qwen3 (8B), which was not reconstruction-trained as described above.
We run the target model on Ryan’s dataset of easy competition math problems (about 600 US middle-school ones and 300 Hungarian high-school ones), and ask the model to output its solution immediately; we use ten-shot prompting and state each problem five times, which gives some modest performance uplift.[2] We then investigate whether verbalizations at the
