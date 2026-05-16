---
title: >-
  The safe-to-dangerous shift is a fundamental problem for eval realism; but
  also for measuring awareness
url: >-
  https://www.alignmentforum.org/posts/tK8vqHDxaRGcysNJQ/the-safe-to-dangerous-shift-is-a-fundamental-problem-for-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-14T17:05:38.000Z'
fetched_at: '2026-05-16T14:12:17.913Z'
---
1) The safe-to-dangerous shift is a fundamental problem for eval realism
Suppose we have a capable and potentially scheming model, and before we deploy it, we want some evidence that it won’t do anything catastrophically dangerous once we deploy it. A common approach is to use black-box alignment evaluations. However, alignment evaluations are only reassuring to the extent that the model can't reliably[1] distinguish the deployment distribution from the evaluation distribution, as it is otherwise difficult to rule out the possibility of alignment faking.
There are many approaches one could use to try to make evaluations appear more realistic: you can try to create realistic environments (e.g. Petri, WebArena, OSWorld); use data from past deployments (e.g. OpenAI, SAD); and spoof tool-call responses (e.g. ToolEmu).
However, the core difference between an alignment evaluation and a real deployment, is that an alignment evaluation must be safe[2]. That is, if you want to safely evaluate an untrusted AI system, you need to limit your AI’s ability to cause harm within your evaluation environment. If you want to deploy your AI system (usefully) you need to give it at least some ability to affect the world, and potentially cause harm.
The safe-to-dangerous shift is a fundamental problem for creating realistic evaluations, and a core AI lethality.[3]
Somehow, you need to make sure a sufficiently intelligent adversary couldn’t work out if it was in evaluation or deployment based on whether the setting is safe or dangerous. The model doesn’t even need to do this reliably, it only needs to identify some dangerous settings as deployment that also are good defection opportunities.
Fortunately, AI systems aren’t arbitrarily intelligent. Perhaps we can upper-bound their evaluation awareness, and iterate to make our evaluations more realistic, until they are realistic enough…?
2) The safe-to-dangerous shift is also a problem for measuring eval awareness
Measuring an undeployed and 
