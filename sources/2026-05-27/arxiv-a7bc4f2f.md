---
title: 'DiscoverPhysics: Benchmarking LLMs for Out-of-the-Box Scientific Thinking'
url: 'https://arxiv.org/abs/2605.26087v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Matt L. Wiemann
  - Lindsay M. Smith
  - Peter Melchior
  - Siddharth Mishra-Sharma
  - Andrew Gordon Wilson
categories:
  - stat.ML
  - cs.LG
  - stat.ML
published: '2026-05-25T17:50:07Z'
fetched_at: '2026-05-27T01:19:09.168Z'
---
Frontier LLMs now perform strongly across a wide range of physics evaluations, but it is hard to disentangle genuine reasoning from recall of established science. We introduce DiscoverPhysics, an interactive benchmark that asks a LLM agent to discover the laws of motion of a simulated world whose physics deliberately deviates from our own. We construct 22 worlds governed by, among others, screened and fractional-power gravity, multi-species couplings, hidden dark-matter-like particles, non-coordinate-free physics, and time-varying interactions. Each world is generated on demand by an N-body simulator, for which the agent proposes several rounds of experiments, observes raw trajectory data, and ultimately submits both a natural-language explanation of the world's physics and a Python implementation of the inferred law. Because solving a world requires the agent to design informative experiments and revise its hypotheses, the benchmark probes long-horizon reasoning over an experimental history. We evaluate submissions along two complementary axes: trajectory MSE on held-out particles and an LLM-judged explanation score following an expert-written rubric assessing conceptual understanding of each world. Across eleven frontier models, we find that the strongest agents pass only half of the worlds and consistently fail on those where latent structure must be uncovered. Open-source models lag substantially behind commercial models, both in their ability to design informative experi

Authors: Matt L. Wiemann, Lindsay M. Smith, Peter Melchior, Siddharth Mishra-Sharma, Andrew Gordon Wilson
Categories: stat.ML, cs.LG, stat.ML
