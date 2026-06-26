---
title: >-
  What "if you know what you're doing" actually looks like: The model already
  has incredible general smarts... but what it doesn't have is what you
  specifically know about your field
source: X @mattshumer_
url: 'https://x.com/mattshumer_/status/2067296440380952971'
date: 'Wed Jun 17 17:20:54 +0000 2026'
likes: 53
reposts: 3
replies: 8
source_type: x
language: en
account_name: Matt Shumer
fetched_at: '2026-06-25T07:44:07.938Z'
---
What "if you know what you're doing" actually looks like:

The model already has incredible general smarts... but what it doesn't have is what you specifically know about your field (it may know a LOT, but an expert can usually push it past what it knows pretty fast), or the exact process you'd follow (or want IT to follow, sometimes this is different, as humans and AI have different strengths).

Prompting is how you get that in. Give it your strategy, your details, your process in the right format and you go from a "good" generic answer to "wow, this is how I would've done it".

It also lets you do things neither you nor the model could've done alone.

For example, last week I worked with @PSkinnerTech on a frontend task, creating really precise/animation-heavy/complex components that we had no idea how to build on our own. But we could describe an approach: create a video of the ideal end-state, have the model attempt to build the same thing in code, write a diffing algorithm that compares its own version with the video, scores how close it is, and hill-climbs to improve.

My only reference was Levenshtein distance for text (I don't know the visual domain as well as text), and it decided on a derivative of heatmaps as a good visual equivalent. We supplied the direction and loose strategy; it supplied the hard ideas and execution.

And this isn't a one-off. It's how I built a few of my ThreeJS demos too. Being able to point at something and say "this is the quality bar," then have it loop until it hits that bar, is incredibly powerful. The model's not going to do that on its own.

You don't have to know how to do the thing, you have to know how to point at the shape of a solution.

That's prompting too, and it's more powerful than it looks.
