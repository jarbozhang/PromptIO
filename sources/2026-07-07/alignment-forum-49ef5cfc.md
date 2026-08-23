---
title: Why Do Naive SFT Filters For Safety Properties Fail?
url: >-
  https://www.alignmentforum.org/posts/wyZRNgpeiPeRXB6eT/why-do-naive-sft-filters-for-safety-properties-fail
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-14T19:45:10.000Z'
fetched_at: '2026-07-06T23:01:47.463Z'
---
This is the fourth in a series of informal research updates from the Google DeepMind Language Model Interpretability team, in interpretability and adjacent areas. The third post can be found here.

Since SFT is the cause for many safety relevant properties, a natural strategy is to filter out rollouts from SFT that have undesirable properties. However, as we show in this section (and in forthcoming MATS work), SFT data filtering frequently works surprisingly poorly. In this post, we investigate hypotheses for why SFT filtering fails.
TL;DR:

We discuss seven hypotheses for why SFT filtering works surprisingly poorly
We analyze three hereditary traits that SFT-only Gemini has that other models do not: negative emotion, date confusion, and blackmail in the (highly contrived) agentic misalignment scenario
We use a “post-training diffing pipeline” between Gemini and Olmo to show that the cause of date confusion and blackmail is largely surprising transfer of behaviors from the SFT teacher model.
Notably, there exist small sets of prompts where switching the teacher model for the rollout removes date confusion and blackmail, but dropping the prompts does not.

Negative emotion is less affected by the teacher model, but this may be because the Olmo prompt distribution we are SFTing on underspecifies the behavior.
Takeaways:
It’s hard to remove behaviors via filtering
But if you can get a teacher model to have a behavior (e.g. via RL), then transferring that in the future is easier


“Spooky” generalization can happen in practice; we still don’t know the exact datapoints or characteristics of data that cause behaviors to still transfer after filtering


Initial Hypotheses
There are a a number of possible hypotheses for why filtering of post-training data does not work better:

“Simple” generalization: there are some examples that have very mild versions of the trait that are hard to detect and filter out, and these bleed over to more obvious forms of the trait in evals.
Su
