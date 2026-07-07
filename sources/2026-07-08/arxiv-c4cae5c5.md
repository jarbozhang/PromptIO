---
title: >-
  GaP: A Graph-as-Policy Multi-Agent Self-Learning Harness For Variational
  Automation Tasks
url: 'https://arxiv.org/abs/2607.05369v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Kaiyuan Chen
  - Shuangyu Xie
  - Letian Fu
  - Justin Yu
  - William Pacini
categories:
  - cs.RO
  - cs.AI
  - cs.CL
  - cs.LG
  - cs.RO
published: '2026-07-06T17:47:31Z'
fetched_at: '2026-07-07T23:02:35.312Z'
---
For robots to work reliably in commercial and industrial applications, can recent advances in agentic coding systems combine interpretable robot programming with the open-world adaptability of model-free policies? We focus on "Variational Automation" (VA), a class of tasks that have larger variations in object geometry and pose than fixed automation. Model-free policies often struggle to close the reliability gap for VA tasks, which must be executed persistently and reliably in commercial and industrial applications. Motivated by prior work on Task and Motion Planning (TAMP) and the Robot Operating System (ROS), we introduce Graph-as-Policy (GaP), a multi-agent coding harness that generates directed computation graphs with perception, planning, and control nodes from a Modular Open Robot Skill Library (MORSL). GaP then generates an internal simulation environment to rehearse task instances with different graphs in parallel to iteratively refine the graph structure and parameters to improve success rates and throughput. Evaluation with 8 new open VA task benchmarks, 4 in-simulation and 4 in real-world, suggests that GaP can achieve success rates that significantly outperform baselines. Details, code, and data can be found online: https://graph-robots.github.io/gap

Authors: Kaiyuan Chen, Shuangyu Xie, Letian Fu, Justin Yu, William Pacini
Categories: cs.RO, cs.AI, cs.CL, cs.LG, cs.RO
