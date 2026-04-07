---
title: 'PINNs in PDE Constrained Optimal Control Problems: Direct vs Indirect Methods'
url: 'https://arxiv.org/abs/2604.04920v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Zhen Zhang
  - Shanqing Liu
  - Alessandro Alla
  - Jerome Darbon
  - George Em Karniadakis
categories:
  - math.OC
  - cs.LG
  - math.OC
published: '2026-04-06T17:57:53Z'
fetched_at: '2026-04-07T02:40:09.233Z'
---
We study physics-informed neural networks (PINNs) as numerical tools for the optimal control of semilinear partial differential equations. We first recall the classical direct and indirect viewpoints for optimal control of PDEs, and then present two PINN formulations: a direct formulation based on minimizing the objective under the state constraint, and an indirect formulation based on the first-order optimality system. For a class of semilinear parabolic equations, we derive the state equation, the adjoint equation, and the stationarity condition in a form consistent with continuous-time Pontryagin-type optimality conditions. We then specialize the framework to an Allen-Cahn control problem and compare three numerical approaches: (i) a discretize-then-optimize adjoint method, (ii) a direct PINN, and (iii) an indirect PINN. Numerical results show that the PINN parameterization has an implicit regularizing effect, in the sense that it tends to produce smoother control profiles. They also indicate that the indirect PINN more faithfully preserves the PDE contraint and optimality structure and yields a more accurate neural approximation than the direct PINN.

Authors: Zhen Zhang, Shanqing Liu, Alessandro Alla, Jerome Darbon, George Em Karniadakis
Categories: math.OC, cs.LG, math.OC
