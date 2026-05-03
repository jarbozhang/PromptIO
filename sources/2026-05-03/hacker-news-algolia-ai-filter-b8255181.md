---
title: 'Show HN: AI CAD Harness'
url: 'https://fusion.adam.new/install'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-01T17:43:53.000Z'
fetched_at: '2026-05-03T12:56:06.234Z'
---
Hi HN, I'm Zach, one of the co-founders of Adam (https://adam.new).
We've been on HN twice before with text-to-CAD/3D experiments [1][2]. The honest takeaway from those threads: prompt-to-3D model web apps are fun, but serious mechanical engineers don't want a black box that spits out an STL. They want help inside the CAD tool they already use, with full visibility and control over the feature tree.
So we built that. Adam is now a harness that integrates directly with your CAD. It reads your parts, understands the existing feature tree, and edits it for you agentically. We are now live in beta on Onshape and Fusion! [3]:
Install link Autodesk Fusion: https://fusion.adam.new/install
Install link PTC Onshape:
https://cad.onshape.com/appstore/apps/Design%20&%20Documenta...
Things people are using it for today: - "Merge redundant features and clean up my tree" - "Rename every feature so the tree is actually readable" - "Round all internal edges with a 2mm fillet" - “Parametrize my model” - Along with of course, using Adam to generate CAD end-to-end!
A few things we care about that aren't obvious from the listing:
1. From the start we have always believed in CAD as code as the right abstraction. Our harness leverages Onshape's FeatureScript and Python in Fusion heavily.
2. We run an internal CAD benchmark across frontier models. There has been a massive jump in the spatial reasoning capabilities of recent models, particularly GPT 5.5 and Opus 4.7 [4] [5]
3. We open-sourced our earlier text-to-CAD work [6]
A note on the Anthropic Autodesk connector that shipped a couple days ago [7]: We think it's great for the space and validates the direction.
Where Adam is different: - Model-agnostic. We pick whichever frontier model is winning on each task type from our own internal bench, instead of being tied to one lab. - We live natively in your CAD apps and are actively building integrations across all programs
What would you want an in-CAD agent to do that nothing does today?
[1
