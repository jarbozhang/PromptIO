---
title: 'SciDiagramEdit: Learning to Edit Scientific Diagrams from Paper Revisions'
url: 'https://arxiv.org/abs/2607.15272v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yasheng Sun
  - Zezi Zeng
  - Yifan Yang
  - Chong Luo
  - Wenyi Wang
categories:
  - cs.CL
  - cs.AI
  - cs.CL
published: '2026-07-16T17:58:36Z'
fetched_at: '2026-07-17T23:02:11.571Z'
---
Editing the figures in a research paper is a routine and time-consuming part of everyday research practice: authors relabel components, rearrange panels, and restyle visuals as they revise their manuscripts. Automating this editing workflow under a natural-language instruction, however, is challenging, because a scientific figure is a dense infographic in which heterogeneous visual elements such as schematics, plots, photos, captions, and arrows are composed under a tight visual grammar to advance a specific argument. To address this, we present SciDiagramEdit, a benchmark and skill-evolution framework that learns from natural paper revisions and operates on the figure's editable vector source, where users can inspect and co-edit individual primitives alongside the agent. Our benchmark mines before/after figure pairs from arXiv version histories, each grounded in the authors' own revision intent. To accommodate the diversity of editing instructions, we adopt agentic learning via skill evolution: an agentic proposer continually refines the agent's skill specification from execution traces over multiple epochs. The resulting skill progressively lifts edit accuracy on a held-out validation set, providing evidence that natural paper revisions are an effective training signal for instruction-driven figure editing.

Authors: Yasheng Sun, Zezi Zeng, Yifan Yang, Chong Luo, Wenyi Wang
Categories: cs.CL, cs.AI, cs.CL
