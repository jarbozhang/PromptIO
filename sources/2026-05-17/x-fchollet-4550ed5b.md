---
title: "Agentic coding is a form of machine learning. Generated code is best treated as a blackbox artifact "
source: "X @fchollet"
url: "https://x.com/fchollet/status/2053234697392754701"
date: "2026-05-09T22:04:33.000Z"
likes: 1094
reposts: 100
replies: 88
tweet_id: "2053234697392754701"
author: "fchollet"
---
Agentic coding is a form of machine learning. Generated code is best treated as a blackbox artifact whose behavior and generalization should be managed via empirical evaluation, like with any ML model.

Quoted tweet:
@fchollet: Sufficiently advanced agentic coding is essentially machine learning: the engineer sets up the optimization goal as well as some constraints on the search space (the spec and its tests), then an optimization process (coding agents) iterates until the goal is reached.

The result is a blackbox model (the generated codebase): an artifact that performs the task, that you deploy without ever inspecting its internal logic, just as we ignore individual weights in a neural network.

This implies that all classic issues encountered in ML will soon become problems for agentic coding: overfitting to the spec, Clever Hans shortcuts that don't generalize outside the tests, data leakage, concept drift, etc.

I would also ask: what will be the Keras of agentic coding? What will be the optimal set of high-level abstractions that allow humans to steer codebase 'training' with minimal cognitive overhead?
