---
title: '$π\mathbf{R}^2$: Reactive Real-time Flow Policies'
url: 'https://arxiv.org/abs/2607.26055v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sungjae Park
  - Shubham Tulsiani
categories:
  - cs.RO
  - cs.AI
  - cs.LG
  - cs.RO
published: '2026-07-28T17:59:31Z'
fetched_at: '2026-07-29T11:02:31.056Z'
---
Generalist manipulation policies increasingly take the form of action-chunking flow policies built on large pretrained backbones. Such chunks run open-loop, so the policy cannot react to sensory input arriving mid-execution, sacrificing \emph{reactivity}. Replanning more often would restore it, but the perception-to-action pipeline (a large backbone plus multiple denoising steps) is too slow: this \emph{latency} forbids frequent replanning and leaves committed actions stale, making such policies ill-suited for dynamic, closed-loop control. We present $π\mathbf{R}^2$, which makes these policies reactive and real-time while retaining large backbones, expressive multi-modal policies, and multi-action prediction. Built on the per-position noise schedule of diffusion forcing, $π\mathbf{R}^2$ contributes two ideas. First, it splits conditioning into a fast channel (proprioception, fresh every tick) and an asynchronously updated slow channel (vision-language features), so the policy reacts to proprioception within a chunk while tolerating stale vision. Second, a latency-adaptive flow schedule treats in-flight actions as inpainting conditioning and emits actions in one denoising step per call, letting one trained model adapt to varying hardware latency. Requiring minimal modification to existing architectures, $π\mathbf{R}^2$ can be finetuned from a pretrained policy: applied to GR00T-N1.7 on a real xArm6+XHand platform, it replans closed-loop roughly $4\times$ faster than the base p

Authors: Sungjae Park, Shubham Tulsiani
Categories: cs.RO, cs.AI, cs.LG, cs.RO
