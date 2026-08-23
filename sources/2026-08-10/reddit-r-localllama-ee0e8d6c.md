---
title: '[NEW MODEL] SupraElegans-500K'
url: >-
  https://www.reddit.com/r/LocalLLaMA/comments/1vk3xpb/new_model_supraelegans500k/
source: Reddit r/LocalLLaMA
source_type: rss
language: en
published: '2026-08-09T22:57:18.000Z'
fetched_at: '2026-08-10T11:01:36.120Z'
---
*SupraLabs released a new experimental model!\*
 SupraElegans-500K is a ~500,000-parameter causal language model built around a sparse, signed, recurrent neural graph. No Transformer, no attention mechanism, no positional encoding, no KV cache. Context is carried by a persistent per-neuron membrane potential updated token by token.
 The architecture is loosely inspired by ideas from the C. elegans nervous system: sparse connectivity, distinct neuron populations, excitatory/inhibitory signaling, and persistent recurrent state. It is not a biological simulation and makes no claim of biological equivalence.
 This is an experimental first release. The goal is to test whether this kind of architecture can do useful language modeling at very small scale — not to compete with Transformers on quality.
 🤗 SupraLabs/SupraElegans-500k
 🧠 Architecture
 token → embedding → sensory neurons → sparse recurrent graph → output neurons → vocab logits 
  
Neuron populations: sensory, interneuron/association, output — contiguous index ranges over a fixed pool of neurons.
 Connectivity: sparse, directed, signed edge list (fan-in/out ~10–20 per neuron). No dense weight matrix is ever materialized; propagation is a scatter-add over edges.
 Neuron dynamics: for each neuron i, at every propagation micro-step:
  
​
 v[t+1] = clamp(leak_i * v[t] + incoming[t] + bias_i, -6, 6) a[t+1] = tanh(v[t+1] - threshold_i) 
 leak, bias, and threshold are learned per neuron. incoming is the scatter-summed signal from all edges pointing at neuron i, scaled by 1/sqrt(average fan-in) to keep variance controlled across neurons with different in-degree.
  
Per-token processing: a token's embedding is projected into the sensory population, then the graph runs a fixed number of propagation micro-steps (3 by default) before the output population is read out and projected to vocabulary logits. The membrane potential persists across the whole sequence — that's what gives the model its context window.
 Generation: 
