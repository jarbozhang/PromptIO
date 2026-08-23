---
title: 'Data filtering works a lot worse than you would expect '
url: >-
  https://www.alignmentforum.org/posts/aTybJ6CPQrxEY8rE2/data-filtering-works-a-lot-worse-than-you-would-expect
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-07T04:41:59.000Z'
fetched_at: '2026-07-09T23:01:36.551Z'
---
This work was largely done during Neel Nanda's MATS 10.0 Exploration Phase.  
J Rosser and Dohun Lee are co-first authors for this post with equal contribution. Josh Engels and Neel Nanda supervised the project, and provided guidance and feedback throughout. 
Tweet Thread
TLDR

Models can acquire undesirable traits from during supervised fine-tuning (SFT). A natural thing to try is to identify the data points with these traits and filter them out and retrain.
To our surprise, across most of our broad OLMo SFT behaviors, data filtering often has very little effect.
Most behavior targets like bold formatting, both-side framing, liberal-lean or tendency to say “your feelings are valid” are not affected much under targeted filtering.
We try many standard black-box/white-box training data attribution methods to find the data to filter, including LLM autoraters, probes, activation-based methods, and gradient-based methods like EKFAC. None of them outperform random baseline on most behaviors.
For example, despite less than 0.2% of documents both containing the words “feeling/concern” and “valid”, filtering out 10% of documents chosen across TDA methods does not lead to the model saying “Your feelings are valid” any less.
We test that our training data attribution methods work on a testbed where we mix in emergent misalignment with benign data, where LLM judge is the best performing method, followed by probe.
We also show most “general assistant-like” SFT OLMo behaviors can be reproduced by training on a narrow subset of the data only. For example, OLMo pre-train/mid-train with only coding problems also display liberal-lean and both-sides framing behaviors. This supports the view that these SFT behaviors are difficult to alter via data filtering.
The only “filterable” behavior that we identified seems to be refusal. Probes and LLM Judges are the most effective TDA methods, and probes are significantly cheaper. 
Due to compute constraints, we work with a “speed-run” version 
