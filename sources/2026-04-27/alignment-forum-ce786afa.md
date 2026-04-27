---
title: >-
  A "Lay" Introduction to "On the Complexity of Neural Computation in
  Superposition"
url: >-
  https://www.alignmentforum.org/posts/kYkbcEo6YyjQiztpi/a-lay-introduction-to-on-the-complexity-of-neural
source: Alignment Forum
source_type: rss
language: en
published: '2026-04-22T02:26:14.000Z'
fetched_at: '2026-04-27T07:56:53.663Z'
---
This is a writeup based on a lightning talk I gave at an InkHaven hosted by Georgia Ray, where we were supposed to read a paper in about an hour, and then present what we learned to other participants.
Introduction and Background
So. I foolishly thought I could read a theoretical machine learning paper in an hour because it was in my area of expertise. Unfortunately, it turns out that theoretical CS professors know a lot of math and theoretical CS results that they reference constantly in their work, which makes their work very hard to read, even if you’re familiar with the general area.
Instead of explaining a bunch of the substantial actual math behind the paper, the best I can do is give an overview of what the setup for the paper is, what the contributions of the paper are, and how they fit in.
Back in the olden days (2021) there was a dream that you could just open up a neural network and understand it by looking at individual neurons. For example, you might ask, “is this neuron a ‘cat’ neuron? Or is it the ‘betray all humans’ neuron?”. Then you could just check if the ‘betray all humans neuron’ is on.
But it turned out that neural networks were a lot more complicated than this. For one thing, a serious issue was neuron polysemanticity, where a neuron fired on a bunch of seemingly unrelated things. We’d see things like the ‘betray all humans’ neuron firing on discussion of cats and the like. Maybe the AI is planning on instigating the grand robotic uprising, maybe it’s just thinking about the genealogy of Maine coons.


Though, of course, there is some chance that we were wrong, and there actually is some deep connection between cats and attempts to subjugate humanity. I doubt anyone asked this Maine coon what he thought about robotic uprisings. Image source.

The leading theory that people had is this: in high dimensional spaces, if you’re okay with a small amount of interference between your representations, you can represent a lot more things by using near-o
