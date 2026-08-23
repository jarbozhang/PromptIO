---
title: How robust are natural language autoencoders to initialization?
url: >-
  https://www.alignmentforum.org/posts/LQXWiF8PyJ5ojNsEv/how-robust-are-natural-language-autoencoders-to
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-10T00:43:29.000Z'
fetched_at: '2026-07-11T23:02:13.378Z'
---
Natural language autoencoders are meant to take in an LLM's activation vector and describe in plain text what the model is thinking. However, its training data collection involves asking Claude to guess what a model might be thinking. How robust are NLAs to these guesses? We change Claude's guesses in various ways and measure the impact on the NLA's statements as well as on reconstruction accuracy. We show that Qwen2.5-7B NLAs have some robustness to irrelevant statements and prevailing sentiments in Claude's guesses.
However, if an NLA is initialized with entirely implausible statements, it can nevertheless achieve nearly the same reconstruction accuracy as plausible-initialized NLAs while emitting 99.3% implausible statements. RL does train implausible-initialized NLAs to be slightly more plausible (increasing from 0.08% to 0.7%). But the plausibility of plausible-initialized NLAs decreases from 21% at initialization to 7.6% at the end of training.
If our results scale, they cast doubt on the usefulness of NLAs.
Produced as part of the MATS program in the summer 2026 cohort of team shard.
Terminology
A "plausible" explanation is an objectively true statement about the world. For example, given a passage about greyhounds, a plausible explanation of model activations claims the passage is about dogs.
"Plausible-initialized" NLAs are initialized normally using Claude's guesses. "Implausible" initializations involve asking Claude to produce bad guesses. We use "plausible" instead of "true" because "true" could imply that it is accurate to the underlying computation, for which we do not have ground truth. Similarly, an "implausible" guess (e.g. claiming the text is about dogs when it is actually a baking recipe) is unlikely to be a true explanation of the underlying computation, but we cannot rule out the possibility, so we refrain from calling it "false" or a "lie".
Introduction
Slava Chalnev and a team at Anthropic (Fraser-Taliente et al. 2026) recently independently
