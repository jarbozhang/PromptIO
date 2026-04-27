---
title: >-
  Iterative Model-Learning Scheme via Gaussian Processes for Nonlinear Model
  Predictive Control of (Semi-)Batch Processes
url: 'https://arxiv.org/abs/2604.22672v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Tai Xuan Tan
  - Alexander Mitsos
  - Eike Cramer
categories:
  - cs.LG
  - cs.LG
published: '2026-04-24T15:49:10Z'
fetched_at: '2026-04-27T07:57:01.883Z'
---
Batch processes are inherently transient and typically nonlinear, motivating nonlinear model predictive control (NMPC). However, adopting NMPC is hindered by the cost and unavailability of dynamic models. Thus, we propose to use Gaussian Processes (GP) in a model-learning NMPC scheme (GP-MLMPC) for batch processes. We initialize the GP-MLMPC using data from a single initial trajectory, e.g., from a PI controller. We iteratively apply the NMPC embedded with GPs to run batches and update the GP with new observations from each iteration, thereby achieving batch-wise improvements. Using uncertainty quantification from the GPs, we formulate chance constraints to enforce safe operation to the required confidence levels. We demonstrate our approach in \textit{silico} on a semi-batch polymerization reactor for tracking and economic objectives over durations of two hours, and the reactor temperature is constrained in a range of $\pm2^\circ C$ around its setpoint. After only four batch iterations, tracking error from the GP-MLMPC scheme converged to a reduction of $83\%$, compared to the initial trajectory. Furthermore, under an economic objective, the GP-MLMPC resulted in a 17-fold increase in final product mass by iteration 8, compared to the initial trajectory. In both cases, the resulting GP-MLMPC performance is on par with the full-model NMPC, which shows that the optimal controller can be learned by the approach. By collecting samples around the optimal trajectory, the GP-MLMPC r

Authors: Tai Xuan Tan, Alexander Mitsos, Eike Cramer
Categories: cs.LG, cs.LG
