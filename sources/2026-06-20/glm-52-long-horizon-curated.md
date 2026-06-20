---
title: "GLM-5.2：面向长任务 Agent 的 1M 上下文开源模型"
url: "https://huggingface.co/blog/zai-org/glm-52-blog"
source: "Curated Hugging Face official blog summary"
source_type: curated
language: zh
published: "2026-06-17T09:01:25Z"
fetched_at: "2026-06-20T13:05:00+08:00"
---

Z.AI 在 Hugging Face 发布 GLM-5.2 官方介绍，标题是 Built for Long-Horizon Tasks。它的定位不是简单扩大 context window，而是把 1M-token context 做到能支撑长时间 coding-agent trajectories。

官方确认的新增能力：

- Solid 1M Context：稳定支撑长任务工作，包括 large-scale implementation、automated research、performance optimization、complex debugging。
- Advanced Coding with Flexible Effort：编码能力增强，并提供多个 thinking effort levels，让用户在性能、延迟和计算成本之间选择。
- Improved Architecture：提出 IndexShare，在每四个 sparse attention layers 之间复用同一个 indexer，使 1M context length 下 per-token FLOPs 降低 2.9×；同时改进 MTP layer 用于 speculative decoding，acceptance length 最高提升 20%。
- Pure Open：MIT open-source license。

官方 benchmark 摘要：

- FrontierSWE：GLM-5.2 距 Opus 4.8 只差 1%，比 GPT-5.5 高 1%，比 Opus 4.7 高 11%。
- PostTrainBench：给每个 agent 一张 H100 GPU，看它能把小模型 post-training 提升多少；GLM-5.2 超过 Opus 4.7 与 GPT-5.5，仅次于 Opus 4.8。
- SWE-Marathon：覆盖构建编译器、优化 kernel、开发 production-grade services 等超长任务，GLM-5.2 仍落后 Opus 4.8 13%，但仍在开源模型中排名靠前。
- 标准 coding benchmarks：Terminal-Bench 2.1 从 GLM-5.1 的 63.5 提升到 81.0；SWE-bench Pro 从 58.4 提升到 62.1。

适合写作角度：GLM-5.2 的读者收益不只是“又一个大模型开源了”，而是长任务 Agent 选模型时可以把三个问题列出来：context 是否真的稳、effort level 是否可控、长任务 benchmark 是否贴近自己的开发任务。
