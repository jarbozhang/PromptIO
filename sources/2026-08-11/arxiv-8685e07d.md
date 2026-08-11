---
title: >-
  Space-Creating versus Dead Possession: An Off-Ball Possession-Quality Index
  for Broadcast Football
url: 'https://arxiv.org/abs/2608.09887v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Seongjin Choi
categories:
  - cs.CV
  - cs.CY
  - cs.LG
  - cs.CV
published: '2026-08-10T17:39:05Z'
fetched_at: '2026-08-11T11:02:16.307Z'
---
Ball possession is the most-cited and most-misleading number in football: 60% recycled in one's own half is not 60% spent pinning the opponent back. Existing event-based possession-value frameworks (expected threat, VAEP, on-ball value) price on-ball actions but ignore the off-ball question a sterile possession poses: did holding the ball create space, or was the circulation dead? We answer this in two layers. First, an event-side junk-possession index prices each possession sequence by its peak threat gain under an expected-threat grid and -- after reconstructing the live scoreline to exclude lead-protecting circulation -- flags low-threat sequences in tied-or-losing states. On the 2026 FIFA World Cup (103 matches, 206 team-matches) the flag correlates negatively with points (r=-0.37) and xG difference (r=-0.51, partly index-coupled). It is not a repackaging of on-ball value: with team offensive VAEP and field tilt held fixed, the junk flag stays strongly negatively associated with points (p&lt;0.0001, also match-clustered) while VAEP is not significant -- in this same-match (descriptive) regression it adds information beyond this on-ball action-value model. Second, for a flagged window we resolve whether it was spatially dead or space-creating by projecting broadcast video to pitch coordinates and measuring a Space-Creation Index (SCI): a net pitch-control change capturing whether the possession seized space or pushed the opponent's block back. Across 31 of 35 flagged windo

Authors: Seongjin Choi
Categories: cs.CV, cs.CY, cs.LG, cs.CV
