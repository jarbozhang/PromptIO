---
title: Thousand-dimensional structure
url: >-
  https://www.alignmentforum.org/posts/sFhW3ZnPMJdnB4Dd6/thousand-dimensional-structure-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-30T14:04:05.000Z'
fetched_at: '2026-08-09T11:01:39.800Z'
---
Summary: One area we plan to explore at Resolution is personas and character training, operationalized as finding and controlling low-dimensional structure in models that emerges in pretraining and flows through post-training to superintelligence. The hope is to expand and systematize phenomena such as emergent misalignment, subliminal learning, and other empirical persona research, then intervene on this structure without accidentally hiding undesirable behavior elsewhere. If this approach resonates with you, consider working with us. 
Glimmers of low-dimensional structure
Our understanding of AI training and alignment as a field is very poor. If sufficient alignment of superintelligent AI agents requires pinning down the precise meaning of alignment and turning that meaning into high-accuracy training data and algorithms, we are likely to fail. Modern LLMs have trillions of parameters: our understanding is unlikely to be sufficient to pin down a trillion separate numbers.
Happily, there is a growing literature on such low-dimensional structure in AI models, showing that intervening on one aspect of model behavior has strong downstream effects on other aspects:


Topic

Description


Emergent misalignment

Betley et al. 2025 found that LLMs fine-tuned to output insecure code can become broadly misaligned across many other behaviors. MacDiarmid et al. 2025 found the same effect after reinforcement learning in production environments that permit reward hacking (Golechha et al. 2026 has an open-weight case).


Subliminal learning

Cloud et al. 2025 found that instilling preferences into a teacher LLM and using it to generate seemingly unrelated fine-tuning for a student LLM still resulted in the student inheriting the preferences of the teacher. Blank et al. 2026 show this transfer is controlled by a steering vector, and Morgulis and Hewitt 2026 show the vector transfers accurately.


Alignment pretraining

Tice et al. 2026 find that removing AI discourse in pretraini
