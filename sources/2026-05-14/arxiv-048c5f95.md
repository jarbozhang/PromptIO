---
title: >-
  Good Agentic Friends Do Not Just Give Verbal Advice: They Can Update Your
  Weights
url: 'https://arxiv.org/abs/2605.13839v1'
source: arXiv
source_type: arxiv
language: en
authors:
  - Wenrui Bao
  - Huan Wang
  - Jian Wang
  - Zhangyang Wang
  - Kai Wang
categories:
  - cs.CL
  - cs.CL
published: '2026-05-13T17:58:32Z'
fetched_at: '2026-05-14T12:15:41.546Z'
---
Multi-agent LLM systems usually collaborate by exchanging natural-language messages. This interface is simple and interpretable, but it forces each sender's intermediate computation to be serialized into tokens and then reprocessed by the receiver, thereby increasing the generated-token cost, prefill overhead, and KV-cache memory. We study an alternative communication interface: instead of appending a sender's message to the receiver's context, compile the sender's hidden states into a transient, receiver-specific weight perturbation. We introduce TFlow (Thought Flow), a weight-space communication framework for a known and fixed receiver architecture. For each query, frozen role-prompted sender agents process the input, and a learned parameter generator maps their internal activations into low-rank LoRA perturbations targeting the receiver's modules. These perturbations are fused and applied only during the receiver's generation, enabling instance-level adaptation without permanently changing the model or enlarging the receiver's text context. With three Qwen3-4B agents, TFlow improves over a standalone receiver by up to 8.5 accuracy points across five benchmarks while reducing processed tokens by up to 32.69%. Compared with a text-based three-agent baseline, it reduces total processed tokens by up to 83.27% and the wall-clock inference time by up to 4.6$\times$, while maintaining competitive accuracy on four of five benchmarks. These results suggest that transient low-rank w

Authors: Wenrui Bao, Huan Wang, Jian Wang, Zhangyang Wang, Kai Wang
Categories: cs.CL, cs.CL
