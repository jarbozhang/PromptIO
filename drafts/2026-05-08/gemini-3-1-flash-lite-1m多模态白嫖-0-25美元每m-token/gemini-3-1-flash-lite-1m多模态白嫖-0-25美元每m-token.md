---
title: "Google Gemini 3.1 Flash Lite 静悄悄上 OpenRouter，1M 多模态白嫖，$0.25/M token 把视频也算进 prompt"
slug: "gemini-3-1-flash-lite-1m多模态白嫖-0-25美元每m-token"
date: 2026-05-08
status: draft
voice: analytical
reach: 9
archetype: "工具实测 / 价格档位"
entities: [google, gemini, openrouter, deepseek, anthropic, openai]
topics: [ai-pricing, multimodal, ai-coding-tools]
---

# Google Gemini 3.1 Flash Lite 静悄悄上 OpenRouter，1M 多模态白嫖，$0.25/M token 把视频也算进 prompt

## 一、为什么你应该关注这件事

5 月 7 日 Google 把 Gemini 3.1 Flash Lite 推到 GA，第二天 OpenRouter 就把它接进了路由列表。没有发布会，没有热搜，模型卡里写得很克制，「high-efficiency multimodal model optimized for low-latency, high-volume workloads」。

但只要把它的三个参数摆在一起看，事情就不一样了，

- **价格**，$0.25 / 1M prompt tokens，$1.50 / 1M completion tokens
- **上下文**，1,048,576 tokens（1M context）
- **输入模态**，text + image + video + audio + file（PDF 直接喂）

这是一条以前不存在的价格档位线。$0.25/M 这个数字，过去 12 个月里只在「纯文本 + 8K~32K context + 中文小模型」这种组合上见过；而 1M context + 全模态输入这一档，过去的标价基本卡在 $1~$3/M prompt 起步。Google 这次直接把多模态的「入门价」打到了文本小模型的水平线。

OpenRouter 把它加进来意味着两件具体的事，第一，国内开发者不用境外手机号 / 境外信用卡，用国内能开的虚拟卡就能跑这个模型；第二，它和 Claude Haiku、GPT-5.5 mini、DeepSeek、Qwen Flash 共用同一套 API endpoint，切模型只是改一行字符串。

下面这篇主要做一件事，把这个价格档位放回 OpenRouter 现有梯度里，看清楚它把谁逼到了什么位置，以及对中文开发者那结果会怎样。

## 二、把事情讲清楚

### 1. 这不是 preview，是 GA

Reddit 上 r/GeminiAI 的帖子 90 赞 27 评论，标题就一句话，"Gemini 3.1 Flash Lite GA version has just been released. Previously, it was a preview version."（GA 版上线了，之前是 preview）

GA 的意义是稳定 SLA、稳定价格、稳定 API 字段，而不是 Google AI Studio 里随时改的实验品。OpenRouter 接进来的 model id 是 `google/gemini-3.1-flash-lite`，对照 OpenRouter 的命名规则，没有 `-preview` 后缀，可以放进生产链路。

### 2. 多模态输入到底那结果会怎样

模型卡里写的输入模态是 `text+image+file+audio+video → text`。把这五种模态拆开看，

- **text**，常规文本输入。
- **image**，图片直接当 prompt，不需要先 OCR 再喂文本。
- **file**，PDF / docx 这类文件直接上传，不用先解析。1M context 意味着一本 300 页的 PDF 完全可以一次喂完。
- **audio**，音频片段直接进 prompt，不用先走 ASR 转写。
- **video**，视频帧 + 音轨一起作为 prompt 的一部分。

视频被算进 prompt token 这件事过去一直是 Gemini 系列的标志，但前几代模型这一档定价都偏高，Gemini 2.5 Pro 这条路径上常规跑视频很快就把额度烧完。Flash Lite 把这一档拉到 $0.25/M，第一次让「视频喂模型」从 demo 级变成可以跑批量的成本结构。

### 3. 价格档位对照

OpenRouter 上目前主流梯度的大致区间（只对比档位，不引精确数字），

| 价格档位 (input) | 代表模型类型 | 上下文 / 模态 |
| --- | --- | --- |
| $0.1 ~ $0.3 / M | DeepSeek V4 系列、Qwen Flash、国产小模型 | 多为文本 only，128K~256K |
| $0.2 ~ $0.5 / M | **Gemini 3.1 Flash Lite** | **1M + 多模态全输入** |
| $0.5 ~ $2 / M | Claude Haiku、GPT-5.5 mini、Gemini Flash 主线 | 200K~1M，多数支持图像 |
| $2 ~ $5 / M | Claude Sonnet、GPT-5.5 主线、Gemini 3 Flash | 200K+，主线多模态 |
| $5 ~ $20+ / M | Claude Opus、GPT-5.5 Pro 系列、推理旗舰 | 推理 / 重量级任务 |

把 Flash Lite 摆进去，它正好砸在第一梯队和第二梯队中间的真空带，价格只比国产纯文本小模型贵一点点，但模态完整度直接顶到了主线水平。它和同日上线的 inclusionAI Ling-2.6-1T 形成有意思的对照，Ling-2.6-1T 是万亿参数旗舰，定价 $0.30/M prompt + $2.50/M completion，但只支持纯文本 → 文本，context 26 万。同一天上线，同一个价格区间，一个是大参数文本旗舰，一个是轻量多模态全栈，市场被 Google 多撕开了一块。

模型卡里那句"Priced at half the cost of Gemini 3 Flash"才是关键，Google 内部把 Flash 主线和 Lite 主线明确做成了 2:1 的价格梯度，相当于告诉所有调用方，如果你的任务不需要 Flash 主线的复杂推理，请下移一档，便宜一半，模态不少。

### 4. "thinking levels" 这个细节

模型卡里还藏了一个值得拎出来的字段，Flash Lite 支持完整的 thinking levels（minimal / low / medium / high）。所以呢它可以在一个 model id 里通过开关切换"省钱模式"和"动脑模式"，而不像 Anthropic 那样需要换模型。对 agentic workflow 来说，这是个相当务实的设计，路由层不用维护两个 model id，prompt 里加个参数就能动态降级。

## 三、社区声音

Reddit r/GeminiAI 上那条 GA 公告热度不算高（90 赞 27 评论），但评论方向很集中，

- 多数开发者第一反应是去对照 Gemini 2.5 Flash Lite，关心点都在"对同类任务延迟和成本能不能整体砍掉一半"。
- 有人提到 Google AI Studio 里跑 Flash Lite 的 cold start 比 2.5 时代明显低，配合 1M context 跑长 PDF 总结这一类工作，时延体感更接近一般的 Sonnet API。
- 评论区也有人指出 GA 版相比 preview 期间的输出风格"更克制了一点"，长 thinking 模式下不再大段铺陈，更接近"按需思考"。

HN 上目前还没有专门的讨论帖，X/Twitter 这次研究因为 cookie 没接入抓不到实时数据。整体看，这次 GA 的传播热度远不如同期 Gemini 3 主线模型，但开发者圈里那批以"刷 OpenRouter 模型列表"为日常的人是第一时间跑去测了。

## 四、我的判断

Google 这步动作不是产品发布，是一次**价格档位的重定义**。

过去 OpenRouter 的多模态梯度有一个清晰的认知，「多模态 = 贵，便宜的多模态 = 阉割版」。Flash Lite 把这条认知打掉了，便宜、多模态、1M context、GA 稳定，四件事被打包到了同一个 SKU 里，价格还只有 Flash 主线的一半。

这对几方的压力是不对称的，

- **对国产多模态最难受**。国产纯文本小模型守在 $0.1~$0.3/M，本来就是靠"便宜 + 中文优化"维持。Flash Lite 不抢中文小模型市场，但谁要做"图文 / 视频 / PDF 输入 + 1M context"这种场景，从 Qwen-VL、智谱 GLM-4V 到豆包视觉，定价压力会很直接。下一轮国产多模态调价可能比想象中早。
- **对 Anthropic 是慢性压力**。Claude Haiku 现在的角色是「便宜、快、文本主导、有限图像」，但价格档位明显高于 Flash Lite，模态覆盖也窄一档。短期 Haiku 用户不会迁移（Anthropic 在 agent / 工具调用质量上还有口碑领先），但 OpenRouter 上「成本敏感型轻量任务」的默认路由会开始飘向 Gemini 一侧。
- **对 OpenAI 暂时影响不大**。GPT-5.5 mini 这条线本来就不是定价主战场，OpenAI 的护城河还在主线模型和 Codex 工具链。但如果 Google 后续把 Flash Lite 和 Workspace 深度绑定（Gmail / Docs 直读），那才是 OpenAI 真正要紧张的事。

更 Google 的节奏感。这次 GA 没办发布会、没有铺天盖地的 X 贴文、没有 demo 视频，只是模型卡更新一行字。这种"先把价格砸下去，再让开发者自己发现"的打法，是当年 DeepSeek V2 把推理价压到 1 元 / 百万 token 时用过的一招。区别在于 DeepSeek 当时没有多模态、没有 1M context、没有全球 SLA。Google 这次的隐形动作，本质是用 DeepSeek 的定价节奏 + 自家的多模态护城河，悄悄把"sub-$0.5/M 多模态"这个档位做成行业默认。

短期看，这个档位会逼出至少两轮跟进，国产多模态调价 + 各家把"轻量 multimodal"独立成 SKU。中期看，「multimodal-as-default」会从口号变成账单事实，开发者在做架构选型时，不再需要先问"我能不能不用多模态省钱"，而是默认按多模态写 prompt，因为不再贵。

## 五、行动建议

如果你是国内独立开发者 / 小团队，最快的接入路径是这条，

1. **OpenRouter 注册 + 充值**，不需要境外手机，国内能开的几张虚拟信用卡都能充。OpenRouter 自己也支持 crypto，无需绑信用卡这条路也通。这一步的核心价值是，**绕开 Google AI Studio 对境外手机号 / 支付的依赖**，以前用 Gemini 系列的最大门槛就在这。
2. **改一行 model id 试模型**，如果你已经有跑 OpenAI 兼容 API 的代码，把 model id 换成 `google/gemini-3.1-flash-lite`，base URL 切到 `https://openrouter.ai/api/v1`，就跑通了。先用一段长 PDF 或者一段 5 分钟视频试一次，体验 1M context 多模态的延迟和质量再决定要不要切。
3. **三个适配 Flash Lite 的高 ROI 场景**，
 - **PDF 长文档摘要**，把整本研报 / 财报 / 论文一次喂进 1M context，不用 chunk，不用做 RAG，单次调用拿结论。Flash Lite 价格档位让这件事第一次能跑批。
 - **视频 → 文本**，电视剧片段、产品演示视频、课程录屏直接喂模型，让它出剧情概要 / 操作步骤 / 课程笔记。视频被算进 prompt token 这件事，配上 $0.25/M，第一次进入"可批量"区间。
 - **轻量 agent 路由层**，thinking levels 切档可以让一个 model id 同时承接「快速分类」和「需要思考的工具调用」两种任务，路由层的复杂度直接降一级。

不建议的用法，复杂代码生成、长链推理任务、对最终质量极敏感的对外内容。这些场景该上 Sonnet / Gemini 3 Flash 主线还是上，Flash Lite 不是替代品，是补位品。

最后一句务实的话，这个档位在 OpenRouter 上至少会安稳跑半年，不必抢着切。先在自己的非核心链路上挂一条 Flash Lite 路由，跑 1~2 周看账单和质量，再决定要不要把它做成主路由。新的便宜档位每隔几个月就会出现，但能稳态承接 1M context + 多模态的便宜档位，这是第一次。

---
相关实体:: [[google|Google]] | [[gemini|Gemini]] | [[openrouter|OpenRouter]] | [[deepseek|DeepSeek]] | [[anthropic|Anthropic]] | [[openai|OpenAI]]
相关主题:: [[ai-pricing|AI 定价]] | [[multimodal|多模态]] | [[ai-coding-tools|AI 编程工具]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
