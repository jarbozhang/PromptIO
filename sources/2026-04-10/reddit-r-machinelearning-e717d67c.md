---
title: 'Parax: Parametric Modeling in JAX + Equinox [P]'
url: >-
  https://www.reddit.com/r/MachineLearning/comments/1sgm0ne/parax_parametric_modeling_in_jax_equinox_p/
source: Reddit r/MachineLearning
source_type: rss
language: en
published: '2026-04-09T10:41:00.000Z'
fetched_at: '2026-04-10T00:43:27.830Z'
---
Hi everyone!
 Just wanted to share my Python project Parax - an add-on on top of the Equinox library catering for parameter-first modeling in JAX.
 For our scientific applications, we found that we often needed to attach metadata to our parameter objects, such as marking them as fixed or attached a prior probability distribution. Further, we often needed to manipulate these parameters in very deep hierarchies, which sometimes can be unintuitive using eqx.tree_at.
 We therefore developed Parax, which providesparax.Parameter and parax.Module (that both inherit from eqx.Module) as well as a few helper utilities. These provide a more object-orientated model inspection and manipulation approach, while still following Equinox's immutable principles.
 There is some documentation along with a few examples. Perhaps the package is of use to someone else out there! :)
 Cheers,
 Gary
    submitted by    /u/gvcallen  
 [link]   [comments]
