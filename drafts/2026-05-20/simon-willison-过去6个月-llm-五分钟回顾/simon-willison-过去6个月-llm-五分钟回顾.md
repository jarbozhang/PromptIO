# Simon Willison 用 5 分钟把过去 6 个月 LLM 全捋了一遍 给中国读者画的时间轴

过去半年 LLM 发生了太多事，连 Simon Willison 这种圈内人都得隔半年专门梳一次。

5 月 19 日他发了一篇博客，叫 "The last six months in LLMs in five minutes"，按时间顺序把 2025 年 11 月到现在的关键节点串了一遍。这种人每天都在跟模型打交道，连他都需要时间轴，普通人光靠刷推早就懵了。

我看完后做了两件事，一是把他这条时间轴按"什么时候出、国内能不能用、替代品是谁"重新画了一版，二是补了几件 Simon 这次没写、但中国读者关心的国产线索。下面是结果。

## Simon 这次梳了什么

Simon 的回顾骨架其实很干，主线就两条。

第一条是"前沿模型最强位置半年内换了 5 次手"。从 2025 年 9 月 Claude Sonnet 4.5 起锚，到 11 月 GPT-5.1 反超、Gemini 3 接力、GPT-5.1 Codex Max 出场、Claude Opus 4.5 又抢回王座，半年内三家公司互相轮换，节奏比 2024 年快得多。

第二条是"编程智能体跨过了实用线"。Simon 用了一个挺克制的说法，叫 "from working sometimes to working most of the time"。背后是 RLVR（可验证奖励的强化学习）在 2025 年下半年集中开花，让 Codex、Claude Code 这类东西从"偶尔能跑通"升级到"日常可用"。

剩下的内容是细节，包括他自己玩的鹈鹕骑自行车画图 benchmark、Gemini 3.1 Pro 在 2 月的进步、4 月 Gemma 4 和 GLM-5.1 这种开源模型的跳跃，以及他特别提了一句的 OpenClaw 现象（一个三个月内从首次提交涨到"催生硬件销量"的项目）。

## 中国读者视角的时间轴

我把 Simon 那条线拆成 6 个节点，每个节点回答三件事，什么时候出、国内能不能直接上手、有没有替代品。

**2025 年 9 月 / Claude Sonnet 4.5**
Anthropic 发布，被圈内当成"最佳"。国内直连不可用，常见路径是通过 OpenRouter 调用 API，或者用国内云厂商的代理网关。替代品方向是 DeepSeek V3、Qwen3 系列，国产里日常写代码很多人切到了 Qwen3 Coder。

**2025 年 11 月 13 日 / GPT-5.1**
OpenAI 反超 Sonnet 4.5。国内访问情况同上，主流走 API 中转。替代品里阿里通义和智谱 GLM 系列做了相近定位的对标。

**2025 年 11 月 18 日 / Gemini 3**
Google 发布，被 Simon 称赞画图能力最好。国内主要通过 Vertex AI 或 OpenRouter 走 API，AI Studio 网页端基本访问不了。替代品方向是字节豆包大模型、智谱 GLM-5。

**2025 年 11 月 24 日 / Claude Opus 4.5**
重夺第一。同时期，Claude Code 这类编程智能体已经从"演示能跑"变成"敢交日常活"，国内开发者熟悉的替代选择是基于 Qwen3 Coder 自部署，或直接用国内的 Codex 类托管服务。

**2026 年 2 月 / Gemini 3.1 Pro**
能画"鹈鹕骑车带鱼篮"那种比较考验空间一致性的图。中国这边的对手是阿里通义万相、字节豆包图像生成，对中文场景反而更顺手。

**2026 年 4 月 / 开源模型集体跳跃**
Google 放出 Gemma 4（目前 Google 最强开源权重），中国的智谱 GLM-5.1 放出 754B 参数的庞然大物，阿里 Qwen3.6-35B-A3B 在笔记本上能跑且部分跑分超过 Claude Opus 4.7。这一档对国内读者最友好，国内云厂商基本同步上架、HuggingFace 镜像站有完整权重、本地 Mac M 系列就能跑量化版。

把这条时间轴对齐一遍会发现一件事，国内用户其实没那么"落后"，前沿模型隔一层 OpenRouter 就能摸到，本地能跑的开源档基本同周到位，唯一真正掉队的是网页前端那一层。

## Simon 漏掉的国内事件

Simon 的视角是英文圈，国内这边过去半年也有几件大事不能不提。

**DeepSeek V3 → V4 跳代**。V3 把 MoE 的训练成本卡到一个让海外都重新检查 GPU 账单的水平，V4 在推理优化和长上下文上继续推。国内开发者最大的实操影响是 API 价格被打下来一截。

**Qwen3 系列把"本地能跑"做成日常**。Qwen3-30B-A3B 和后来的 Qwen3.6-35B-A3B 都是 MoE 设计，激活参数小、笔记本能跑，国内独立开发者私有部署的比例肉眼可见上去了。

**字节豆包大模型继续往多模态和音视频卷**，配合飞书和抖音生态的渗透，是国内 to C 端用得最多的那一档。

**智谱 GLM-5 / GLM-5.1**，5.1 这次直接放了 754B 的开源权重，是国内开源里参数量最大的一档，研究院和高校优先抢。

**阿里通义在企业侧持续吃单**，钉钉、企业邮、阿里云全家桶的 AI 接入基本默认通义。国产 to B 这一块通义和豆包是两条不同打法。

这 5 件 Simon 都没写，但任何想看国内 AI 全貌的人都绕不过去。

## 我的判断

Simon 这种"半年回头梳一次时间轴"的内容形式，比每天追新闻更接近"判断力"。

每天追新闻的最大问题是没有比例感。新模型今天上 benchmark 第一、明天被反超，单点信息密度高但你记不住。隔半年画一次时间轴会强迫你回答"这半年到底发生了什么真正重要的事"，把短期噪音过滤掉。我看 Simon 的稿子里真正值得圈的就两句话，前沿模型半年换了 5 次手、编程智能体跨过了实用线，其余全是注脚。

国内 AI 自媒体我看下来，做 daily 跟新闻的多，做"半年时间轴"这种结构化复盘的非常少。这是一个明显的空位。

## 行动建议

把 Simon 这篇当起点读一遍，simonwillison.net 翻到 2026/May/19/5-minute-llms 那篇。

然后试着自己画一个"国内 AI 半年时间轴"，按 DeepSeek、Qwen、豆包、智谱、通义 5 条线分别列关键节点，标注每个节点你当时有没有真的用上。这个动作能让你看清自己过去半年的认知盲区在哪里。

最后，如果你做 AI 内容，不妨把"每半年画一次时间轴"加进自己的内容日历，比每天追新闻更省力、也更容易沉淀出真正的判断。

## 相关链接

- Simon Willison 原文，https://simonwillison.net/2026/May/19/5-minute-llms/
- Simon Willison 博客主页（持续追前沿 LLM 动态），https://simonwillison.net/
- OpenRouter，https://openrouter.ai/
- HuggingFace 国内镜像 hf-mirror，https://hf-mirror.com/
- Qwen3 系列，https://github.com/QwenLM/Qwen3
- DeepSeek，https://www.deepseek.com/
- 智谱 GLM，https://github.com/THUDM

---
相关实体:: [[simon-willison|Simon Willison]] | [[claude|Claude]] | [[gemini|Gemini]] | [[codex|Codex]]
相关主题:: [[ai-research|AI 研究]] | [[ai-methodology|AI 方法论]] | [[chinese-ai|国产 AI]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
