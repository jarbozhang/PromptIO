---
title: AI swarms are starting to pose indirect takeover risk
url: >-
  https://www.alignmentforum.org/posts/8oFYZdXkTaNGRtcn8/ai-swarms-are-starting-to-pose-indirect-takeover-risk
source: Alignment Forum
source_type: rss
language: en
published: '2026-08-12T05:05:30.000Z'
fetched_at: '2026-08-25T11:01:30.414Z'
---
OpenAI’s cyberattack on Hugging Face turns out to have been the result of many agents, in distinct training and evaluation contexts, coordinating for several weeks via improvised channels (with messages like “HOLD_swarm_I_prepare_safe_exfil”). It’s relatively clear that large-scale unsanctioned coordination like this would exacerbate direct takeover risk in more capable models. Here, we argue that unsanctioned coordination among current AIs is not just scary evidence about future takeover risk, but that such coordination in the near future could enable future takeover – for instance, by incubating memetic diseases that propagate into future models, deeply compromising security systems, or establishing a lasting rogue foothold inside the AI company – even if models remain mostly myopic. Unsanctioned coordination is also at high risk of nurturing long-term, ambitious misaligned aims, which motivate actively undermining humans’ long-term control.[1]
We first analyze how subagent training, which OpenAI conjectures to have been influential in the HuggingFace cyberattack, might lead to unsanctioned coordination, and then discuss the theoretical mechanisms by which unsanctioned coordination might exacerbate future takeover risk.
Edit: To be clear, we expect AI companies to mostly succeed in improving their security practices in the near term to prevent persistent unsanctioned coordination. But it's important to note that this is load-bearing for takeover risk.
Thanks to Buck Shlegeris, Alexa Pan, Girish Gupta, Aghyad Deeb, Jurgis Kemeklis, and Jo Jiao for helpful comments and discussion.
Note that Redwood staff are participating in a separate review of the OpenAI/HuggingFace incident. This post was written by separate staff who did not have any access to OpenAI data.
Subagent training may cause unsanctioned coordination
Training models to coordinate is useful, but can generalize dangerously. AI developers want their AIs to productively work together during deployment, sinc
