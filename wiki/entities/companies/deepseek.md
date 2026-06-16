# DeepSeek

国产大模型领军厂商。V3 / R1 时期以"开源 + 低成本 + 强推理"三件套重塑全球 LLM 性价比基线，2026-04-24 V4 Pro + V4 Flash 双发进一步把 MoE 模型的价格下限打穿。

## 关键产品线

- **[[deepseek-v4|DeepSeek V4]]** — 2026-04-24 双发：V4 Pro 1.6T 参数 + V4 Flash 284B MoE，1M context，输入价打到每 M 一毛钱级别
- **DeepSeek V3 系列** — 此前主力开源版本
- **DeepSeek R1** — 推理模型，RLVR + GRPO 路径代表作

## 近期动态

- **V4 Flash 上 OpenRouter 免费 256K + Raschka 拆 V3→V4 架构** (2026-05-14) — DeepSeek V4 Flash 在 OpenRouter 免费上线 256K context 跑百万 token agent loop；同日 Sebastian Raschka 拆 V3 → V3.2 → V4 的 sparse attention + RL 三步跳，把 DeepSeek 架构演进路线讲透
- **Simon Willison 实测 V4** (2026-04-25) — 发布次日，Simon 跑完 V4 给出"接近前沿但价格只是零头"的英文社区第一份有分量实测报告，给国产 V4 在英文社区的可信度打了背书
- **V4 Pro + V4 Flash 双发上 OpenRouter** (2026-04-24) — V4 Pro 1.6T 参数走高端，V4 Flash 284B MoE 把每 M token 打到一毛钱级别，4/20 预告的"万亿参数 + GPT-4 成本 1/70"如期兑现
- **Raschka 拆 RLVR / GRPO 推理方法论** (2026-04-23) — Sebastian Raschka 系统性梳理让 LLM 推理追上 o3 的几个关键拼图，DeepSeek R1 是国产方 RLVR 代表
- **4/20 V4 官方预告** (2026-04-20) — 万亿参数、GPT-4 成本 1/70，社区预期拉满

## 我们的覆盖

| 日期 | 文章 | REACH |
|------|------|-------|
| 2026-05-10 | [[蚂蚁ring-腾讯hy3-双双上openrouter-万亿模型免费\|蚂蚁 Ring-2.6-1T + 腾讯 Hy3 preview 同天免费上 OpenRouter（DeepSeek 作为对照方）]] | 9 |
| 2026-05-10 | [[nathan-lambert-china-ai-labs-western视角访谈\|Nathan Lambert 跑了一圈中国 AI lab，写了一份 Western 视角内部观察]] | 8 |
| 2026-05-06 | [[gpt-5-5-instant替换chatgpt默认模型-幻觉率降了\|ChatGPT 默认模型悄悄换了，OpenAI 把幻觉砍掉一半]] | 9 |
| 2026-05-06 | [[openai物理学家lupsasca谈vibe-physics\|OpenAI 物理学家 Lupsasca 谈 Vibe Physics，AI 这次写的不是代码是论文]] | 7 |
| 2026-05-05 | [[deepclaude-deepseek-v4-pro接claude-code-agent-loop\|DeepClaude 一夜 657 HN 热度，把 Claude Code 的脑子换成了 DeepSeek V4 Pro]] | 9 |
| 2026-05-03 | [[deepseek-tui-564星-deepseek终端coding-agent-rust\|DeepSeek-TUI 一夜 564 星，给 DeepSeek 配了个 Rust 终端版的 Claude Code]] | 8 |
| 2026-05-01 | [[musk当庭承认xai蒸馏grok-国产模型蒸馏边界\|Musk 当庭承认 xAI 用 OpenAI 模型蒸馏 Grok，国产模型蒸馏的边界又被推了一下]] | 9 |
| 2026-04-25 | [[simon-willison实测deepseek-v4-接近前沿价格零头\|Simon Willison 实测 DeepSeek V4，"接近前沿但价格只是零头"]] | 8 |
| 2026-04-24 | [[deepseek-v4-pro-flash双发-openrouter-价格战新底部\|DeepSeek V4 Pro 1.6T + Flash 每 M 一毛钱 双发 OpenRouter]] | 10 |
| 2026-04-24 | [[qwen3-6-27b编程模型发布-27b-dense旗舰本地可跑\|Qwen3.6-27B Dense 本地编程旗舰（DeepSeek 作为对照实体）]] | 8 |
| 2026-04-23 | [[sebastian-raschka拆rlvr-grpo让llm推理追上o3的几个关键\|Sebastian Raschka 拆 RLVR + GRPO（DeepSeek R1 国产代表）]] | 8 |
| 2026-04-21 | [[self-llm国产教程-零门槛微调deepseek-qwen\|self-llm 3 万星 50 模型全中文教程（含 DeepSeek）]] | 8 |
| 2026-04-20 | DeepSeek V4要来了，万亿参数、GPT-4成本1/70 | 9 |
| 2026-04-30 | [[ollama接住国产全家桶-kimi-glm-minimax-deepseek\|ollama 默默接住国产全家桶，Kimi-K2.5 / GLM-5 / MiniMax / DeepSeek 一条命令本地跑]] | 9 |
| 2026-04-30 | [[chatgpt卸载量飙132-国产ai抢用户窗口期\|ChatGPT 卸载量同比涨 132%（DeepSeek 作为国产抢用户代表）]] | 8 |
| 2026-04-30 | [[ds2api国产中间件-deepseek多账号轮转白嫖\|ds2api 一夜涨 465 星：把 DeepSeek 客户端协议变 OpenAI/Claude 通用 API 中间件]] | 8 |
| 2026-05-07 | [[deepseek-v4-pro-flash双发-华为昇腾跑国产开源前沿\|DeepSeek V4 Pro 不再是 benchmark 第一名，但它把 1.6T 模型直接放到了昇腾上]] | 9 |
| 2026-05-07 | [[deepseek首轮融资估值45b-国产ai估值新里程碑\|DeepSeek 第一次融资就开 450 亿美金，国产 AI 估值水位被抬到哪了]] | 8 |
| 2026-05-14 | [[deepseek-v4-flash-openrouter免费-百万token实测\|DeepSeek V4 Flash 5/14 上 OpenRouter 免费 256K + 百万 token agent 实测]] | 10 |
| 2026-05-14 | [[deepseek-v3-v4架构演进-sparse-attention-rl三步跳\|Raschka 拆 DeepSeek V3 → V3.2 → V4 sparse attention + RL 三步跳]] | 7 |
| 2026-06-16 | [[本地跑模型第一台机器怎么选，Ollama 已支持 Kimi-K2.6、GLM-5.1、DeepSeek|本地跑模型第一台机器怎么选，Ollama 已支持 Kimi-K2.6、GLM-5.1、DeepSeek]] | 8 |

## 相关主题

- 国产AI生态
- [[ai-pricing|AI 定价]]
- [[local-inference|本地推理]]
- [[ai-research|AI 研究]]（RLVR / GRPO）

## 相关实体

- [[openrouter|OpenRouter]] — V4 双发出海首选渠道
- [[anthropic|Anthropic]] / [[openai|OpenAI]] — 价格与能力对照方
- [[sebastian-raschka|Sebastian Raschka]] — DeepSeek R1 方法论拆解者
- [[simon-willison|Simon Willison]] — V4 海外 KOL 实测者

## 注意

2026-04-24 正式建立公司实体页（此前以 wikilink 出现但无实体页）。DeepSeek 是国产 AI 在全球定价权与推理方法论两条线同时发声的代表性实体，后续每次模型迭代都应重点跟踪。
