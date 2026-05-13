---
title: 'Show HN: Needle: We Distilled Gemini Tool Calling into a 26M Model'
url: 'https://github.com/cactus-compute/needle'
source: Hacker News (Algolia AI filter)
source_type: rss
language: en
published: '2026-05-12T18:03:11.000Z'
fetched_at: '2026-05-13T10:19:12.987Z'
---
Hey HN, Henry here from Cactus. We open-sourced Needle, a 26M parameter function-calling (tool use) model. It runs at 6000 tok/s prefill and 1200 tok/s decode on consumer devices.
We were always frustrated by the little effort made towards building agentic models that run on budget phones, so we conducted investigations that led to an observation: agentic experiences are built upon tool calling, and massive models are overkill for it. Tool calling is fundamentally retrieval-and-assembly (match query to tool name, extract argument values, emit JSON), not reasoning. Cross-attention is the right primitive for this, and FFN parameters are wasted at this scale.
Simple Attention Networks: the entire model is just attention and gating, no MLPs anywhere. Needle is an experimental run for single-shot function calling for consumer devices (phones, watches, glasses...).
Training:
- Pretrained on 200B tokens across 16 TPU v6e (27 hours)
- Post-trained on 2B tokens of synthesized function-calling data (45 minutes)
- Dataset synthesized via Gemini with 15 tool categories (timers, messaging, navigation, smart home, etc.)
You can test it right now and finetune on your Mac/PC: https://github.com/cactus-compute/needle
The full writeup on the architecture is here: https://github.com/cactus-compute/needle/blob/main/docs/simp...
We found that the "no FFN" finding generalizes beyond function calling to any task where the model has access to external structured knowledge (RAG, tool use, retrieval-augmented generation). The model doesn't need to memorize facts in FFN weights if the facts are provided in the input. Experimental results to published.
While it beats FunctionGemma-270M, Qwen-0.6B, Granite-350M, LFM2.5-350M on single-shot function calling, those models have more scope/capacity and excel in conversational settings. We encourage you to test on your own tools via the playground and finetune accordingly.
This is part of our broader work on Cactus (https://github.com/cactus-compute/
