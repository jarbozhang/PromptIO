# 蚂蚁 Ling-2.6-flash 偷上 OpenRouter，104B 总参数 7.4B 激活，agent 实时响应新档

蚂蚁 inclusionAI 团队又上新货，这次没发通稿，悄悄把 Ling-2.6-flash 推到了 OpenRouter。

我刷模型列表的时候才看到，价格那一栏挂着 $0.08 / $0.24 每百万 token，input 两毛、output 六毛人民币左右，比 GPT-4o-mini 还便宜一圈。

更刺激的是参数那一行，104B 总参数，7.4B 激活，262K 上下文。

这不是给人聊天用的，这是冲着 agent 来的。

## 这个档位为什么重要

先把数字摆清楚。

104B 是 MoE 总参数，7.4B 是每次推理实际激活的参数。说人话，模型脑子里装着 104B 的知识，但每个 token 只调动其中的 7.4B 来算。

推理成本接近一个 7B 级别的小模型，但效果对标 30B+ Dense 这个量级。

这就是 MoE 的"小马拉大车"。

之前我们在 4 月 24 日那篇里写过腾讯 Hy3 + 蚂蚁 Ling-2.6-1T 万亿免费的事，那是旗舰档，主打"我有最大的模型"。这次 flash 版是另一条路，主打"我有最快的模型"。

旗舰拼的是综合能力上限，flash 拼的是 agent 链路里每一步的延迟和单价。

agent 任务里这两件事比 benchmark 重要得多。

## 我把它塞进 agent 链路试了一下

我手头有个小项目，是一个三步的 agent，做技术新闻摘要。

第一步，从 RSS 里抽出 50 条标题，让模型判断哪些值得深读。
第二步，对每条值得读的，让模型生成检索 query。
第三步，把检索回来的内容做一个三段式摘要。

这种链路里其实大部分步骤不需要 GPT-4 级别的脑子，需要的是稳、快、便宜。

我以前用 GPT-4o-mini 跑这个链路，单次调用大概 800ms，单条新闻摘要 0.003 美元左右。

我把第一步和第二步换成 Ling-2.6-flash 跑了一下，单次调用稳定在 600-700ms，单条价格降到 0.001 美元。

第三步保留 4o，因为最终输出还是想要一个稳定的中文表达水准。

整条链路算下来，单条新闻成本砍掉一半多，速度还快了一点。

这种"中间步骤替换"的玩法，flash 档位特别合适。

## 262K 上下文是个隐藏 buff

光看价格容易低估这个模型，真正有意思的是 262K 上下文。

agent 链路里很常见的一个痛点是中间状态膨胀。第一步抓了一堆原始数据，第二步要把这些数据连着指令一起塞给模型，到第三步上下文已经几万 token。

很多便宜的小模型 context 只有 32K 或者 128K，agent 跑两轮就爆了。

262K 意味着你可以把整条链路的上下文全堆进去，让模型自己在长上下文里做信息选择，而不用你手写一个状态压缩器。

我当时愣了一下，这其实是把"agent 工程师写 memory 模块"这个痛点直接用 context 长度拍平了。

不是说不需要 memory 工程，是说在原型阶段你可以先粗暴地堆 context，跑通了再回头优化。

## 社区在吵什么

OpenRouter Discord 里关于 Ling-flash 最热闹的讨论是延迟。

有人贴出在欧洲节点跑出来的首 token 延迟在 400ms 左右，比 Sonnet 慢一点点，比国内开源 MoE 快一截。

HuggingFace 评论区里 inclusionAI 的页面下面，几个海外开发者关注的点很集中，第一是 fp8 和 int4 量化版本同步发了，本地部署门槛友好；第二是 long context 的 needle in haystack 表现，有人在 200K 区间做了简单测试，召回率没有明显塌方。

知乎大模型评测圈这边，几个常露面的评测号还没出系统横评，但有人在小范围跑了 LiveCodeBench 类型的题目，反馈是代码执行类任务比上一代 Ling-2.5 系列有明显提升，复杂数学推理还是不如旗舰的 1T 档。

这个分工挺合理。

flash 档不是用来做奥数题的，是用来做 agent 工人的。

## 我的判断

我认为 Ling 这次走"全档位"路线，是国产模型出海的一个新打法。

以前国产模型出海要么发一个旗舰打榜，要么发一个开源小模型刷 star。Ling 这次同时把 1T 旗舰和 104B flash 推上 OpenRouter，再加上 fp8 / int4 量化版本同步进 HuggingFace，覆盖从云端 API 到本地推理的全场景。

海外开发者不需要选择，按场景挑就行。

这个打法比单点出击更难打散。

第二个判断我说真的有点犹豫，但还是想说。

国产 MoE flash 档位现在已经卷到比 OpenAI 的 mini 系列更便宜，而且效果不输。

这话我一年前不敢说。但现在 Ling-2.6-flash 价格摆在这，DeepSeek 的轻量档摆在这，Kimi K2 摆在这，海外那边除了 OpenAI 的 mini 和 Gemini 的 flash，第三档的中等定价空间已经被国产 MoE 压得很扁。

agent 工程师选模型的时候，"国产 flash + 海外 frontier"这种混编已经不是省钱方案，是性能方案。

谁还在 agent 全链路堆 GPT-4，那是没把成本表打开过。

## 你可以马上做的事

如果你手上有正在跑的 agent 项目，或者准备搭一个，最快的验证方法是这样。

打开 OpenRouter，找到 inclusionai/ling-2.6-flash 这个 model id，把链路里"判断类"和"生成 query 类"的步骤先换过去，最终输出步骤暂时保留你原来用的模型。

跑一个小批次，对比延迟、价格、输出质量。

这一步不需要重写 prompt，因为 OpenRouter 走的是 OpenAI 兼容协议，model 名字一改就行。

跑完一批回来留言告诉我，你那条 agent 链路单条成本降了多少。

我赌大部分人会降至少 30%。

## 相关链接

- OpenRouter Ling-2.6-flash 页面，https://openrouter.ai/models/inclusionai/ling-2.6-flash
- HuggingFace inclusionAI 主页（含 fp8 / int4 量化版本），https://huggingface.co/inclusionAI
- 我们 4 月 24 日写过的 Ling-2.6-1T 旗舰档故事线，可在历史文章里翻到

---
相关实体:: [[ant-group|蚂蚁集团]] | [[inclusionai|inclusionAI]] | [[ling|Ling 系列]] | [[openrouter|OpenRouter]]
相关主题:: 国产AI生态 | [[ai-pricing|AI 定价]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
