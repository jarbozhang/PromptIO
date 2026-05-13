# OpenRouter

全球最大 LLM 模型路由聚合平台之一。中文开发者用来统一计费、跨厂商比价、调用国产模型的事实首选入口。2026-04 国产厂商（小米 MiMo、百度千帆、腾讯 Hy3、蚂蚁 Ling、DeepSeek V4）把 OpenRouter 当作出海与零门槛试用的首发渠道。

## 定位

1. **模型聚合路由** — 一个 API Key 调用几百个模型
2. **比价与透明** — 所有模型价格、上下文、速度透明可查
3. **免费层聚合** — 承接大量厂商的免费模型，是"白嫖 AI"的核心入口
4. **国产模型出海** — 2026 年起成为 MiMo / Qianfan / Hy3 / Ling / DeepSeek V4 等的海外首发渠道

## 近期入驻事件

- **2026-05-08** — 蚂蚁 [[ling-2-6-1t|Ling-2.6-1T]] 旗舰付费版上线 $0.30/M、Google [[gemini-3-1-flash-lite|Gemini 3.1 Flash Lite]] $0.25/M 1M 多模态、Block [[goose|Goose]] 通过 OpenRouter 接 [[deepseek|DeepSeek]] 跑本地编程 agent（三件接连，价格断档新低）
- **2026-04-28** — 给 7 个主流模型一口气加 Latest 别名（覆盖 OpenAI / Anthropic / Google / Moonshot 等），Agent 调用层从此自动跟随最新版本，省去手动改 model id
- **2026-04-27** — 阿里 Qwen3.6 全家桶 5 个模型一口气上 OpenRouter（27B Dense 到 1T Max Preview 全档位）
- **2026-04-24** — DeepSeek V4 Pro + Flash 双发、腾讯 Hy3 免费、蚂蚁 Ling-2.6-1T 免费
- **2026-04-23** — 小米 MiMo-V2.5 + Pro 双发、百度 Qianfan-OCR-Fast 免费
- **2026-04-22** — GPT Image 2 同步登陆
- **2026-04-21** — Kimi K2.6-code-preview 登陆

## 平台机制演化

- **Latest 别名机制（2026-04-28）** — OpenRouter 给 7 个主流模型加 `*-latest` 风格别名，调用方写一次 model id 就能自动跟随上游最新版本，明显降低 Agent 系统的版本维护成本，同时把"跟版"决策从下游应用收回平台侧

## 我们的覆盖

| 日期 | 文章 | 角度 |
|------|------|------|
| 2026-05-10 | [[蚂蚁ring-腾讯hy3-双双上openrouter-万亿模型免费\|蚂蚁 Ring-2.6-1T + 腾讯 Hy3 preview 同天免费上 OpenRouter，国产万亿双子线]] | 国产万亿免费档同台 |
| 2026-05-10 | [[gpt-5-5-openrouter成本拆解-输入降输出涨\|OpenRouter 拆 GPT-5.5 价格曲线，输入翻倍 / 输出翻倍 / 长 prompt 反而省钱]] | 平台一手价格分析 / 缓存红利 |
| 2026-05-08 | [[蚂蚁ling-2-6-1t万亿模型上openrouter-比deepseek便宜\|蚂蚁 Ling-2.6-1T 旗舰上 OpenRouter $0.30/M 比 DeepSeek 便宜]] | 国产万亿付费档新底部 |
| 2026-05-08 | [[gemini-3-1-flash-lite-1m多模态白嫖-0-25美元每m-token\|Gemini 3.1 Flash Lite $0.25/M token 1M 多模态]] | 海外定价新底部 / 视频塞进 prompt |
| 2026-05-08 | [[goose-26k星-block本地agent-绕开claude-code-200美金\|Block Goose 通过 OpenRouter 接 DeepSeek 本地跑 AI 编程 agent]] | 本地 agent / OpenRouter 作为后端 |
| 2026-05-06 | [[百度cobuddy免费上openrouter-国产编程模型白嫖131k-context\|百度第二个免费模型上 OpenRouter，这次是编程模型 CoBuddy，131k 上下文白嫖]] | 国产免费编程模型入驻 |
| 2026-05-01 | [[xai-grok-4-3上openrouter-1m-context\|xAI Grok 4.3 悄悄上 OpenRouter，1M context 想接住国内 agent 开发者]] | xAI 模型上 OpenRouter / 1M context |
| 2026-04-28 | [[openrouter-latest别名机制-7个主流模型-自动跟随最新版本\|OpenRouter 给 7 个主流模型一口气加了 Latest 别名]] | 平台机制 / Agent 自动跟版 |
| 2026-04-27 | [[qwen3-6全家桶5个模型上openrouter-27b-dense到1t-max-preview\|Qwen3.6 全家桶 5 个模型上 OpenRouter]] | 国产全档位铺出海 |
| 2026-04-24 | [[deepseek-v4-pro-flash双发-openrouter-价格战新底部\|DeepSeek V4 双发 OpenRouter]] | 聚合平台首发 |
| 2026-04-24 | [[腾讯hy3-蚂蚁ling-2-6-1t免费上openrouter-国产万亿白嫖\|腾讯 Hy3 + 蚂蚁 Ling 双万亿免费上 OpenRouter]] | 国产万亿免费试用 |
| 2026-04-23 | [[小米mimo-v2.5上openrouter-百万context全模态白菜价\|小米 MiMo-V2.5 + Pro 双发上 OpenRouter]] | 全模态国产白菜价 |
| 2026-04-23 | [[百度千帆ocr-fast免费上openrouter-发票合同截图白嫖\|百度千帆 OCR 免费扔到 OpenRouter]] | 免费 OCR |
| 2026-04-21 | [[kimi-k26-code-preview上线openrouter-国产编码新王牌\|Kimi K2.6-code-preview 登陆 OpenRouter]] | 国产编码模型 |
| 2026-04-10 | [[claude-code换zed加openrouter省了70percent\|Zed+OpenRouter 省 70%]] | 编程工具省钱 |
| 2026-04-30 | [[蚂蚁ling-2-6-flash上openrouter-agent实时档\|蚂蚁 Ling-2.6-flash 偷上 OpenRouter，104B 总参数 7.4B 激活]] | 国产 MoE agent 实时档 |
| 2026-04-30 | [[nvidia-nemotron-30b-omni免费上openrouter-4模态白嫖\|NVIDIA Nemotron 30B Omni 上 OpenRouter 免费，四模态全收]] | 海外四模态免费白嫖 |
| 2026-05-13 | [[claude-opus-4-7-fast-openrouter-1m-context-6x\|Claude Opus 4.7 Fast 上 OpenRouter 1M context 6×]] | Opus 新档位首发 / 1M context |

## 相关主题

- [[ai-pricing|AI 定价]]
- 国产AI生态
- [[ai-coding-tools|AI 编程工具]]

## 相关实体

- [[deepseek|DeepSeek]] / [[tencent|腾讯]] / [[ant-group|蚂蚁集团]] / [[xiaomi|小米]] / [[baidu|百度]] / [[alibaba|阿里]] — 国产模型入驻方
- [[mimo|MiMo]] / [[qianfan|千帆]] / [[deepseek-v4|DeepSeek V4]] / [[qwen-family|Qwen 全家桶]] — 具体入驻产品
- [[openai|OpenAI]] / [[anthropic|Anthropic]] / [[google|Google]] / [[moonshot|Moonshot]] — Latest 别名机制覆盖的主流模型方
- [[chrome|Chrome]] / [[claude-code|Claude Code]] — 下游消费场景

## 注意

2026-04-24 正式建立产品实体页。OpenRouter 在 2026 年 4 月发生结构性变化——从"海外模型聚合"变成"国产模型出海中转 + 全球零门槛试用入口"。后续国产厂商每次在 OpenRouter 上的新动作都应默认记入 OpenRouter 时间线。
