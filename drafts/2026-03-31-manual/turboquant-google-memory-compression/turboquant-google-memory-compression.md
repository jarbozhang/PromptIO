---
title: "Google 一篇论文砸崩存储芯片股：TurboQuant 到底做了什么？"
source_url: "https://x.com/k1rallik/status/2037868113480319321"
source_refs:
  - "https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/"
  - "https://techcrunch.com/2026/03/25/google-turboquant-ai-memory-compression-silicon-valley-pied-piper/"
  - "https://venturebeat.com/infrastructure/googles-new-turboquant-algorithm-speeds-up-ai-memory-8x-cutting-costs-by-50/"
score: 9.0
scoring_reason: "重大技术突破+二级市场实际影响+开源可复现，三重价值叠加"
status: draft
platform: wechat
tags: [google, turboquant, ai-inference, memory-compression, quantization, 存储芯片]
created_at: "2026-03-31T00:00:00Z"
---

# Google 一篇论文砸崩存储芯片股：TurboQuant 到底做了什么？

3月24日，Google Research 在官网静悄悄挂了一篇论文。没有发布会，没有产品发布，只有数学。

48 小时后：SanDisk 跌 11%，Micron 跌 7%，Samsung 存储业务跌 5%。DDR5 内存条价格几个月来第一次降了 100 美元。开源社区在 24 小时内搞出了 3 个可用实现，其中一个开发者只用了 25 行代码。

一篇论文，没有一行产品代码，直接改变了一个行业的定价逻辑。

## 这篇论文做了什么

TurboQuant 解决的是 AI 推理中一个非常具体的问题：KV Cache（键值缓存）太吃内存。

每次你跟 ChatGPT 聊天，模型需要"记住"之前说过什么。这个记忆就存在 KV Cache 里。对话越长，这块内存占用越大。对于长文档处理、代码生成这类场景，KV Cache 经常比模型本身还占内存。

TurboQuant 用两步压缩把 KV Cache 从 32-bit 压到 3-bit，内存占用直接缩小 6 倍，推理速度在 H100 GPU 上提升最多 8 倍。关键是：不需要重新训练模型，不需要微调，精度几乎零损失。

技术路径分两步：

**第一步 PolarQuant：** 把向量从笛卡尔坐标转换到极坐标。听起来像大一数学课，但这一步很巧妙。传统量化需要对数据做归一化（normalization），这个操作本身就很贵。PolarQuant 把向量映射到一个"固定的圆形网格"上，直接跳过了归一化。

**第二步 QJL（Quantized Johnson-Lindenstrauss）：** 用 1-bit 的数学纠错来补偿第一步的压缩损失。Johnson-Lindenstrauss 引理是降维领域的经典结果，Google 把它量化到了极端低比特的场景。

两步叠加，3-bit 精度，6 倍压缩，在 LongBench、Needle In A Haystack、ZeroSCROLLS 等多个基准测试上几乎不掉点。测试模型包括 Gemma 和 Mistral。

## 为什么存储股会跌

这需要理解 AI 硬件的经济学。

过去两年，所有人都在抢 HBM（高带宽内存）。Nvidia 的 GPU 越来越贵，很大一部分成本来自配套的 HBM 芯片。SK Hynix、Samsung、Micron 三家垄断 HBM 供应，定价能力极强。整个叙事是：AI 需要越来越多的内存，需求只会上升。

TurboQuant 打了一个反方向的信号：如果软件层面能把内存需求砍掉 6 倍，那硬件层面的"无限需求"假设就不成立了。

这不是说存储芯片不需要了。但它改变了需求曲线的斜率。华尔街定价的是增长预期，不是当前需求。当增长预期被一篇免费论文削了一刀，股价反应就是这样。

## 我的看法：这不是一个孤立事件

TurboQuant 本身可能还是实验室阶段，离生产环境有距离。但它代表的趋势已经非常清楚了：

**软件正在吃掉硬件的定价权。**

过去一年，我们已经看到了一系列类似的事情：

- DeepSeek 用 MoE 架构和多头注意力压缩，在更少的 GPU 上跑出了接近 GPT-4 的效果
- Llama 3 的量化版本在消费级显卡上就能跑
- 各种 KV Cache 优化（PagedAttention、FlashAttention）不断降低推理成本

TurboQuant 只是最新的一个。但它的市场冲击力最大，因为它出自 Google，数字足够震撼（6 倍！8 倍！），而且开源社区 24 小时就证明了它真的可以复现。

这里有一个更深层的趋势值得注意：**AI 的成本曲线正在被算法进步压下去，速度比硬件迭代还快。**

Nvidia 每代 GPU 性能提升大约 2-3 倍。但 TurboQuant 这类算法优化可以在同一硬件上实现 6-8 倍的效率提升。当软件优化的速度超过硬件迭代，整个供应链的定价模型都需要重新算。

对于我们做 AI 应用的人来说，这是好消息。推理成本在持续下降，而且下降的速度比大多数人预期的要快。一年前部署一个大模型需要的硬件成本，今天可能只需要 1/6。

不过也有另一面：如果你是存储芯片公司的投资者，你需要重新评估"AI 需要无限内存"这个假设了。算法的进步不是线性的，它是跳跃式的。下一个 TurboQuant 可能在任何时候出现。

## 对开发者意味着什么

如果你在做 AI 推理部署：

1. **关注 KV Cache 量化。** TurboQuant 的论文和参考实现已经开源，适用于 Gemma、Mistral 等主流开源模型。这可能是你能做的 ROI 最高的优化。

2. **重新算你的基础设施成本。** 如果你的推理服务受限于内存而不是计算，TurboQuant 可能让你在同样的硬件上跑 3-4 倍的并发量。

3. **不要过度投资硬件。** 算法优化的速度比你想象的快。今天买的 GPU，明年可能因为新的压缩算法而有效算力翻倍。

这篇论文的原始链接在 Google Research Blog，ICLR 2026 的正式版本也即将发布。值得仔细读一遍。

---

*参考来源：*
- *Google Research Blog: [TurboQuant: Redefining AI efficiency with extreme compression](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/)*
- *TechCrunch: [Google unveils TurboQuant](https://techcrunch.com/2026/03/25/google-turboquant-ai-memory-compression-silicon-valley-pied-piper/)*
- *Tom's Hardware: [Google's TurboQuant compresses LLM KV caches to 3 bits](https://www.tomshardware.com/tech-industry/artificial-intelligence/googles-turboquant-compresses-llm-kv-caches-to-3-bits-with-no-accuracy-loss)*
