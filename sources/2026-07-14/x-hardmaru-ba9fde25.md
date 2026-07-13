---
title: >-
  How do physical systems achieve collective intelligence and self-repair
  without a central brain? A new paper published today in Nature Communications
  by my Sakana AI colleague Seba
source: X @hardmaru
url: 'https://x.com/hardmaru/status/2076633306008072592'
date: 'Mon Jul 13 11:42:16 +0000 2026'
likes: 222
reposts: 31
replies: 24
source_type: x
language: en
account_name: David Ha
fetched_at: '2026-07-13T23:13:35.277Z'
---
How do physical systems achieve collective intelligence and self-repair without a central brain?

A new paper published today in Nature Communications by my Sakana AI colleague Sebastian Risi (@risi1979), along with co-authors from IT University of Copenhagen and Autodesk Research, presents a beautiful realization of biologically inspired robotics: Smart Cellular Bricks.

The team built a system of physical 3D cubic units that can collectively infer their global shape and autonomously guide their own damage recovery using purely local interactions.

Here is a deep dive into the paper’s key contributions:

1/ Neural Cellular Automata-based Architecture:
Modular robots usually rely on central processors. This system flips that paradigm. Every block independently runs the exact same neural network on local microcontrollers. With no master plan or global coordinates, they communicate only with immediate neighbors. By passing continuous state vectors, hundreds of bricks achieve global consensus on their shape in under 3 minutes.

2/ Emergent Biological Morphogens:
How does a block know it is part of a chair, not a table? The network’s internal memory automatically learns to establish continuous gradients across the structure. This beautifully mirrors how biological morphogens give positional info to developing cells. The bricks naturally form left-right, radial, and head-to-tail axes to align their identity.

3/ Performance and Generalization:
Validated in large-scale simulations, the networks transferred seamlessly to nearly 200 physical hardware bricks, achieving a 100% convergence rate. Instead of rigid template-matching, the system infers broad categories. Even when tested on unseen variations, like an asymmetric table with five random legs, the collective correctly classified the structure.

4/ Fault Tolerance and Autonomous Damage Recovery:
Hardware fails in the real world. This system easily tolerates up to 15% module failure without losing accuracy. By predicting spatial damage directions, the cells pinpointed missing components with 95% accuracy. They actively use these local signals to guide a self-repair process, regenerating back into the intended morphology.

I believe this is a significant piece of research, bridging collective intelligence and Physical AI.

This work represents the first successful physical realization of large-scale, decentralized 3D self-recognition and damage detection. By moving away from centralized control, this architecture paves the way for highly adaptive smart materials and resilient robotics that can survive and repair themselves.

Read the full open-access paper:
https://t.co/friVEdvfT6

Congratulations to the team on this achievement!
