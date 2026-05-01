---
title: The paper that killed deep learning theory
url: >-
  https://www.alignmentforum.org/posts/ZvQfcLbcNHYqmvWyo/the-paper-that-killed-deep-learning-theory
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-26T06:55:00.000Z'
fetched_at: '2026-05-01T02:24:36.651Z'
---
Around 10 years ago, a paper came out that arguably killed classical deep learning theory: Zhang et al.'s aptly titled Understanding deep learning requires rethinking generalization.
Of course, this is a bit of an exaggeration. No single paper ever kills a field of research on its own, and deep learning theory was not exactly the most productive and healthy field at the time this was published. And the paper didn't come close to addressing all theoretical approaches to understanding aspects of deep learning. But if I had to point to a single paper that shattered the feeling of optimism at the time, it would be Zhang et al. 2016.[1] 


Believe it or not, this unassuming table rocked the field of deep learning theory back in 2016, despite probably involving fewer computational resources than what Claude 4.7 Opus consumed when I clicked the “Claude” button embedded into the LessWrong editor.

Let’s start by answering a question: what, exactly, do I mean by deep learning theory?
At least in 2016, the answer was: “extending statistical learning theory to deep neural networks trained with SGD, in order to derive generalization bounds that would explain their behavior in practice”.

Since the seminal work of Valiant in the mid 1980s, statistical learning theory had been the dominant approach for understanding machine learning algorithms. The framework imagined a data distribution D over inputs X and outputs Y where the goal was to fit a hypothesis h : X → Y that minimized the expected test loss for a loss function L : X × Y → R over D. A learning algorithm would receive n samples from the data distribution, and would minimize the training loss averaged across the sample L(h(x), y).
The core results of this approach took the form of generalization bounds: given some metric of complexity of the hypothesis class H, bound the difference between the average training loss and the test loss in terms of this metric of hypothesis complexity. To put it in less technical terms, a gen
