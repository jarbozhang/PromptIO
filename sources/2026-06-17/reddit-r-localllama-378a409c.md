---
title: 'Get in here: Community model build thread'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1u7mn85/get_in_here_community_model_build_thread/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-16T18:57:06.000Z'
fetched_at: '2026-06-17T03:03:11.628Z'
---
You absolutely can create a community model through crowdsourced compute, and there are at least 2 ways to do it. This thread is a attempt to refocus this thread (which is devolving into pseudo-experts explaining why a pooled approach isn’t possible): https://old.reddit.com/r/LocalLLaMA/comments/1u77xo3/joing_all_gpus_to_train_a_community_model/
 It is true that you can’t reasonably try to create a compute cluster by networking everyone’s rigs together, but that is a straw man of sorts as you literally don’t have to. Generally, the main strategy involves making a MoE through a variant of ‘Branch-Train-Stitch’. In short, you distribute a ‘prototype’ dense model (with specific shape and architecture, later) to everyone who wants to participate, people train this prototype model on their own hardware independently, and then resubmit the narrow-domain trained submodels back to the organizers who stitch the submodels into a large MoE. There are a number of catches, and decisions that everyone participating would have to decide on.
 Target size of the prototype (or, who gets to participate)
 This decision affects how many people could possibly contribute, and should probably be handled by a poll as it is fundamentally an engagement question. I went through the old subforum hardware poll (https://old.reddit.com/r/LocalLLaMA/comments/1op0j6j/recent_vram_poll_results/) - Given we have literally thousands amongst us with more than 12GB vram, we could easily decide on a prototype size around 2B and end up with far more participants than we could reasonably include in the final model.
 If we bump it a notch (to 32GB vram), we could distribute a 7B prototype, which has other considerations (e.g. the final MoE is likely to end up being in the 500B-1T size class, which would literally be unrunnable for the overwhelming majority of the forum, training for the router and heal post merge would be ridiculously expensive, the time window for the members to train and submit the submodel
