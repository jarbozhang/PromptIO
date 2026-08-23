---
title: >-
  A Blind Visual Paradigm for Testing Skill Transfer in Small Models Without
  Fine-Tuning
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uhmz3o/a_blind_visual_paradigm_for_testing_skill/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-28T04:01:21.000Z'
fetched_at: '2026-06-28T23:00:58.424Z'
---
TL;DR: Small models aren't dumb, they're shallow. I designed a cross-domain, blind, visual experiment to see if a large model can compress its "planning discipline" into a reusable scaffold that makes a small model deeper — with zero fine-tuning. Three.js is the testbed because you can't fake structure with verbose text; the render exposes everything. 
 I’ve been spending a lot of time testing smaller models (like 9B parameters), and I’ve noticed something: they aren’t exactly dumb, they are just shallow. They understand the task, but their outputs lack planning depth, hierarchy, and procedural discipline. They skip the structural steps that larger models apply naturally.
 This got me thinking: can a large model (Model A) compress its procedural ability into a reusable structure that makes a smaller model (Model B) perform deeper, without any fine-tuning? And more importantly, can we prove this transfer of skill is real and not just overfitting?
 I came up with an experimental paradigm to test this using Three.js. I chose Three.js because it’s easy to verify visually, but hard to generate correctly. A model can't just output verbose text to hide its lack of understanding; the rendered image exposes its true procedural depth.
 Here is the baseline of the experiment. Look at these 4 images:
 Image 1 (D1A): Model A (Large) output for a complex cinematic scene (Michael Jackson, Pepe, Trump, and Elon Musk performing \"Thriller\").
 Image 2 (D1B): Model B (Small) output for the exact same prompt. Notice how it gets the concept, but the result is visually shallow, structurally weak, and lacks hierarchy.
 Image 3 (D2A): Model A output for a completely different, semantically distinct domain: \"Make a BMPT-72 turret in Three.js - low poly with recognizable silhouette.\"
 Image 4 (D2B): Model B baseline output for the turret. Again, shallow.
 The Theory:
 My hypothesis is that Model A can look at the gap between D1A and D1B and extract a general "Procedural Scaffold" (S). 
 S
