---
title: Mira Murati 的 Thinking Machines 发了 "interaction models"，AI 边听边说要怎么用
slug: thinking-machines-interaction-models-mira-murati-边听边说
date: 2026-05-12
status: draft
voice: analytical
archetype: 现象解读
reach: 8
topics: [多模态, 语音 AI, 创作者经济]
entities: [thinking-machines, mira-murati, openai]
---

# Mira Murati 的 Thinking Machines 发了 "interaction models"，AI 边听边说要怎么用

## 为什么你应该关注这件事

Mira Murati 从 OpenAI 出走、拿了 20 亿美元种子轮成立 Thinking Machines Lab 之后，外界等了快一年才看到她押的第一个方向。5 月 11 日她在 X 上甩出一篇博客，附带一个叫 **TML-Interaction-Small** 的模型，276B 总参、12B 激活的 MoE，从零训练，主打"边听边说边看"。

不是 OpenAI Realtime 那种"你说完一句、它回一句"的语音 wrapper，也不是 Gemini Flash 套个 TTS。她把这一类系统起了个新名字，**interaction model**。本号要单独写它，原因有三个，

一，这是 Murati 离开 OpenAI 后第一次给出明确的产品路线，方向直接绕开了"更大 LLM"这条已经卷烂的赛道。

二，技术取舍很硬，原生 200ms 时间片对齐的 audio+video+text 输入，**直接干掉了传统语音管线里那颗 VAD（Voice Activity Detection）**。所以呢过去一年所有在用 VAD 切片 + Whisper + LLM + TTS 拼装出来的"实时语音 agent"，技术底盘要重做。

三，对中国开发者特别相关。国内一大批做语音陪伴、面试陪练、外语口语、直播互动、客服 agent 的团队，目前主流方案就是上面那套四件套拼装的工程化产品。Murati 这次给出的是另一条路，**模型本身就是连续时间感知的**，不再需要工程层去伪造"对话节奏"。

## 把事情讲清楚

### 它到底做了什么

按 Thinking Machines 的官方说法，今天所有模型"在单线程里体验现实"，用户没说完话之前，模型完全感知不到正在发生什么，更不知道用户是在停顿、迟疑、还是已经走神。

interaction model 的设计前提是把这个单线程改成连续流，模型在 200ms 的时间片里同时处理音频、视频、文本三路输入，**生成响应的同时仍在接收输入**，full-duplex（全双工）。技术上对应到几个具体选择，

- **encoder-free early fusion**，和 Meta 的 Chameleon 路线类似，不再用单独的 audio encoder + vision encoder 各自吐 token，而是底层就把多模态打成对齐到时间轴的统一 token 序列。
- **time-aligned microturns**，每 200ms 为一个"微回合"，模型在每个微回合里都可以选择"说话/沉默/继续听/打断自己"。
- **从零训练**，不是在文本 LLM 上 grafting（嫁接）语音头，而是从预训练阶段就喂连续多模态数据。这也是它能"杀掉 VAD"的根本原因，VAD 本质是在用工程手段补救模型缺失的时间感知，原生时间感知模型不需要它。

参数规模 276B-A12B 不算大，正好是一个能上 H100/H200 单机推理的尺寸。响应延迟官方报 **0.40 秒**，已经接近人类正常对话间隔（人对人对话的中位间隔约 200ms）。

### 跑分和 demo

Latent Space 的 swyx 已经拿到 demo，他说 benchmark 不是重点，"feel the AGI" 才是。但 Thinking Machines 也确实放出了一些可比数据，

- 在 BigBench Audio 和 IFEval 上**同时压过 GPT-Realtime-2 和 Gemini 3.1 Flash**，这两个正好是上周（5/11）OpenAI 和 Google 分别公开升级的旗舰实时语音模型。
- 自家造了五个新 benchmark，名字都很直白，TimeSpeak（按指定时刻开口）、CueSpeak（在合适时机开口）、RepCount-A（连续视觉计数）、ProactiveVideoQA（限时回答）、Charades（动作时序定位）。
- 都是在测**"何时开口"和"何时闭嘴"**这件事，传统 LLM benchmark 完全测不出来。

### 5 月 11 日这一天发生了什么

值得放进上下文，同一天，三家头部都在动语音。

- **OpenAI Realtime 2** 公开 GA，主打更低延迟和更便宜的 token 价格。
- **Anthropic** 给 Claude voice 加了"中断恢复"。
- **Gemini 3.1 Flash TTS** 升级了多语种音色。

Thinking Machines 在同一天发 TML-Interaction-Small，**显然是冲着这三家来的**。但路线选择完全不同，前三家本质都还在"turn-based + 工程优化"的范式里把延迟压低，Thinking Machines 直接把范式换了。这是 Murati 在 OpenAI 内部一直没能推动的路线（她在 GPT-4o 的 "Her" demo 之后据说就主张要做原生多模态），现在自己开公司终于能押。

## 社区声音

- r/accelerate 一个细节党扒了博客（50 upvotes），276B-A12B 的 MoE 配置，"比近期更大的模型也都压过"，加速派关心的不是体验，是规模 vs 性能曲线。
- r/ChatGPT 的总结贴标题直接是 "Made GPT Realtime Look Slow"，社区共识是 OpenAI 已经被 Murati 反超了一拍。
- r/ChatGPTcomplaints 是另一种情绪，有用户说"如果当初离开 OpenAI 的是 Murati 不是 Schulman 该多好"，这条 14 赞的评论代表一批人对 OpenAI 现状的失望，他们正在把希望转移到 Thinking Machines。
- swyx 在 Latent Space 的总结很关键，"连续 audio+video+text → audio+text 这个类型签名一旦成立，很多任务直接变 zero-shot"。这是说 interaction model 不只是更好的语音 agent，是一类新的能力承载形态。

## 我的判断

**这事对中国实时语音 agent 团队是一个明确预告，不是即时威胁，但要现在就开始想清楚。**

短期（3-6 个月），TML-Interaction-Small 只放 research preview，不会开权重也不会开 API。所以现在国内做语音陪伴、口语陪练、电话客服 agent 的，**不用慌**，你的 VAD + Whisper + LLM + TTS 四件套，明年这时候都还能跑。

但中期（6-12 个月）有两件事会发生，

第一，**国产复刻一定会来**。这种"原生时间感知多模态"是论文级别可以追的方向（不像 SOTA 大 LLM 需要 100k 卡），智谱、阶跃、MiniMax 里至少有一家会在年内发出 demo。MiniMax 的 abab 7 系列已经有相关投入，阶跃刚发的 Step-3 也提到了 streaming 方向。

第二，**OpenAI / Google / Anthropic 会被迫跟进**。他们手里的 turn-based realtime 模型本质是过渡形态，一旦 Thinking Machines 的 demo 真的"feel the AGI"，前三家半年内会有原生 interaction 模型回应，但他们的难度在于"已经卖出去的 Realtime API 怎么平滑迁移"，这反而是后发者的窗口。

对国内做实时语音 agent 的开发者，这一波我的具体建议，

1. **业务层不要再深度耦合 VAD 时序**。如果你的 agent 逻辑里写了"等用户停顿 800ms 才触发回复"，明年这套逻辑要全部重写。把"何时开口"这个决策当成黑盒接口预留。
2. **数据收集马上转向"带时间戳的连续多模态对话"**。原来你只录文本对话或语音 turn，下一代模型训练需要的是**连续音视频流 + 模型在每个 200ms 做的决策**。现在开始攒，半年后国产 interaction 模型出来你就有微调数据。
3. **看准窗口下注**，如果你做的是面向 C 端的语音陪伴/口语陪练，2026 下半年大概率会出现一波"原生 interaction 模型"驱动的新产品，体验断层式领先于现在的 Character.AI、Talkie。这是创业窗口，不是大厂窗口，大厂动作慢，独立开发者用 API 套壳半年内能跑出 demo。
4. **不要押 Thinking Machines 第一方 API**。20 亿种子轮也烧得起两年，但 Murati 团队历史风格是慢工出细活，公开 API 大概率 2026 年底。你押开源复刻的把握更大。

最后说一句对 Murati 本人的判断，她离开 OpenAI 的时候大家都在赌她会做"安全派 LLM"或者"个人 AI"，结果她押的是一个比 LLM 更上游的范式，人机交互的物理层。这个押注如果成立，未来五年的 AI 产品形态会比"对话框 + LLM"更像"打电话 + 视频通话"。她从 OpenAI 走出来后第一份答卷，至少在方向感上比一年前发的"Mistral 套娃"那批前同事的公司高出一档。

---
相关实体:: [[thinking-machines|Thinking Machines]] | [[mira-murati|Mira Murati]] | [[openai|OpenAI]]
相关主题:: [[multimodal|多模态]] | [[voice-ai|语音 AI]]

<!-- REACH: 8/10 | 品牌✓ 利益点✗ 可操作✗（行业事件预告） -->
