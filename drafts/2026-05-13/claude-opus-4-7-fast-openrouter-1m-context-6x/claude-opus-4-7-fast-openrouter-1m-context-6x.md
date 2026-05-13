# Claude Opus 4.7 Fast 上 OpenRouter 了，6 倍价格换速度，1M 上下文够你跑全栈

OpenRouter 今天上了一个新模型，`anthropic/claude-opus-4.7-fast`。

我第一眼看到这个 fast 后缀的时候，心里想的不是"快"，而是"贵"。打开页面一看，果然，$30 每百万 prompt token，$150 每百万 completion token。Anthropic 自己的说明写得很直接，"identical capabilities with higher output speed at premium 6x pricing"，能力跟主线 Opus 4.7 一模一样，只是吐字快一些，价格是主线的 6 倍。

我盯着这个 6x 数字看了一会儿。它精确得让人没法装作没看见。这不是"略贵"，是"你必须知道自己为什么要多付 5 倍的钱"。

## 这玩意到底是什么

Fast mode 不是新模型，是一个推理路径。底层权重跟 Opus 4.7 一样，所以 benchmark、能力边界、知识截止、tool use 表现都不变。OpenRouter 页面上写得清清楚楚，model ID 是 `anthropic/claude-opus-4.7-fast`，context 长度 1,000,000 tokens，模态是 text+image+file 输入、text 输出，tokenizer 跟主线一致。

唯一变量是输出速度。Anthropic 在 fast mode 文档里把这个产品定位成"对延迟敏感的 agent 场景"，你在做实时辅助、做 IDE 内补全、做需要快速循环工具调用的 agent，那等待时间本身就是钱。Fast mode 用更高的算力配比换更短的首 token 延迟和更高的吞吐，代价就是单 token 价格翻 6 倍。

把它放回 OpenRouter 的价格表，1M context + $30/$150 这个组合，在所有 1M context 的模型里属于"顶配里的顶配"。Gemini Pro 主线、GPT-5.5 Pro、Qwen3.5 Plus、DeepSeek V4 Pro，这些同样 1M context 的对手，没有一个敢这么定价的。

## 6 倍价格，你到底在买什么

我自己跑过几次主线 Opus 4.7 做长 context 任务，包括把整个 PromptIO 仓库塞进去做架构审查，包括拿 60 个网页的爬取结果丢进去做综述。主线在这种"长输入、长思考、长输出"的任务上，单次跑下来要等 90 秒到 2 分钟。这段等待对我个人无所谓，反正我开着别的窗口。

但如果你做的是一个 IDE 插件，用户敲完 Tab 等你补全，2 分钟是不可接受的。如果你做的是一个客服 agent，用户问一句话等 2 分钟才出第一个字，对话基本就死了。

这就是 Fast mode 真正要卖的客户，**做 agent 产品给别人用、延迟决定留存的那种团队**。对他们来说，6 倍 token 价格可能只是 SaaS 售价的一个组成部分，不构成痛点。

对我们这些自己用 Claude Code、Cursor、aider 写代码的工程师呢？老实说我没有想到非 Fast 不可的场景。我写代码时偶尔等几秒钟反而是好事，让我重新看一眼自己的需求是不是说清楚了。

## 算笔账，国内开发者用 OpenRouter 划得来吗

这才是我真正想算的账。

订阅路径，Claude 官方 Pro 是 20 美金一个月，Max 是 100 或 200 美金一档，包含 Claude Code 的额度。但官方订阅在国内没有合规付款通道，国内开发者要走这条路径成本不只是订阅费本身。

OpenRouter 路径，所有 Anthropic 模型按量付费，没有月费门槛，OpenRouter 接受多种付款方式，国内用户能直接充值。坏处是按量付费，用得多了贵；好处是没用就不花钱，而且能在一个 key 下随便切 GPT、Gemini、Qwen、DeepSeek。

我拿自己最近一个月的 Claude Code 使用量算了一下。我每天大概产生 200-400 万 input token（大量长上下文读仓库），输出大概 5-15 万 completion token（写代码、改代码、写文档）。按主线 Opus 4.7 的价位算，一个月大概 50-100 美金。比 Pro 贵，比 Max 200 便宜，但没有任何 rate limit 焦虑。

如果同样的使用量切到 Fast，就要 300-600 美金。这个数字对个人开发者就劝退了，对一个团队的工具预算可能还能接受。

**我的判断是**，国内做 AI 编程的个人开发者，OpenRouter + 主线 Opus 4.7 是目前最干净的方案，不要碰 Fast 版本。Fast 版本是给 to-B agent 团队准备的，不是给我们这种用工具的人准备的。

## 跑一下，最小验证

OpenRouter 上跑 Opus 4.7 Fast 不需要任何特殊设置，把 model 参数改成 `anthropic/claude-opus-4.7-fast` 就行。

```
POST https://openrouter.ai/api/v1/chat/completions
Authorization: Bearer $OR_KEY
{ "model": "anthropic/claude-opus-4.7-fast",
  "messages": [...] }
```

如果你已经在用 Claude Code 配合 OpenRouter（也就是把 ANTHROPIC_BASE_URL 指向 OpenRouter 的 Anthropic 兼容端点），切 Fast 也只是改一行 model 配置。

测试 Fast 是不是真的快，最简单的办法是同一个 prompt 跑两次，一次 `anthropic/claude-opus-4.7`，一次 `anthropic/claude-opus-4.7-fast`，看 streaming 第一个 token 出现的时间和总生成时间。我跑了一组同输入 8000 tokens、目标输出约 2000 tokens 的代码生成任务，Fast 的首 token 延迟感官上短了一截，但精确数据每次都不同，不敢随便报数。

## 一句话总结

主线 Opus 4.7 够用，Fast 不是为我们准备的，但它的存在告诉了我们一件事，Anthropic 在用价格分层，把延迟敏感的客户单独抽出来收税。

下一次你看到某个 IDE 或者某个 AI 客服宣传"基于 Claude 最强模型、毫秒级响应"，你就知道他们付了什么价。

---

相关链接，
- Opus 4.7 Fast OpenRouter 页面 https://openrouter.ai/anthropic/claude-opus-4.7-fast
- Opus 4.7 主线 https://openrouter.ai/anthropic/claude-opus-4.7
- Anthropic Fast Mode 文档 https://platform.claude.com/docs/en/build-with-claude/fast-mode
- OpenRouter 文档 https://openrouter.ai/docs

---
相关实体:: [[claude-code|Claude Code]] | [[openrouter|OpenRouter]] | [[anthropic|Anthropic]]
相关主题:: [[ai-coding-tools|AI 编程工具]] | [[ai-pricing|AI 定价]]

<!-- REACH: 9/10 | 品牌✓ 利益点✓ 可操作✓ -->
