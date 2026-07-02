---
title: Are Performance-Optimization Benchmarks Reliably Measuring Coding Agents?
url: 'https://arxiv.org/abs/2607.01211v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhi Chen
  - Zhensu Sun
  - Yuling Shi
  - David Lo
  - Lingxiao Jiang
categories:
  - cs.SE
  - cs.AI
  - cs.SE
published: '2026-07-01T17:50:48Z'
fetched_at: '2026-07-02T23:01:57.289Z'
---
Repository-level performance-optimization benchmarks such as GSO, SWE-Perf and SWE-fficiency evaluate coding agents by applying patches to real repositories and comparing runtime against unoptimized baselines and official reference patches. Their leaderboard scores are increasingly used as evidence of coding-agent progress, but those scores can conflate runtime instability, benchmark-specific scoring rules, and how many tasks are already solved by at least one public submission. We audit these issues across the three benchmarks. First, we replay the official reference patches for 740 code optimization tasks across four common types of Google Cloud machines. Most benchmark tasks can be replayed, but their reference patches satisfy the original benchmark validity rules in every cross-machine replay for only 39/102 GSO tasks, 11/140 SWE-Perf tasks, and 411/498 SWE-fficiency tasks; SWE-Perf is especially fragile because many reference patches produce close-to-zero runtime changes. Second, we show that public submission rankings depend strongly on the benchmark scoring rule. Among eight public submissions shared by GSO and SWE-fficiency, the official rankings disagree on 9 of 28 pairwise submission comparisons, and SWE-fficiency's leaderboard scoring rule assigns the worst ten tasks overly high score weights of 58.5%-82.8%. Third, looking across 10 public submissions for each task, we find that at least one submission matches or beats the reference patch on 85.3% (384/450) of repl

Authors: Zhi Chen, Zhensu Sun, Yuling Shi, David Lo, Lingxiao Jiang
Categories: cs.SE, cs.AI, cs.SE
