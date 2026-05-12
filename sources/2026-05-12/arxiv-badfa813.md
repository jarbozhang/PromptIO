---
title: Engineering Robustness into Personal Agents with the AI Workflow Store
url: 'https://arxiv.org/abs/2605.10907v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Roxana Geambasu
  - Mariana Raykova
  - Pierre Tholoniat
  - Trishita Tiwari
  - Lillian Tsai
categories:
  - cs.CR
  - cs.AI
  - cs.CR
published: '2026-05-11T17:46:33Z'
fetched_at: '2026-05-12T11:42:53.212Z'
---
The dominant paradigm for AI agents is an "on-the-fly" loop in which agents synthesize plans and execute actions within seconds or minutes in response to user prompts. We argue that this paradigm short-circuits disciplined software engineering (SE) processes -- iterative design, rigorous testing, adversarial evaluation, staged deployment, and more -- that have delivered the (relatively) reliable and secure systems we use today. By focusing on rapid, real-time synthesis, are AI agents effectively delivering users improvised prototypes rather than systems fit for high-stakes scenarios in which users may unwittingly apply them? This paper argues for the need to integrate rigorous SE processes into the agentic loop to produce production-grade, hardened, and deterministically-constrained agent *workflows* that substantially outperform the potentially brittle and vulnerable results of on-the-fly synthesis. Doing so may require extra compute and time, and if so, we must amortize the cost of rigor through reuse across a broad user community. We envision an *AI Workflow Store* that consists of hardened and reusable workflows that agents can invoke with far greater reliability and security than improvised tool chains. We outline the research challenges of this vision, which stem from a broader flexibility-robustness tension that we argue requires moving beyond the ``on-the-fly'' paradigm to navigate effectively.

Authors: Roxana Geambasu, Mariana Raykova, Pierre Tholoniat, Trishita Tiwari, Lillian Tsai
Categories: cs.CR, cs.AI, cs.CR
