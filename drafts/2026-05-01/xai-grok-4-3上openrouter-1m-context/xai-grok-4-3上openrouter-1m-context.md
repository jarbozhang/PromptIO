# xAI Grok 4.3 悄悄上 OpenRouter，1M context 想接住国内 agent 开发者

xAI 在 4 月 30 日把 Grok 4.3 推上了 OpenRouter，没有发布会，没有 Twitter 长文，模型卡上线那一刻同步开放调用。

1M context、强制 reasoning、$1.25/$2.50 每百万 token，配置单看着就是冲着 agent 工作流来的。

同一天 Musk 在加州联邦法庭承认 xAI 用 OpenAI 模型蒸馏过 Grok。两件事撞在一起，国内 agent 工程师在挑 LLM 时多了一条要算的账。

## OpenRouter 模型卡上写了什么

模型 ID 是 `x-ai/grok-4.3`，输入支持文本和图像，输出文本。

上下文窗口 1,000,000 token。模型卡明确写着，超过 200k 总 token 的请求按更高费率计价，但具体加价系数没披露。

reasoning 是默认开启且不可关闭的。这是 Grok 4 系列一贯设计，effort level 也不能调。也就是说，每一次调用都会消耗 reasoning token，OpenRouter 公开的过去 24 小时数据里 reasoning token 跑了 40.9M，相当于 prompt token 的十分之一量级。

定价上，输入 $1.25/M、输出 $2.50/M。这个价位对标的是 Gemini 2.5 Pro 的标准档（$1.25/$5），输出端便宜了一半。Claude Sonnet 4.6 的 $3/$15 更贵一档，DeepSeek V4 Pro 国区直接走官方 API 时是 $0.27/$1.1 量级，仍然比 Grok 4.3 低一个数量级。

Qwen3.6 Max 在阿里云百炼上的报价是 $0.4/$1.2 左右，按国内开发者实际体感算，Grok 4.3 是"国产档之上、Sonnet 之下"的中间档。

benchmark 部分，OpenRouter 模型卡这次没有挂任何具体分数，只有一句"suited for agentic workflows, instruction-following tasks, and applications requiring high factual accuracy"。xAI 自己也没在新模型上线时同步发技术博客。

## 1M context 对 agent 开发到底有多重要

agent 框架对长上下文的消耗，跟 chat 应用不是一个量级。

一个典型的 ReAct loop，每一轮要把完整工具说明、历史 trace、所有中间观察喂回去。LangGraph 或者 AutoGen 跑一个 20 步的工作流，上下文很容易膨胀到 200k-400k token。Claude Sonnet 4.6 的 200k 窗口在这个量级会触发 truncation，Gemini 2.5 Pro 的 1M 窗口此前是少数能撑住的选择。

Grok 4.3 把 1M 窗口加到了这条短名单里。

但 1M 不是免费午餐。模型卡里那句"超过 200k 总 token 的请求按更高费率计价"才是关键。Gemini 2.5 Pro 同样在 200k 处分档，长上下文部分价格翻倍。从 OpenRouter 已上线的其他 1M 模型经验看，超过分档线后，输入端通常会涨到 $2.5-$3/M。

实际工程层面，1M context 更多被用来"兜底"而不是"常态"。把 1M 当主力配额跑 agent，单次调用成本会失控。常见做法是 reasoning 模型负责长 context 的关键决策步，cheap 模型负责中间步骤，混合调度。

## reasoning 强制开启的代价

Grok 4.3 不能像 Claude 那样切 thinking 开关，也不能像 Qwen3 系列那样关 think mode。

reasoning token 会在每次调用里产生，且按 completion token 价格计费。OpenRouter 数据里 reasoning : completion 大约是 5.6 : 1，所以实际跑一个简单任务，用户付的 completion 费里有大概 80% 是 reasoning token。

对短 prompt、强结构化输出的场景这是亏的。比如一个简单的 JSON 抽取任务，Qwen3.6 Max 关掉 thinking 跑出来几乎是瞬间完成，Grok 4.3 会先跑一段 reasoning trace，再吐 JSON，token 消耗高出几倍。

适合的场景是另一类，长链路推理、多步工具调用、需要高 instruction following 鲁棒性的 agent 主控节点。在这类场景里，reasoning trace 本身就是要的东西，强制开启反而省掉了开发者自己做 chain-of-thought prompting 的工程量。

## 蒸馏争议绕不开

4 月 30 日 Musk 当庭确认 xAI 用 OpenAI 模型蒸馏过 Grok，是回避不掉的背景。

模型蒸馏在行业内是常规操作，公司内部用大模型教小模型完全合规。但用竞品模型做 teacher 跨过了 OpenAI 的服务条款，这是法律层面要打的官司。

技术层面，蒸馏 trace 的存在让 Grok 系列的部分能力分布跟 OpenAI 系列高度相似。对 agent 开发者的实际影响是，如果你的 prompt 工程是针对 GPT-4o/4.5 调优过的，迁移到 Grok 4.3 上的"无痛迁移率"可能比迁移到 Claude 或 Qwen 高。

合规层面是另一回事。中国公司在境内部署 agent，调用 Grok API 走的是 OpenRouter 这类聚合层，本身路径合规。但 Grok 在中国境内没有 ICP 备案，模型输出内容不经过中国区合规过滤，To C 产品落地仍然要走二次过滤。

## 同档位竞品的位置

把四个模型摆在一起看 agent 落地维度。

**Gemini 2.5 Pro**，1M context、reasoning 可调、$1.25/$5。Google 在 multi-modal 和工具调用稳定性上更成熟，但国内访问需要走转发层。

**Claude Sonnet 4.6**，200k context、thinking 可切换、$3/$15。在复杂 instruction following 上仍然是行业标杆，agent 主控节点首选，但价格最贵、上下文最短。

**Qwen3.6 Max**，256k context、think mode 可切、阿里云百炼报价 ~$0.4/$1.2。国内合规、价格最低，think 模式开启后 reasoning 能力接近第一梯队。

**DeepSeek V4 Pro**，128k context、reasoning 可调、官方 API ~$0.27/$1.1。极致性价比档，长链路 agent 跑下来成本最低。

**Grok 4.3** 在这个矩阵里的位置是，1M context 顶配 + 中间档价格 + 强制 reasoning。它不是单项最强，但每一项都不弱。对一个不想折腾多模型路由、想用一个模型跑完整个 agent 流程的开发者，这是个能直接接进去的选项。

## 一点收尾观察

Grok 4.3 在国内 agent 开发者这里的位置，是"备胎档"而不是"主力档"。

主力位置目前仍然是 Qwen3.6 Max + DeepSeek V4 Pro 的国产组合，合规、低价、文档生态完整。Grok 4.3 适合做长上下文兜底，或者跑那些需要 strong reasoning trace 的关键节点。蒸馏争议短期内不影响 API 层使用，但 To C 产品上线时风险评估要提前算进去。

OpenRouter 的存在让"试一下"的门槛接近为零。值不值得换主力，跑一个真实 agent benchmark 比读模型卡靠谱。

## 相关链接

- Grok 4.3 OpenRouter 模型卡: https://openrouter.ai/models/x-ai/grok-4.3
- Musk 庭审蒸馏报道: https://www.theverge.com/ai-artificial-intelligence/921546/elon-musk-xai-openai-trial-model-distillation
- OpenRouter 模型对比: https://openrouter.ai/models

---
相关实体:: [[xai|xAI]] | [[grok|Grok]] | [[openrouter|OpenRouter]]
相关主题:: [[ai-pricing|AI 定价]] | [[agent-frameworks|Agent 框架]] | 模型评测

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->
