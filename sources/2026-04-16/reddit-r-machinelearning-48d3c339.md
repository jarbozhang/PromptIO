---
title: >-
  Seeking Critique on Research Approach to Open Set Recognition (Novelty
  Detection) [R]
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1smhiz6/seeking_critique_on_research_approach_to_open_set/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-15T20:14:01.000Z'
fetched_at: '2026-04-16T06:06:04.643Z'
---
Hey guys, I'm an independent researcher working on a project that tries to address a very specific failure mode in LLMs and embedding based classifiers: the inability of the system to reliably distinguish between "familiar data" that it's seen variations of and "novel noise."
 The project's core idea is moving from a single probability vector (P(class|input)) to a dual-output system that measures μ(x), a continuous familiarity score bounded [0,1], derived from set coverage axioms.
 The detailed paper is hosted on GitHub: https://github.com/strangehospital/Frontier-Dynamics-Project/blob/c84f5b2a1cc5c20d528d58c69f2d9dac350aa466/Frontier%20Dynamics/Set%20Theoretic%20Learning%20Environment%20Paper.md
 ML Model: https://just-inquire.replit.app --> autonomous learning system
 Why I'm posting here:
 As an independent researcher, I lack the daily pushback/feedback of a lab group or advisor. Obviously, this creates a situation where bias can easily creep into the research. The paper details three major revisions based on real-world failure modes I encountered while running this on a continuous learning agent. Specifically, the paper grapples with:
  
Saturation Bug: phenomenon where μ(x) converged to 1.0 for everything as training samples grew in high-dimensional space.
 The Curse of Dimensionality: Why naive density estimation in 384-dimensional space breaks the notion of "closeness."
  
I attempted to ground this research in a PAC-Bayes convergence proof and tested it on a ML model ("MarvinBot") with a ~17k topic knowledge base.
 If anyone has time to skim the paper, I would be grateful for a brutal critique. Go ahead and roast the paper. Please leave out personal attacks, just focus on the substance of the material. I'm particularly interested in hearing thoughts on:
 --> Saturation bug
 --> If there's a simpler solution than using the evidence-scaled multi-domain Dirichlet accessibility function used in v3
 --> Edge cases or failures I've been blind too.
 I'm not looking
