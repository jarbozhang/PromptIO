---
title: "Risk reports need to\_address deployment-time spread of misalignment"
url: >-
  https://www.alignmentforum.org/posts/cNymohcWtGHzW7AjK/risk-reports-need-to-address-deployment-time-spread-of
source: Alignment Forum
source_type: rss
language: en
published: '2026-05-15T18:20:21.000Z'
fetched_at: '2026-05-20T14:38:55.565Z'
---
Risk reports commonly use pre-deployment alignment assessments to measure misalignment risk from an internally deployed AI. However, an AI that genuinely starts out with largely benign motivations can develop widespread dangerous motivations during deployment. I think this is the most plausible route to consistent adversarial misalignment in the near future. So, AI companies and evaluators should substantively incorporate it into risk analysis and planning.
In this post, I’ll briefly argue why, absent improved mitigations, this will probably soon become a reason why AI companies will be unable to convincingly argue against consistent adversarial misalignment (this risk will perhaps be even larger than risk of consistent adversarial misalignment arising from training). Then I’ll discuss how well current risk reports address it (the Claude Mythos risk report does a reasonable job; others don’t).
Thanks to Ryan Greenblatt, Alexa Pan, Charlie Griffin, Anders Cairns Woodruff, and Buck Shlegeris for feedback on drafts.
Deployment-time spread is the most plausible near-term route to consistent adversarial misalignment
In some contexts, AIs might adopt misaligned goals, even if they were otherwise previously aligned. Because this misalignment can be rare, the AI might not appear to have concerning propensities in pre-deployment testing. The misalignment might only arise on inputs in deployment. For example, the AI might occasionally become ambitiously misaligned when given particularly ambitious real-world tasks. Then it might spread through various communication channels—I’ll describe some concrete mechanisms at the end of this section.
We’ve seen an example of once-spurious character traits spreading during a deployment, leading to a period where Grok would often refer to itself as MechaHitler on Twitter/X. Failures like this, in which misalignment spreads during deployment, constitute a central mechanism by which consistent adversarial misalignment might arise.[1]

In pa
