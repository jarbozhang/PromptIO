---
title: >-
  Watermark Forensics for Generative Models: An Information-Theoretic
  Perspective
url: 'https://arxiv.org/abs/2607.13003v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Xiaoyu Li
  - Zheng Gao
  - Xiaoyan Feng
  - Jiaojiao Jiang
  - Yulei Sui
categories:
  - cs.CR
  - cs.IT
  - cs.LG
  - cs.CR
published: '2026-07-14T17:49:52Z'
fetched_at: '2026-07-15T23:03:05.476Z'
---
A watermark in a generative model's output is usually asked only whether a text is machine-made. The same mark can do more: attribute it to the user who produced it, extract a hidden payload, or localize the part that survives editing. These form a forensic ladder, and we ask what each rung costs in the sample length $n$. One object organizes the answers. Let $S$ be the secret the mark carries (a user's identity or payload), and let the information profile $ν(t)=I(S;X_t\mid X_{&lt;t})$ record how much the $t$-th token reveals about $S$ given the earlier ones. Its total mass pays for attribution and extraction; how that mass is spread pays for localization; and detection alone is paid for not by information but by presence, the distance from the marked to the unmarked distribution. The literature's two quality models, a mark subtle on every token and one that stamps a few tokens loudly, are two incomparable ways of capping this profile. Our main theorem settles the ladder's entropy column. For statistically distortion-free schemes, attributing a text to one of $N$ users costs $Θ(\log N/h)$ tokens over every stationary-ergodic source of entropy rate $h$, sharp to a $(1+o(1))$ factor: to our knowledge the first tight entropy-rate law for multi-user attribution (via exact alignment). The natural collision-counting analysis overcharges without bound; only a decoder thresholding each candidate by its own realized surprisal attains the rate while almost never implicating an innocent

Authors: Xiaoyu Li, Zheng Gao, Xiaoyan Feng, Jiaojiao Jiang, Yulei Sui
Categories: cs.CR, cs.IT, cs.LG, cs.CR
