---
title: Learning to Reason with Insight for Informal Theorem Proving
url: 'https://arxiv.org/abs/2604.16278v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Yunhe Li
  - Hao Shi
  - Bowen Deng
  - Wei Wang
  - Mengzhe Ruan
categories:
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.AI
published: '2026-04-17T17:36:21Z'
fetched_at: '2026-04-20T05:39:43.392Z'
---
Although most of the automated theorem-proving approaches depend on formal proof systems, informal theorem proving can align better with large language models' (LLMs) strength in natural language processing. In this work, we identify a primary bottleneck in informal theorem proving as a lack of insight, namely the difficulty of recognizing the core techniques required to solve complex problems. To address this, we propose a novel framework designed to cultivate this essential reasoning skill and enable LLMs to perform insightful reasoning. We propose $\mathtt{DeepInsightTheorem}$, a hierarchical dataset that structures informal proofs by explicitly extracting core techniques and proof sketches alongside the final proof. To fully exploit this dataset, we design a Progressive Multi-Stage SFT strategy that mimics the human learning process, guiding the model from basic proof writing to insightful thinking. Our experiments on challenging mathematical benchmarks demonstrate that this insight-aware generation strategy significantly outperforms baselines. These results demonstrate that teaching models to identify and apply core techniques can substantially improve their mathematical reasoning.

Authors: Yunhe Li, Hao Shi, Bowen Deng, Wei Wang, Mengzhe Ruan
Categories: cs.AI, cs.CL, cs.LG, cs.AI
