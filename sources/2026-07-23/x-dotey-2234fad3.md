---
title: >-
  Google 今天一口气发布了三款 Gemini 新模型：Gemini 3.6 Flash、3.5 Flash Lite 和 3.5 Flash
  Cyber。主角是 3.6 Flash，一个在多个维度上都比前代 3.5 Flash 更好、同时还更便宜的模型。 先看最直观的变化。3.6 Flash
  的输出定价从 3.5 Flash 的每百万 token $9 
source: X @dotey
url: 'https://x.com/dotey/status/2079618788140482647'
date: 'Tue Jul 21 17:25:31 +0000 2026'
likes: 148
reposts: 13
replies: 112
source_type: x
language: zh
account_name: 宝玉
fetched_at: '2026-07-23T11:04:22.407Z'
---
Google 今天一口气发布了三款 Gemini 新模型：Gemini 3.6 Flash、3.5 Flash Lite 和 3.5 Flash Cyber。主角是 3.6 Flash，一个在多个维度上都比前代 3.5 Flash 更好、同时还更便宜的模型。

先看最直观的变化。3.6 Flash 的输出定价从 3.5 Flash 的每百万 token $9 降到了 $7.50，输入价格不变（$1.50）。

除了便宜还省 token。根据 Google 的数据，3.6 Flash 在 Artificial Analysis Index 上平均少用 17% 的输出 token，在某些 DeepSWE 编码测试中，token 消耗最多降低 65%。Artificial Analysis 的实测也印证了这一点：跑同一套智能评测，3.5 Flash 花了 $1041，3.6 Flash 只花了 $727，账单直接少了三成。

速度也有明显提升。3.6 Flash 的生成速度达到 304 tokens/s，3.5 Flash 是 165 tokens/s，接近翻倍。对于需要多步推理、反复调用工具的 Agent 工作流来说，每一步快一倍，最终的完成时间差距会被放大。

智能水平方面，3.6 Flash 在 Artificial Analysis Intelligence Index 上得分 50，和 3.5 Flash 持平，但用更少的 token 达到了同样的分数。在知识工作基准 GDPval-AA 上，3.6 Flash 拿到 1421 分，3.5 Flash 是 1349。Computer Use 能力在 OSWorld-Verified 上从 78.4% 提升到 83%。知识截止日期也从 2025 年 1 月跳到了 2026 年 3 月，意味着模型终于知道过去一年多的事了。

放到竞品里看，3.6 Flash 在 OSWorld 和两项长上下文测试上领先，但 GPT 5.6 Luna 在 DeepSWE 和 Terminal-bench 上更强，Grok 4.5 在 SWE-Bench Pro 上领先，Claude Sonnet 5 在 MLE-Bench 和 GDPVal-AA v2 上得分最高。四家模型在多数基准上差距不大，实际选择更多取决于具体任务和价格。

3.6 Flash 已经可以在 GitHub Copilot 中使用，同时上线了 Gemini 应用、Google AI Studio 和 Google Antigravity。Antigravity 是 Google 今年 5 月在 I/O 大会推出的 Agent 开发平台，定位是以 Agent 编排为核心的独立桌面应用，有点像 Google 版的 Claude Code + Cursor 的合体。

另外两个模型定位不同。3.5 Flash Lite 走极致低价路线，定价 $0.30/$2.50（每百万 token 输入/输出），适合搜索、文档处理等高吞吐量场景。3.5 Flash Cyber 专注网络安全，目前仅对政府和受信任合作伙伴开放。

不过这次发布 Gemini 3.5 Pro 缺席。Google 在 I/O 上承诺的旗舰模型 3.5 Pro 至今没有公开发布，Bloomberg 此前报道，延期原因是模型在内部编码基准上表现不达预期，6 月底用新数据重新训练后结果仍然不理想。目前 3.5 Pro 只在少数合作伙伴和美国政府那里做测试，公开日期未知。

上次 3.5 Pro 跳票时，Google 推出了 Gemini 3.5 Flash，结果这个 Flash 模型反而在多项编码和 Agent 基准上打败了 Gemini 3.1 Pro。Gemini 3.6 Flash 看起来也是类似：不需要和 GPT-5.6 或 Claude 争排行榜顶端，先把更快更便宜的生态位占住。

Google 同时确认，下一代 Gemini 4 已经启动了迄今最大规模的预训练。
