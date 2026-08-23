# Qwen 全家桶 / Qwen Family

[[alibaba|阿里]] 通义千问系列的总览页面。2026-04-27 一口气把 5 个模型上 OpenRouter，从 27B Dense 到 1T Max Preview 全档位铺出海，正式从单点旗舰升级到全栈出海。

## 当前家族成员（2026-04-27 上 OpenRouter 5 模型快照）

| 档位 | 模型 | 定位 |
|------|------|------|
| 本地档 | [[qwen-3-6-27b|Qwen3.6-27B]] Dense | 一张消费级显卡可跑的编程旗舰 |
| 编程档 | Qwen3.6 Coder | 专攻编程任务的中档主力 |
| 多模态档 Vision | Qwen3.6 Vision | 视觉理解 + 编程交叉 |
| 多模态档 Video | Qwen3.6 Video | 视频理解 |
| 旗舰档 | Qwen 1T Max Preview | 万亿参数，对标 GPT-5.5 / Claude 旗舰 |

注：Qwen3.6-35B 是上一代主力，Simon Willison 笔记本实测胜过 Claude Opus 4.7。

## 关键定位

1. **全档位出海** — 从 27B Dense 到 1T Max Preview，OpenRouter 上一次性形成完整选择路径，对标 OpenAI/Anthropic/Google 三家"全栈拥有者"格局
2. **本地 + 云端双覆盖** — 27B Dense 本地可跑 + 1T Max Preview 云端旗舰，单家厂商覆盖端到端价格档
3. **多模态 + 编程并发** — Vision/Video/Coder 三个垂类档位齐发，垂直能力专项化

## 首次覆盖

2026-04-27（家族总览视角）；27B Dense 单品于 2026-04-24 首次入库，见 [[qwen-3-6-27b|Qwen3.6-27B]]。

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-10 | [[nathan-lambert-china-ai-labs-western视角访谈\|Nathan Lambert 跑了一圈中国 AI lab，写了一份 Western 视角内部观察]] | Western KOL 内部观察 / Qwen 作为头部 lab |
| 2026-05-06 | [[learningcircuit-95-simpleqa-qwen3-6-27b-3090本地深度研究\|一张 3090 跑 Qwen3.6-27B，本地深度研究 agent 干到 95.7% SimpleQA]] | 27B Dense 本地深度研究实战 |
| 2026-05-06 | [[openai物理学家lupsasca谈vibe-physics\|OpenAI 物理学家 Lupsasca 谈 Vibe Physics（Qwen 作为开源对照）]] | KOL 引用 / 开源模型对照 |
| 2026-04-27 | [[qwen3-6全家桶5个模型上openrouter-27b-dense到1t-max-preview\|阿里 Qwen3.6 全家桶今天一口气上了 5 个模型，从 27B Dense 到 1T Max Preview 全有]] | 全家桶出海 / 国产全档位铺设 |
| 2026-04-24 | [[qwen3-6-27b编程模型发布-27b-dense旗舰本地可跑\|Qwen3.6-27B Dense 旗舰本地可跑]] | 单品 Dense 编程档 |
| 2026-05-07 | [[nouscoder-14b开源-48张b200训4天-接住claude-code时刻\|NousResearch 用 48 张 B200 训 4 天搞出 NousCoder-14B，开源接住 Claude Code 时刻]] | base 模型 / 海外微调引用 |
| 2026-05-07 | [[gb10-solution-atlas开源-rust-cuda让qwen3-6-35b单卡100tok每秒\|DGX Spark 单卡跑 Qwen3.6-35B 100+ tok/s，这个 Rust 推理引擎把 PyTorch 整条栈丢出去了]] | 本地推理性能 / Qwen3.6 落地 |
| 2026-05-21 | [[阿里-qwen3-7-max-openrouter-100万上下文-白菜价\|阿里 Qwen3.7 Max 上 OpenRouter 100 万 token 上下文 Agent 优先 价格白菜]] | Qwen3.7 Max 新旗舰 / 1M context / 出海首发 |
| 2026-06-16 | [[本地跑模型第一台机器怎么选，Ollama 已支持 Kimi-K2.6、GLM-5.1、DeepSeek|本地跑模型第一台机器怎么选，Ollama 已支持 Kimi-K2.6、GLM-5.1、DeepSeek]] | Ollama 本地选型 / 真实任务验证 |

## 相关主题

- [[ai-pricing|AI 定价]]
- [[multimodal|多模态]]
- [[local-inference|本地推理]]
- [[agent-frameworks|Agent 框架]]
- [[ai-coding-tools|AI 编程工具]]
- 国产AI生态

## 相关实体

- [[alibaba|阿里]] — 开发方
- [[qwen-3-6-27b|Qwen3.6-27B]] — 家族里本地档单品页
- [[openrouter|OpenRouter]] — 4/27 全家桶出海主渠道
- [[deepseek|DeepSeek]] — 国产 MoE 路线对照
- [[simon-willison|Simon Willison]] — Qwen 本地实测传播者

## 注意

Qwen 全家桶页面用于追踪整个家族的版本演化和档位扩张。后续跟踪点：1T Max Preview 实测榜单、OpenRouter 上的调用量曲线、多模态档（Vision/Video）的国产同行对照、是否被主流 IDE 默认集成。
