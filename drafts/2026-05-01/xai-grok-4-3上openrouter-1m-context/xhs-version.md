# Grok 4.3 悄悄上 OpenRouter 了，1M context 想接住国内 agent 开发者

xAI 在 4 月 30 日把 Grok 4.3 推上了 OpenRouter，没有发布会，没有长文，模型卡上线那一刻同步开放调用。

我蹲到这条更新主要是因为配置单很反常。1M context、强制 reasoning、$1.25/$2.50 每百万 token，看着就是冲着 agent 工作流来的，不是给 chat 玩家的。

## 模型卡上写了什么

模型 ID 是 `x-ai/grok-4.3`，输入支持文本和图像，输出文本。

上下文窗口 1,000,000 token。模型卡明确写着，超过 200k 总 token 的请求按更高费率计价，但具体加价系数没披露。

reasoning 是默认开启且不可关闭的，effort level 也不能调。每一次调用都会消耗 reasoning token，OpenRouter 公开的过去 24 小时数据里 reasoning token 跑了 40.9M，相当于 prompt token 的十分之一量级。

定价上，输入 $1.25/M、输出 $2.50/M。我把同档位的几个摆在一起看，Gemini 2.5 Pro 是 $1.25/$5，Claude Sonnet 4.6 是 $3/$15，DeepSeek V4 Pro 走官方 API 是 $0.27/$1.1，Qwen3.6 Max 在阿里云百炼上大约 $0.4/$1.2。Grok 4.3 卡在国产档之上、Sonnet 之下的中间档。

benchmark 部分模型卡这次没挂任何具体分数，只有一句"suited for agentic workflows"。xAI 自己也没在新模型上线时同步发技术博客，挺克制的。

## 1M context 对 agent 到底意味着什么

agent 框架对长上下文的消耗，跟 chat 应用不是一个量级。

一个典型的 ReAct loop，每一轮要把完整工具说明、历史 trace、所有中间观察喂回去。LangGraph 或者 AutoGen 跑一个 20 步的工作流，上下文很容易膨胀到 200k-400k token。Claude Sonnet 4.6 的 200k 窗口在这个量级会触发 truncation，1M 窗口此前主要是 Gemini 2.5 Pro 在撑。

Grok 4.3 把 1M 加到了这条短名单里。

但 1M 不是免费午餐。模型卡里"超过 200k 按更高费率"那句才是关键。从 OpenRouter 已上线的其他 1M 模型经验看，超过分档线后输入端通常会涨到 $2.5-$3/M。

我自己实际工程里的做法是，1M 当兜底而不是常态。reasoning 模型负责长 context 的关键决策步，cheap 模型负责中间步骤，混合调度才不会让单次调用成本失控。

## reasoning 强制开启的代价

Grok 4.3 不能像 Claude 那样切 thinking 开关，也不能像 Qwen3 系列那样关 think mode。

reasoning token 会在每次调用里产生，按 completion token 价格计费。OpenRouter 数据里 reasoning : completion 大约是 5.6 : 1，所以实际跑一个简单任务，付的 completion 费里大概 80% 是 reasoning token。

短 prompt、强结构化输出的场景这是亏的。比如一个简单的 JSON 抽取任务，Qwen3.6 Max 关掉 thinking 跑出来几乎是瞬间完成，Grok 4.3 会先跑一段 reasoning trace 再吐 JSON，token 消耗高出几倍。

适合的场景是另一类，长链路推理、多步工具调用、需要高 instruction following 鲁棒性的 agent 主控节点。这类场景里 reasoning trace 本身就是要的东西，强制开启反而省掉了开发者自己写 chain-of-thought prompting 的工程量。

## 几个同档位的位置

我把四个模型摆在一起看 agent 落地维度，各自方向不一样。

Gemini 2.5 Pro，1M context、reasoning 可调、$1.25/$5，multi-modal 和工具调用稳定性更成熟。

Claude Sonnet 4.6，200k context、thinking 可切换、$3/$15，复杂 instruction following 仍然是行业标杆，价格最贵、上下文最短。

Qwen3.6 Max，256k context、think mode 可切、阿里云百炼报价 ~$0.4/$1.2，国内合规、价格最低，think 模式开启后 reasoning 能力接近第一梯队。

DeepSeek V4 Pro，128k context、reasoning 可调、官方 API ~$0.27/$1.1，长链路 agent 跑下来成本最低。

Grok 4.3 在矩阵里的位置是 1M context 顶配 + 中间档价格 + 强制 reasoning。它不是单项最强，但每一项都不弱。对一个不想折腾多模型路由、想用一个模型跑完整个 agent 流程的开发者，这是个能直接接进去的选项。

## 我的判断

Grok 4.3 在国内 agent 开发者这里的位置，我会说是"备胎档"而不是"主力档"。

主力位置目前仍然是 Qwen3.6 Max + DeepSeek V4 Pro 的国产组合，合规、低价、文档生态完整。Grok 4.3 适合做长上下文兜底，或者跑那些需要 strong reasoning trace 的关键节点。

国内开发者可以通过 OpenRouter 调用 Grok 4.3，本文不展开具体接入方式。值不值得换主力，跑一个真实 agent benchmark 比读模型卡靠谱得多。

---

本文不涉及境外软件访问教程，所有实操步骤均基于国内可合法访问的服务。

<!-- REACH (xhs): 7/10 | 品牌✓ 利益点✓ 可操作✓ -->
