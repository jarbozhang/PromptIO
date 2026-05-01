---
title: 'PhyCo: Learning Controllable Physical Priors for Generative Motion'
url: 'https://arxiv.org/abs/2604.28169v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Sriram Narayanan
  - Ziyu Jiang
  - Srinivasa Narasimhan
  - Manmohan Chandraker
categories:
  - cs.CV
  - cs.AI
  - cs.LG
  - cs.CV
published: '2026-04-30T17:53:03Z'
fetched_at: '2026-05-01T02:24:44.539Z'
---
Modern video diffusion models excel at appearance synthesis but still struggle with physical consistency: objects drift, collisions lack realistic rebound, and material responses seldom match their underlying properties. We present PhyCo, a framework that introduces continuous, interpretable, and physically grounded control into video generation. Our approach integrates three key components: (i) a large-scale dataset of over 100K photorealistic simulation videos where friction, restitution, deformation, and force are systematically varied across diverse scenarios; (ii) physics-supervised fine-tuning of a pretrained diffusion model using a ControlNet conditioned on pixel-aligned physical property maps; and (iii) VLM-guided reward optimization, where a fine-tuned vision-language model evaluates generated videos with targeted physics queries and provides differentiable feedback. This combination enables a generative model to produce physically consistent and controllable outputs through variations in physical attributes-without any simulator or geometry reconstruction at inference. On the Physics-IQ benchmark, PhyCo significantly improves physical realism over strong baselines, and human studies confirm clearer and more faithful control over physical attributes. Our results demonstrate a scalable path toward physically consistent, controllable generative video models that generalize beyond synthetic training environments.

Authors: Sriram Narayanan, Ziyu Jiang, Srinivasa Narasimhan, Manmohan Chandraker
Categories: cs.CV, cs.AI, cs.LG, cs.CV
