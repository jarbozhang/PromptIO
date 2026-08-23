---
title: >-
  Update: First Manual Results from Testing Procedural Skill Transfer in Small
  Models
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1uii78d/update_first_manual_results_from_testing/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-06-29T04:22:02.000Z'
fetched_at: '2026-06-29T23:01:34.482Z'
---
Yesterday I posted an idea for testing whether a large model can transfer some of its procedural skill to a smaller model without fine-tuning.
 The short version of the idea was this:
 Small models are often not completely lacking knowledge. They know the syntax. They know the libraries. They usually understand the task at a basic level. The problem is that their outputs are shallow. They skip planning, hierarchy, decomposition, visual structure, and the kind of step-by-step discipline that bigger models seem to apply more naturally.
 So I wanted a test where this difference would be visible.
 That is why I used Three.js.
 With normal code tasks, a model can sometimes hide weakness behind verbose explanations or familiar patterns. With Three.js, the render exposes the actual structure. If the model does not plan the geometry, camera, lighting, proportions, hierarchy, and composition, the output looks bad immediately.
 The experiment was based on two domains.
 The first domain was a complex character scene: a Thriller-style choreography scene with multiple recognizable characters, animation, lighting, stage composition, and cinematic presentation.
 The second domain was completely different: a low-poly BMPT-72 turret with a recognizable silhouette.
 Both use Three.js, but they are not the same kind of task. One is about characters, posing, choreography, environment, and staging. The other is about mechanical shape, turret structure, weapons, silhouette, and object proportions.
 The idea was not to transfer the scene itself. The idea was to transfer the process.
 The simplified protocol is:
 A = larger model B = smaller model P1 = source prompt P2 = target prompt S = procedural scaffold 
 First:
 A + P1 -> D1A A + P2 -> D2A B + P1 -> D1B B + P2 -> D2B 
 Then the larger model creates a scaffold from the weakness of the smaller model in the first domain:
 A + P1 + code/render of D1B -> S 
 The important rule is that the model creating S does not see P2, does not see D2A
