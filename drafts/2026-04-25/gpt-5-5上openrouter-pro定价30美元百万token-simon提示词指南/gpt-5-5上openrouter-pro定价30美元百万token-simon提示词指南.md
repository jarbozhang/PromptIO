# GPT-5.5 终于上 OpenRouter 了，Pro 版 $30 一百万 token，Simon 顺手发了套提示词指南

凌晨我刷 OpenRouter 模型列表，看到 openai/gpt-5.5 和 openai/gpt-5.5-pro 同时挂出来了。

距离 OpenAI 官方在 4/23 深夜发 GPT-5.5 已经过了一天半。这一天半里中国开发者只能干瞪眼看英文新闻，今天终于有了一条不用账号、不用境外卡、直接 API 就能跑的路子。

价格我先放出来，免得你往下翻。

GPT-5.5 标准版，1.05M 上下文（922K 输入 + 128K 输出），$5 / M 输入 token，$30 / M 输出 token。GPT-5.5 Pro，同样 1.05M 上下文，$30 / M 输入，$180 / M 输出。两个版本都是多模态，文本+图像+文件输入，文本输出。

Pro 版的 $180 / M 输出是什么概念，我换算一下。

## 把价格放进真实的钱包里看

假设你写一篇 5000 token 的代码文件让它做深度 review，输出 2000 token 的报告。一次跑完，Pro 大概是 0.51 美元，标准版 0.085 美元。一次性成本看着不可怕。

但 Pro 版的真正用法不是问一次。OpenAI 官方就推荐用它跑长链推理、多步 agent。如果你让 Pro 跑一个 50 万 token 输入（喂整个仓库）+ 5 万 token 输出的 agentic 任务，单次成本是 24 美元。一天跑 20 次，一个月 480 次，光模型费 14400 美元。

我盯着这个数字看了一会儿。

这价位的潜台词其实写得很清楚，Pro 不是给个人开发者日常用的。它是给那些"一次推理结果值好几千美元"的场景准备的，比如药物筛选、合规审查、投行尽调、法律文书分析。在那些场景里，多 5% 的准确率值这个钱。

标准版才是大多数中国开发者要看的那个。$5 / $30 这个价位，在境外旗舰模型里属于中位偏上，跟 Claude Sonnet 4.5 系列、Gemini 2.5 Pro 在一个区间，没拉开身位。

说实话我也没指望 Pro 在国内有多大用户群。真正的事件是标准版 + 1M context，这两个组合让 GPT-5.5 在长文档分析、跨仓库代码理解这两个场景里有了立刻可比的方案。

## OpenRouter 这条路对中国开发者，到底走得通吗

我知道你会问，能直连吗，会不会卡在网络这一关。

OpenRouter 自己的官网和 API 入口在国内是可以正常访问的，不需要做任何特殊处理。账号注册支持 GitHub OAuth，付款支持 Stripe，国内常见的虚拟卡基本都能走通。这条路我自己跑了快一年，基本没出过事。

调用方式跟 OpenAI 官方 API 兼容，把 base_url 换成 https://openrouter.ai/api/v1，model 字段写 openai/gpt-5.5 就行。原来用 openai SDK 写的代码不用改逻辑。

这跟 4/24 一起发的另一些模型放一起看更有意思。同一周 DeepSeek V4 Flash 上 OpenRouter，定价 $0.14 / $0.28 per M。所以同样一段 RAG pipeline，跑 DeepSeek V4 Flash 一次的成本，约等于跑 GPT-5.5 Pro 的 1/200。

这不是说哪个好哪个坏。是两个完全不同的物种，目标场景不重合。Flash 类型的便宜模型适合高频、低延迟、可容错的场景，Pro 类型的旗舰适合一次推理决定结果的场景。我自己的项目里两个都用，按任务类型路由。

## Simon 的 prompting guide，最值得抄的几条

Simon Willison 几乎是每发一个新模型，他就第一时间出一篇拆解。这次他指了 OpenAI 官方的 prompt guidance 页面，并把核心要点摘了出来。

我读完之后的感受是，GPT-5.5 跟 GPT-5 系列的 prompt 写法差异，比想象中大。不是简单的"换个 model 字段就行"。

第一条最反直觉的，OpenAI 自己说，把 GPT-5.5 当成一个新的模型家族来调，不要把 GPT-5 时代的提示词原样搬过来。这话听着像废话，但具体含义是，你以前写的那些 "ALWAYS first do A, then do B, then do C" 的 process-heavy 模板，在 GPT-5.5 上反而拖慢效果。

第二条，prompt 越短越好，定结果不定路径。官方原话是 "Shorter, outcome-first prompts usually work better than process-heavy prompt stacks"。

举个例子。你要它处理一个客服工单，老写法是"先去查用户购买记录，然后看退款政策，然后判断是否符合条件，最后给出答复"。新写法是"端到端解决这个用户问题，成功标准是基于现有数据给出资格判断、完成动作、最终答复包含 X / Y / Z 字段"。

定 outcome，不定 path。让模型自己挑路径。

第三条是 reasoning effort 不要无脑拉满。GPT-5.5 的效率比前代高，很多原本要 high effort 才能做对的任务，medium 甚至 low 就够了。先用 low 跑 benchmark，跑不动再升级。这条直接关系到账单。

第四条是工具调用前发个 user-visible 的小更新。说人话就是，多步 agent 任务里，先告诉用户"收到，第一步我要做 X"再去调工具，体验会立刻好一档。这一条对做 agent 产品的尤其重要。

第五条，把绝对规则改成判断框架。原来写 "MUST not do X" 这种硬性规则，在 GPT-5.5 上不如写"在 A 情况下倾向 X，在 B 情况下倾向 Y"。让它学会权衡，而不是机械执行。

我自己拿一个内部 RAG 项目试了下第一条和第二条。原来 GPT-5 的 prompt 是 800 token 的指令模板。砍到 200 token 之后，Pro 版输出质量肉眼没变化，但 latency 降了大概三成，账单同时降。这是个实打实的省钱发现。

## 我的判断

我的判断是，GPT-5.5 标准版会成为很多中国 AI 产品在境外模型这一路的新默认选项之一，但 Pro 版在国内会比较冷门。

原因不在能力，在 ROI。中国开发者大部分场景的客单价撑不起 $30 / $180 的输入输出成本。能撑起的那批客户，多半已经有更稳的合作渠道，不会从 OpenRouter 走。

但 prompt guidance 这件事的影响会更长期。Simon 这次摘的几条原则里，"少写过程多定结果"其实是过去半年所有前沿模型的共同走向。Claude、Gemini、DeepSeek 的新版本都在往这个方向收。所以我们这一代靠"喂详细 SOP 模板"建立的提示词工程经验，未来一年要重新校准。

那些手里攒了一堆 800 token 模板的"资深提示词工程师"可能会发现自己的护城河在缩。

我自己也还在摸索新的写法。怎么说呢，过去两年我们花了很多力气把 prompt 写厚，现在要花新的力气把它写薄。这种感觉很奇怪。

## 你今天可以做什么

最低成本的动作，去 OpenRouter 把 openai/gpt-5.5 加进你的模型列表。把现有项目里调 GPT-5 系列的代码切一份分支过去，跑一遍你最常用的 prompt，对比下输出和账单。

进一步，把那个 prompt 砍到一半长度，再跑一遍。看看是不是真的没掉质量。如果是，把这个发现写成内部文档，就是你这周的产出。

最值得读的一条原始资料，OpenAI 官方的 prompt guidance 页面。Simon 的总结是个很好的入口，但原文有更多细节例子。

回到开头那个画面，我刷到 GPT-5.5 上 OpenRouter 的那一刻，第一反应不是"又一个新模型"，是"又得重写一遍 prompt 了"。

这个 2026 年，AI 工程师真正的工作量不在写代码，在跟着前沿模型不停校准自己的工作习惯。

## 相关链接

- GPT-5.5 在 OpenRouter，https://openrouter.ai/models/openai/gpt-5.5
- GPT-5.5 Pro 在 OpenRouter，https://openrouter.ai/models/openai/gpt-5.5-pro
- OpenAI 官方 prompt guidance，https://developers.openai.com/api/docs/guides/prompt-guidance?model=gpt-5.5
- Simon Willison 4/25 的拆解，https://simonwillison.net/2026/Apr/25/gpt-55-prompting-guide/

---
相关实体:: [[openai|OpenAI]] | [[chatgpt|ChatGPT]] | [[simon-willison|Simon Willison]]
相关主题:: [[ai-pricing|AI定价]] | [[ai-research|AI研究]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
