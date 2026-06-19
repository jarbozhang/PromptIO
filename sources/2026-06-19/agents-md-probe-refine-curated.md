---
title: "Probe-and-Refine：把 AGENTS.md 这类仓库说明当成可测试资产"
url: "https://arxiv.org/abs/2606.20512v1"
source: "Curated arXiv summary"
source_type: curated
language: zh
published: "2026-06-18T17:30:15Z"
fetched_at: "2026-06-19T15:10:00+08:00"
---

arXiv 2026-06-18 论文 Probe-and-Refine Tuning of Repository Guidance for Coding Agents 关注 coding agent 在仓库中工作时需要的操作性知识，例如哪些文件对应哪些子系统、测试怎么跑、哪些工作流过去容易导致错误修复。

这些知识通常不会直接存在于代码里，工程团队会用 AGENTS.md 之类的文件写给 agent。但论文指出，已有研究对 LLM 生成的 guidance 是否有帮助存在分歧。关键不是“有没有仓库说明”，而是“这份说明如何产生”。

论文提出 probe-and-refine tuning：使用 synthetic bug-fix probes 诊断并修补仓库 guidance 文件。过程通过单次 LLM 调用迭代完成，不在 tuning 阶段使用 agent loop 或工具。

论文实验基于 SWE-bench Verified，使用 Qwen3.5-35B-A3B，200 steps，四轮独立试验。结果显示：
- probe-and-refine 平均 resolve rate 为 33.0%。
- 初始化用的 static knowledge base 为 28.3%。
- 无 guidance baseline 为 25.5%。
- 论文报告两组对比 p < 0.001。

论文还指出，改进主要来自 coverage 而非 precision。refined guidance 让 agent 多产生 14.5 个百分点的可评估补丁，而每个补丁的 precision 约 59%，统计上没有显著变化。换句话说，更好的 guidance 主要帮助 agent 找到正确文件，而不是直接提高每次改代码的质量。

适合写作角度，AGENTS.md、Skill、CLAUDE.md 这类文件不该只靠经验堆字，而应该通过失败样例、探针任务和迭代修补来维护。
