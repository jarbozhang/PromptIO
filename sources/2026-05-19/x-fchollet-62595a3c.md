---
title: "Agentic coding is a form of machine learning. Generated code is best treated as a blackbox artifact "
source: "X @fchollet"
url: "https://x.com/fchollet/status/2053234697392754701"
date: "Sat May 09 22:04:33 +0000 2026"
likes: 1095
reposts: 99
replies: 88
---

Agentic coding is a form of machine learning. Generated code is best treated as a blackbox artifact whose behavior and generalization should be managed via empirical evaluation, like with any ML model.

---

Quoted tweet:

Sufficiently advanced agentic coding is essentially machine learning: the engineer sets up the optimization goal as well as some constraints on the search space (the spec and its tests), then an optimization process (coding agents) iterates until the goal is reached.

The result is a blackbox model (the generated codebase): an artifact that performs the task, that you deploy without ever inspecting its internal logic, just as we ignore individual weights in a neural network.

This implies that all classic issues encountered in ML will soon become problems for agentic coding: overfitting to the spec, Clever Hans shortcuts that don't generalize outside the tests, data leakage, concept drift, etc.

I would also ask: what will be the Keras of agentic coding? What will be the optimal set of high-level abstractions that allow humans to steer codebase 'training' with minimal cognitive overhead?
