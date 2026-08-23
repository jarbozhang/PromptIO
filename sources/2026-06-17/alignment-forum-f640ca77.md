---
title: A Mike's-Eye View of ARC's Research
url: >-
  https://www.alignmentforum.org/posts/M2tD23bvQLBqsEpqu/a-mike-s-eye-view-of-arc-s-research
source: Alignment Forum
source_type: rss
language: en
published: '2026-06-09T18:30:45.000Z'
fetched_at: '2026-06-17T03:03:49.477Z'
---
Over the past 15 months or so, ARC's technical agenda has developed quite a bit. The advent of the Matching Sampling Principle (MSP), and ideas like it, has begotten a host of concrete technical problems; progress on those problems has given us more philosophical clarity on the big picture, which has led to even more technical progress. The two most recent public discussions of ARC's research (Jacob's A Bird's Eye View of ARC's Research and David's Obstacles in ARC's research agenda) both came out before this flywheel really got spinning, and a lot of what we now consider central to the agenda isn't reflected in either of them. The goal of this post is to give a clear, updated picture of what we're actually trying to do. This is written from my point of view; I don't speak for my whole organization.
Here is ARC's hoped-for pipeline for aligning a powerful AI: monitor training to detect structure as it is added to the model; convert that structure into advice that improves an MSP-style mechanistic estimator of the model's behavior; use the resulting estimator, together with a description of the relevant input distribution, to estimate a safety-relevant quantity such as the probability of catastrophic failure;[1] then optimize the model against that estimate. The key advantage over black-box evaluation is that we are not waiting for catastrophic behavior to appear often enough in samples, or even to have so much as a single sample on which the model behaves catastrophically. We are trying to infer, from facts about the learned algorithm itself, how often rare but unacceptable behaviors are likely to occur.
To make this pipeline a reality, we need roughly the following ingredients:
Wide-ranging mechanistic estimators, in the spirit of the Matching Sampling Principle. These take a description of a computation — e.g. the weights of a neural network — and estimate some property of its behavior (e.g. expected loss on a distribution) without relying on input-output samples.
