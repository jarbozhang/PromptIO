---
title: '[Linkpost] Interpreting Language Model Parameters'
url: >-
  https://www.alignmentforum.org/posts/eAQZaiC3PcBhS4HjM/linkpost-interpreting-language-model-parameters
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-05T17:37:29.000Z'
fetched_at: '2026-05-17T11:21:59.222Z'
---
This is the latest work in our Parameter Decomposition agenda. We introduce a new parameter decomposition method, adVersarial Parameter Decomposition (VPD)[1] and decompose the parameters of a small[2] language model with it. 
VPD greatly improves on our previous techniques, Stochastic Parameter Decomposition (SPD) and Attribution-based Parameter Decomposition (APD). We think the parameter decomposition approach is now more-or-less ready to be applied at scale to models people care about.



Importantly, we show that we can decompose attention layers, which interp methods like transcoders and SAEs have historically struggled with.


We also build attribution graphs of the model for some prompts using causally important parameter subcomponents as the nodes, and interpret parts of them. 
While we made these graphs, we discovered that our adversarial ablation method seemed pretty important for faithfully identifying which nodes in them were causally important for computing the final output. We think this casts some doubt on the faithfulness of subnetworks found by the majority of other subnetwork identification methods in the literature.[3][4] More details and some examples can be found in the paper.

Additionally, as with our previous technique SPD, VPD does not seem to suffer from (the parameter space analog of) 'feature splitting', either in principle or in practice.[5]
We also do a bunch of other comparisons to per-layer transcoders and CLTs and find that our approach compares somewhat favourably (details in post). 


Abstract

Neural networks use millions to trillions of parameters to learn how to solve tasks that no other machines can solve. What structure do these parameters learn? And how do they compute intelligent behavior?
Mechanistic interpretability aims to uncover how neural networks use their parameters to implement their impressive neural algorithms. Although previous work has uncovered substantial structure in the intermediate representations that netw
