# Cactus 把 Gemini 的 tool calling 蒸馏成 26M 模型，6000 tok/s 在手机上跑出来

5/12 凌晨，Hacker News 首页挂出来一行字，"Show HN: Needle: We Distilled Gemini Tool Calling into a 26M Model"。Cactus Compute 那个 Henry 自己来发的。我点进去看了一眼参数表，26M、6000 tok/s prefill、1200 tok/s decode，MIT 协议，立刻把 repo clone 下来跑了一遍。

跑完我觉得这个项目值得拿出来讲，不是因为参数多惊艳，而是因为它把一件被很多人嘴里说但没人真做的事拿出来论证了一遍，**手机/手表/眼镜上的 agent，不需要一个完整的小语言模型，只需要一个会查工具的"检索头"**。

## 26M 到底是个什么量级

先把数字捋一遍，避免被"小"这个字蒙骗。

GPT-3 是 175B，DeepSeek V3 是 671B，Qwen3-0.6B 是 600M，FunctionGemma 是 270M。Needle 是 **26M**，比 FunctionGemma 还小 10 倍，是 Qwen3-0.6B 的二十三分之一。这个量级以前主要出现在 BERT 微调过的小分类模型里，跟"会调工具"这件事八竿子打不着。

模型架构他们叫 **Simple Attention Network**，简单说就是把 transformer 里的 FFN（feed-forward network）层全部砍掉，整个模型只剩 attention + gating。12 个 encoder 层 + 8 个 decoder 层，512 维 hidden，8 个 attention head，4 个 KV head。

这个改动放在以前是要被审稿人质疑的，FFN 一直被认为是 transformer 里存知识的地方。但 Cactus 的论证是，**tool calling 不需要存知识**。可用工具的描述、参数 schema、用户当前 query，全部在输入里。模型要做的只是匹配 + 抽参 + 生成 JSON。这是检索任务，不是推理任务，FFN 在这个场景下确实是浪费。

## 训练成本看着就更有意思了

200B token 预训练 + 2B token 后训练，硬件是 16 张 TPU v6e。

预训练 27 小时，后训练 45 分钟。

我让 GPT 帮我估了一下 TPU v6e 的租用成本，16 张大概一小时 40-50 美元，27 小时跑完预训练大概 1100-1400 美元。后训练 45 分钟可以忽略不计。**整个 Needle 训练成本压在 1500 美元以内**，跟一台 M3 Max MacBook 的价格差不多。

而且 2B token 的后训练数据是用 Gemini 合成的，15 个工具类目（计时器、消息、导航、智能家居等等），不是人工标的。这个流程意味着，做一个针对自己场景的 Needle 变体，门槛压到了什么程度，你只需要一份够大的 Gemini API quota + 一个能蒸馏的 base 架构 + 几张消费级 TPU/H100。

这不是一个研究实验室才能复现的东西。

## 6000 tok/s 在手机上跑出来那结果会怎样

prefill 6000 tok/s、decode 1200 tok/s，这个数字在云端 A100 上看不算什么，问题是 Cactus 说这是**消费级设备上的数字**，他们自己定位是手机、手表、眼镜。

举个对照。Qwen3-0.6B 在骁龙 8 Gen 3 上跑 decode 大概 30-50 tok/s，FunctionGemma-270M 是 100-150 tok/s 量级。Needle 的 1200 tok/s 直接快了 10 倍以上。

对实际体验那结果会怎样。

你在小米手表上说"帮我设个 7 点起床的闹钟"，从你说完到手表"嘀"一声反馈，传统方案是把语音传到云端，转文本，过大模型，返工具调用，再下发到手表，少说 1-2 秒。Needle 这个量级下，整个 tool call 链路可以**完全在手表本地完成**，理论延迟降到 100ms 以内，跟你按一下按钮的响应感差不多。

而且不需要联网。地铁里、电梯里、信号差的地方，本地 agent 仍然能工作。

## FFN-free 这个发现，可能比模型本身还重要

Henry 在 HN 帖子里夹了一句话我觉得是这次 release 最值得放大的，

> 我们发现"no FFN"这个结论可以推广到任何模型有外部结构化知识可用的场景，RAG、tool use、retrieval-augmented generation。如果事实是输入提供的，模型就不需要在 FFN 权重里记住它们。

把这句话翻译一下，意思是**所有 RAG 应用底下那个生成模型，FFN 都可能是冗余的**。

如果这个结论站得住，影响的不只是手机端的 tool calling。任何一个企业 RAG 系统，把 8B/14B 的生成模型换成一个 50M-100M 的 FFN-free 检索头，吞吐量提升一个数量级、显存占用降到原来 5%-10%，质量损失可能微乎其微。这是个会改变 RAG 整体经济模型的论断。

当然论断要落地需要"实验结果即将发表"那篇论文真的发出来。但即便只是当前的 Needle 这个单点数据，FFN-free 这个方向也已经值得国产 AI 公司认真跑一遍消融实验了。

## 社区在聊什么

r/LocalLLaMA 那个原帖 305 个赞、40 条评论，是这周 local-llm 圈子讨论最集中的话题。评论里有几个观点我觉得值得拎出来。

第一种是认架构。**"tool calling 应该和 reasoning 分离"** 这个看法在 r/AI_Agents 的二次讨论里被反复强调。原话是 "A lot of tool calling is not reasoning. It is structured prediction. The task is often: match the user request to a tool, copy or normalize a few arguments, and emit valid JSON." 翻译过来就是工具调用本质是结构化预测，不是推理，把这两件事用同一个大模型干等于浪费算力。Needle 用数据证明了这个看法。

第二种是算账。r/micro_saas 有个帖子标题很扎眼，"OpenAI's GPT-5.5 just cost $10 for a spreadsheet summary. Meanwhile a distilled 26M model does tool-calling at 1200 tok/s on a phone."，同一周，有人用 GPT-5.5 总结一张表格烧了 10 美元，与此同时 Needle 在手机上免费跑出 1200 tok/s 的工具调用。这个对比有点夸张但方向是对的，**SaaS builder 越来越意识到"用一个模型干所有事"的成本曲线已经撑不住了**。

第三种是质疑。HN 评论里有人指出，Needle 在单步函数调用上确实赢了 FunctionGemma-270M、Qwen-0.6B、Granite-350M、LFM2.5-350M，但**多轮对话、复杂工具组合、参数歧义消解**这些场景没有数据。Cactus 自己也承认了，README 里写"小模型很挑剔，需要按具体任务 finetune"。这是诚实的说法，但也意味着 Needle 不是开箱即用就能替代 Qwen3-0.6B 的，它是个**专用零件**，不是通用引擎。

## 跟前两天 AirLLM、omlx 放一起看，路线就清楚了

5/11 我写过 AirLLM，单张 4GB 显卡跑 70B 模型，思路是用速度换显存。5/12 写过 jundot/omlx，把 Mac mini 变成 LLM 推理服务器，思路是把 vLLM 那套服务化能力塞进 Apple Silicon。今天 Needle 是第三条路，**把模型本身做小做专**。

三条路线对应了本地推理玩家的三种处境，

- 硬件实在不行（AirLLM）→ 牺牲速度，跑大模型
- 硬件中等（omlx）→ 优化调度，跑中等模型
- 硬件极受限/边缘设备（Needle）→ 重新定义模型大小

国产硬件厂这两年一直在喊"端侧 AI"，华为的盘古、小米的 MiLM、vivo 的蓝心、OPPO 的 AndesGPT，但落到具体产品上，大家给出的方案基本都是 1B-7B 量级的"小语言模型"，强行往手机里塞。Needle 这条路证明了，对于绝大多数手机端 agent 场景（设个闹钟、查个天气、发个消息、控制家电），**你不需要一个 1B 的通用语言模型，你需要一个 26M 的工具检索头**。

国产手表厂、眼镜厂如果在看这件事，我觉得动作可以很简单。

第一步，拿 Needle 这个开源仓库在自己的硬件上跑一遍，测真实 tok/s 数据。这不需要立项，一个工程师两天搞定。

第二步，把自己 SKU 上的高频指令（语音控制、消息收发、查询类）做成一份 1-2B token 的合成数据，用 Gemini 或者 GPT-4o 蒸馏（国内做的话用 DeepSeek/豆包/Kimi 也行，工具调用合成数据国产模型完全能做），post-train 一个针对自家产品的 Needle 变体。

第三步，把这个 26M 模型直接烧到设备 NPU 里，对外宣传"本地 agent，<100ms 响应，离线可用"。这是个能让消费者一眼看懂的卖点。

## 我的判断

Needle 这个项目，模型本身不是最重要的，**FFN-free + 工具调用单独建模**这个思路才是。

Cactus 是一家做端侧推理工具链的初创公司（他们的母仓库 cactus-compute 还做 SDK 和 demo app），Needle 是他们的研究 marketing。但这个 marketing 立得住，因为数据可复现、代码开源、协议是 MIT，谁都能拿去验证。

短期看，这是个细分场景下的 SOTA，对手机/手表/眼镜厂有直接价值。中期看，如果 FFN-free 在更广的 RAG/tool use 场景里成立，整个 inference 经济会被重新洗一遍，把一个 8B 模型换成 100M 的检索头，云端 inference 成本可能直接掉 90%。长期看，"一个大模型干所有事"这条路的对立面，是**很多个小模型 + 一个调度层**，Needle 是这种架构的一个具体物证。

我会持续关注 Cactus 接下来发的那篇论文，特别是 FFN-free 在 RAG 上的实验数据。如果数据扎实，这是 2026 年值得回头看的几个 paper 之一。

想立刻动手的话，路径很直接，

```bash
git clone https://github.com/cactus-compute/needle
cd needle
# 按 README 跑 playground，Mac/PC 都能 fine-tune
```

15 个工具类目的合成数据脚本也开源了，你可以加自己的工具类别（比如"打开闲鱼搜索 XXX"、"在抖音搜 XXX 视频"），重新合成数据，post-train 一个适配国内 app 生态的 Needle 变体。45 分钟的后训练时间，一张 4090 都能跑动。

## 相关链接

- Needle 仓库, https://github.com/cactus-compute/needle
- Cactus Compute 母组织, https://github.com/cactus-compute
- Show HN 原帖, https://news.ycombinator.com/from?site=github.com/cactus-compute/needle
- r/LocalLLaMA 讨论, https://www.reddit.com/r/LocalLLaMA/comments/1tb9b0r/

---
相关实体:: [[ollama|Ollama]] | [[airllm|AirLLM]]
相关主题:: [[local-inference|本地推理]] | [[agent-frameworks|Agent 框架]]

<!-- REACH: 9/10 | 品牌✗ 利益点✓ 可操作✓ -->
