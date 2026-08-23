---
title: 'Pragmatic FDT, and predictors as game theory'
url: >-
  https://www.alignmentforum.org/posts/SdGbWkCZgCN7EGBxM/pragmatic-fdt-and-predictors-as-game-theory-1
source: Alignment Forum
source_type: rss
language: en
published: '2026-07-03T13:22:38.000Z'
fetched_at: '2026-07-11T23:02:13.381Z'
---
Decision theory is back in fashion (defining fashion as "one good post on a good EA blog"). Bentham's Bulldog (BB) has published a case against FDT (functional decision theory), contrasting rationalist enthusiasm with academic scepticism: "Academic decision theorists don't like the theory. The number of academic decision theorists who adopt it could be counted on one hand by someone missing four of their fingers."
I am, just barely, a published academic decision theorist, so you can keep a small finger to count me too. My position is that, though FDT may have problems with its definitions and under-definedness, we can build defined variants that achieve what FDT attempted to.
I want to do two things in this post. First, sketch a "pragmatic" version of FDT designed to sidestep the theoretical pitfalls that Will MacAskill and Wolfgang Schwarz identify. Second, take a closer look at what predictors actually do, and argue that whenever they make counterfactual predictions, decision theory shades into game theory -- which explains why EDT/TDT/UDT/FDT can look irrational in the odd branch. It's the old debate of "should you pay the blackmailer", dressed up in predictor garb.
Pragmatic FDT
MacAskill and BB both press on the difficulty of saying, formally, whether two algorithms are "the same." Rather than solving that, I'm going to retreat and declare victory. I won't define whether two algorithms are the same in any abstract sense, and I'll ignore logical counterfactuals and counterpossibles entirely. Instead I say that two algorithms are equivalent if an equivalence can be built between how they behave as functions:
p-FDT: a pragmatic FDT agent decides in four steps:
Baseline. Compute the CDT
      [1]
     input-output map 


mjx-container[jax="CHTML"] {
  line-height: 0;
}

mjx-container [space="1"] {
  margin-left: .111em;
}

mjx-container [space="2"] {
  margin-left: .167em;
}

mjx-container [space="3"] {
  margin-left: .222em;
}

mjx-container [space="4"] {
  margin
