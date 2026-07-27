---
title: >-
  Real brains follow Dale's principle: a neuron can either excite its neighbors
  or suppress them, but never both. Standard deep learning ignores this and uses
  backpropagation. In our
source: X @hardmaru
url: 'https://x.com/hardmaru/status/2078156625479921847'
date: 'Fri Jul 17 16:35:24 +0000 2026'
likes: 1250
reposts: 155
replies: 34
source_type: x
language: en
account_name: David Ha
fetched_at: '2026-07-27T11:13:32.526Z'
---
Real brains follow Dale's principle: a neuron can either excite its neighbors or suppress them, but never both. Standard deep learning ignores this and uses backpropagation.

In our new paper, Diffusing Blame, we fix this disconnect. By introducing a routing method that broadcasts error signals directly to the hidden layers, we can train networks made of dedicated positive and negative neurons to strictly obey Dale's principle, all without relying on backprop!

This method works surprisingly well on image recognition tasks despite the strict biological constraints. We also achieved competitive, backprop-free reinforcement learning on complex locomotion tasks and the open-ended Craftax environment.

It is neat to see that representation learning remains possible even when we force deep learning to play by the rules of real neurons.
