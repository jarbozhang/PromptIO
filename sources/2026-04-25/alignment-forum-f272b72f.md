---
title: Five approaches to evaluating training-based control measures
url: >-
  https://www.alignmentforum.org/posts/mDcHzdoxB6sh3w2zG/five-approaches-to-evaluating-training-based-control
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-18T01:07:32.000Z'
fetched_at: '2026-04-25T09:06:11.703Z'
---
Training-based control studies how effective different training methods are at constraining the behavior of misaligned AI models. A central example of a case where we want to control AI models is in doing safety research: scheming AI models (i.e., AI models with an unintended long-term objective such as maximizing paperclips) would likely be motivated to sabotage our safety research, but we’d like to “force” them to do a good job on it anyways. In this post, I’ll discuss 5 approaches for evaluating how effective a training method is, and discuss their pros and cons.
(In this post “I” refers to Alek. I’ve developed these ideas in discussion with my coauthors, but they might not agree with everything I’m saying). Thanks to Carlo Leonardo Attubato for feedback on a draft of this post. Thanks to Buck Shlegeris for some discussions that partially inspired this post.
Here are the 5 approaches:

“YOLO”. Try to assess how well the technique works by using it in production at the point where AI models are actually capable enough that you want them to do the task of interest. Do A/B testing to compare training methods.
Test the technique on malign inits. A malign init is a synthetic misaligned AI constructed by a fairly conservative red team (i.e., the red team tries its hardest to defeat the blue team, within a set of legal red team moves). The malign init doesn’t have to be produced by a process that looks anything like an actual AI training pipeline. However, we discourage the red team from producing malign inits with very “weird” internal mechanisms[1] that are unlikely to arise naturally when training an AI system that isn’t an extremely competent gradient hacker. Examples of malign inits include ​​Password-Locked Models and Sleeper Agents.
Test the technique on AIs that result from fairly realistic, but slightly rigged training processes. This approach is distinct from the malign inits approach because we are optimizing more for realism of the training process than we a
